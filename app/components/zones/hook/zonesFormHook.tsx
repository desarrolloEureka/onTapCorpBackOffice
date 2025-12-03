"use client";
import useAuth from "@/firebase/auth";
import { saveZoneQuery, updateZoneQuery } from "@/queries/documentsQueries";
import { LocalVariable } from "@/types/global";
import { ModalParamsMainForm } from "@/types/modals";
import { useEffect, useState } from "react";

const ZonesFormHook = ({
    handleShowMainForm,
    setHandleShowMainForm,
    handleShowMainFormEdit,
    setHandleShowMainFormEdit,
    editData,
    title,
    reference,
}: ModalParamsMainForm) => {
    const [show, setShow] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [isEdit, setIsEdit] = useState(false);
    const { userData, companyData } = useAuth();

    // Datos
    const [zoneName, setZoneName] = useState("");
    const [zoneManager, setZoneManager] = useState("");
    const [addresses, setAddresses] = useState([
        { address: "", coords: { lat: null, lng: null } },
        { address: "", coords: { lat: null, lng: null } },
        { address: "", coords: { lat: null, lng: null } }
    ]);


    const [idRow, setIdRow] = useState("");

    // Errores
    const [zoneNameError, setZoneNameError] = useState("");
    const [zoneManagerError, setZoneManagerError] = useState("");
    const [addressesError, setAddressesError] = useState("");

    const theme = localStorage.getItem("@theme");
    const themeParsed = theme ? (JSON.parse(theme) as LocalVariable) : null;

    const [addressErrors, setAddressErrors] = useState([
        { address: "", lat: "", lng: "" },
        { address: "", lat: "", lng: "" },
        { address: "", lat: "", lng: "" }
    ]);

    const validateFields = () => {
        let valid = true;

        // Validación del campo 'zoneName'
        if (!zoneName) {
            setZoneNameError("El nombre de la zona es requerido");
            valid = false;
        } else {
            setZoneNameError("");
        }

        // Validación del campo 'zoneManager'
        if (!zoneManager) {
            setZoneManagerError("El jefe de zona es requerido");
            valid = false;
        } else {
            setZoneManagerError("");
        }

        const newErrors = addresses.map(() => ({
            address: "",
            lat: "",
            lng: ""
        }));

        addresses.forEach((item, index) => {
            if (!item?.address?.trim()) {
                newErrors[index].address = "La dirección es requerida";
                valid = false;
            }


            const lat = Number(item.coords.lat);

            if (item.coords.lat === null || item.coords.lat === "") {
                newErrors[index].lat = "La latitud es requerida";
                valid = false;
            } else if (isNaN(lat) || lat < -90 || lat > 90) {
                newErrors[index].lat = "Latitud inválida (-90 a 90)";
                valid = false;
            }


            const lng = Number(item.coords.lng);

            if (item.coords.lng === null || item.coords.lng === "") {
                newErrors[index].lng = "La longitud es requerida";
                valid = false;
            } else if (isNaN(lng) || lng < -180 || lng > 180) {
                newErrors[index].lng = "Longitud inválida (-180 a 180)";
                valid = false;
            }

        });

        setAddressErrors(newErrors);

        return valid;
    };

    const normalizeAddresses = () => {
        return addresses.map(a => ({
            address: a.address,
            coords: {
                lat: Number(a.coords.lat),
                lng: Number(a.coords.lng),
            },
        }));
    };

    const handleSendForm = async (e?: any) => {
        e.preventDefault();
        if (!validateFields()) return;

        const geolocations = normalizeAddresses();
        setIsLoading(true);

        try {
            const now = new Date();
            const date = now.toISOString().split("T")[0]; // Formato YYYY-MM-DD
            const hour = now.toTimeString().split(" ")[0]; // Formato HH:MM:SS

            if (userData?.companyId) {
                const formData = {
                    idCompany: userData.companyId,
                    zoneName,
                    zoneManager,
                    date,
                    hour,
                    geolocations,
                };

                const zoneQueryResult = await saveZoneQuery(formData);

                if (zoneQueryResult.success) {
                    console.log("Zone saved successfully");
                } else {
                    console.error(
                        "Failed to save zone:",
                        zoneQueryResult.message,
                    );
                }
            } else {
                console.log(
                    "No se pudo encontrar la compañía. Por favor, inténtalo de nuevo.",
                );
                return;
            }

            handleClose();
        } catch (error) {
            console.error("Error al enviar el formulario:", error);
        } finally {
            setIsLoading(false);
        }
    };

    const handleClose = () => {
        setShow(false);
        setHandleShowMainForm(false);
        setHandleShowMainFormEdit(false);
        setIsEdit(false);
        handleReset();
    };

    const handleReset = () => {
        setZoneName("");
        setZoneManager("");
        setAddresses([
            { address: "", coords: { lat: null, lng: null } },
            { address: "", coords: { lat: null, lng: null } },
            { address: "", coords: { lat: null, lng: null } }
        ]);
        setZoneNameError("");
        setZoneManagerError("");
        setAddressesError("");
    };

    const handleEditForm = async (e: any) => {
        e.preventDefault();
        if (!validateFields()) return;

        const geolocations = normalizeAddresses();
        setIsLoading(true);

        try {
            const now = new Date();
            const date = now.toISOString().split("T")[0]; // Formato YYYY-MM-DD
            const hour = now.toTimeString().split(" ")[0]; // Formato HH:MM:SS

            if (userData?.companyId && idRow) {
                const updatedData = {
                    idCompany: userData.companyId,
                    zoneName,
                    zoneManager,
                    date,
                    hour,
                    uid: idRow,
                    geolocations,
                };

                const zoneQueryResult = await updateZoneQuery(
                    updatedData,
                    idRow,
                );

                if (zoneQueryResult.success) {
                    console.log("Zone saved successfully");
                } else {
                    console.error(
                        "Failed to save zone:",
                        zoneQueryResult.message,
                    );
                }
            } else {
                console.log(
                    "No se pudo encontrar la compañía o el ID de la fila. Por favor, inténtalo de nuevo.",
                );
                return;
            }

            handleClose();
        } catch (error) {
            console.error("Error al editar el formulario:", error);
        } finally {
            setIsLoading(false);
        }
    };

    const handleAddressChange = (index: number, field: string, value: string) => {
        const newAddresses = [...addresses];

        if (field === "address") {
            newAddresses[index].address = value;
        } else {
            newAddresses[index].coords = {
                ...newAddresses[index].coords,
                [field]: value
            };
        }

        setAddresses(newAddresses);
    };

    const handleAddAddress = () => {
        setAddresses([...addresses, { address: "", coords: { lat: null, lng: null } }]);
        setAddressErrors(prev => [...prev, { address: "", lat: "", lng: "" }]);
    };

    const handleDeleteAddress = (index: number) => {
        const newAddresses = addresses.filter((_, i) => i !== index);
        setAddresses(newAddresses);
    };

    useEffect(() => {
        handleShowMainForm && (setShow(true), setIsEdit(true));
    }, [handleShowMainForm]);

    useEffect(() => {
        if (handleShowMainFormEdit) {
            setShow(true);
            setZoneName(editData?.zoneName);
            setZoneManager(editData?.zoneManager);
            setAddresses(editData?.geolocations);
            setIdRow(editData?.uid);
        }
    }, [editData, handleShowMainFormEdit]);


    return {
        modeTheme: themeParsed?.dataThemeMode,
        show,
        isLoading,
        isEdit,
        zoneName,
        setZoneName,
        zoneManager,
        setZoneManager,
        addresses,
        setAddresses,
        zoneNameError,
        zoneManagerError,
        addressesError,
        handleSendForm,
        handleClose,
        handleReset,
        handleEditForm,
        handleAddressChange,
        handleAddAddress,
        handleDeleteAddress,
        addressErrors
    };
};

export default ZonesFormHook;
