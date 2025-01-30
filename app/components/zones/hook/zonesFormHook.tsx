"use client";
import { getGeolocation } from "@/data/formConstant";
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
    const [addresses, setAddresses] = useState(["", "", ""]);
    const [idRow, setIdRow] = useState("");

    // Errores
    const [zoneNameError, setZoneNameError] = useState("");
    const [zoneManagerError, setZoneManagerError] = useState("");
    const [addressesError, setAddressesError] = useState("");

    const theme = localStorage.getItem("@theme");
    const themeParsed = theme ? (JSON.parse(theme) as LocalVariable) : null;

    const getCoordinatesFromAddresses = async (addresses: string[]) => {
        // Mapeamos cada dirección a una promesa de obtener las coordenadas
        const coordsFromAddress: Promise<{
            address: string;
            coords: { lat: number; lng: number } | null;
        }>[] = addresses.map(async (address: string) => {
            const coords = await getGeolocation(address, companyData);

            return { address, coords };
        });

        // Esperamos a que todas las promesas se resuelvan
        const resolvedCoords = await Promise.all(coordsFromAddress);

        // `resolvedCoords` contiene ahora los resultados reales
        return resolvedCoords;
    };

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

        // Validación del campo 'addresses'
        if (addresses.length < 3) {
            setAddressesError("Debe agregar al menos tres direcciones");
            valid = false;
        } else {
            // Validar cada dirección
            const invalidAddresses = addresses.some(
                (address) => !address.trim(),
            );
            if (invalidAddresses) {
                setAddressesError("Cada dirección debe ser válida");
                valid = false;
            } else {
                setAddressesError("");
            }
        }

        return valid;
    };

    const handleSendForm = async (e?: any) => {
        e.preventDefault();

        // Validar los campos antes de continuar
        if (!validateFields()) return;

        //Coordenadas de la Dirección
        const allCoordsFromAddresses: {
            address: string;
            coords: { lat: number; lng: number } | null;
        }[] = await getCoordinatesFromAddresses(addresses);

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
                    addresses,
                    date,
                    hour,
                    geolocations: allCoordsFromAddresses,
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
        setAddresses(["", "", ""]);
        setZoneNameError("");
        setZoneManagerError("");
        setAddressesError("");
    };

    const handleEditForm = async (e: any) => {
        e.preventDefault();
        e.stopPropagation();

        if (!validateFields()) return;

        //Coordenadas de la Dirección
        const allCoordsFromAddresses: {
            address: string;
            coords: { lat: number; lng: number } | null;
        }[] = await getCoordinatesFromAddresses(addresses);

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
                    addresses,
                    date,
                    hour,
                    uid: idRow,
                    geolocations: allCoordsFromAddresses,
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

    const handleAddressChange = (index: number, value: string) => {
        const newAddresses = [...addresses];
        newAddresses[index] = value;
        setAddresses(newAddresses);
    };

    const handleAddAddress = () => {
            setAddresses([...addresses, ""]);
    };

    const handleDeleteAddress = (index: number) => {
        const newAddresses = addresses.filter((_, i) => i !== index);
        setAddresses(newAddresses);
    };
    
    useEffect(() => {
        handleShowMainForm && (setShow(true), setIsEdit(true));
    }, [handleShowMainForm]);

    useEffect(() => {
        handleShowMainFormEdit &&
            (setShow(true),
            setZoneName(editData?.zoneName),
            setZoneManager(editData?.zoneManager),
            setAddresses(editData?.addresses),
            setIdRow(editData?.uid));
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
    };
};

export default ZonesFormHook;
