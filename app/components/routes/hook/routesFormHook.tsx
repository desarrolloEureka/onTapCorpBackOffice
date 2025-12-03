"use client";
import { getGeolocation } from "@/data/formConstant";
import useAuth from "@/firebase/auth";
import {
    getAllDocumentsQuery,
    getZonesByIdQuery,
    saveRouteQuery,
    updateRouteQuery,
    listenToDocumentsQuery
} from "@/queries/documentsQueries";
import { LocalVariable } from "@/types/global";
import { ModalParamsMainForm } from "@/types/modals";
import { SelectChangeEvent } from "@mui/material/Select";
import moment from "moment";
import { useEffect, useRef, useState } from "react";

const RoutesFormHook = ({
    handleShowMainForm,
    setHandleShowMainForm,
    handleShowMainFormEdit,
    setHandleShowMainFormEdit,
    editData,
}: ModalParamsMainForm) => {
    const { userData, companyData } = useAuth();
    const [show, setShow] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [isEdit, setIsEdit] = useState(false);
    const [zonesData, setZonesData] = useState<any[] | null>(null);
    const [idRow, setIdRow] = useState("");
    const hourRef = useRef(null);
    const minuteRef = useRef(null);
    const theme = localStorage.getItem("@theme");
    const themeParsed = theme ? (JSON.parse(theme) as LocalVariable) : null;

    // Datos
    const [routeName, setRouteName] = useState("");
    const [routeManager, setRouteManager] = useState("");
    const [selectedZone, setSelectedZone] = useState("");
    //const [addresses, setAddresses] = useState(["", ""]);
    const [addresses, setAddresses] = useState([
        { address: "", coords: { lat: null, lng: null } },
        { address: "", coords: { lat: null, lng: null } },
    ]);
    const [hours, setHours] = useState(0);
    const [minutes, setMinutes] = useState(0);

    // Errores
    const [routeNameError, setRouteNameError] = useState("");
    const [routeManagerError, setRouteManagerError] = useState("");
    const [zoneError, setZoneError] = useState("");
    const [addressesError, setAddressesError] = useState("");
    const [hoursError, setHoursError] = useState("");
    const [minutesError, setMinutesError] = useState("");
    const [addressErrors, setAddressErrors] = useState([
        { address: "", lat: "", lng: "" },
        { address: "", lat: "", lng: "" },
    ]);

    const currentDate = moment().format();

    // Crear un rango de opciones para horas y minutos
    const generateOptions = (max: any) =>
        Array.from({ length: max + 1 }, (_, i) => i);


    const validateFields = () => {
        let valid = true;

        // Validación del campo 'routeName'
        if (!routeName.trim()) {
            setRouteNameError("El nombre de la zona es requerido");
            valid = false;
        } else if (routeName.length < 3) {
            setRouteNameError(
                "El nombre de la zona debe tener al menos 3 caracteres",
            );
            valid = false;
        } else {
            setRouteNameError("");
        }

        // Validación del campo 'routeManager'
        if (!routeManager.trim()) {
            setRouteManagerError("El jefe de zona es requerido");
            valid = false;
        } else if (routeManager.length < 3) {
            setRouteManagerError(
                "El nombre del jefe de zona debe tener al menos 3 caracteres",
            );
            valid = false;
        } else {
            setRouteManagerError("");
        }

        // Validación del campo 'selectedZone'
        if (!selectedZone.trim()) {
            setZoneError("La zona es requerida");
            valid = false;
        } else {
            setZoneError("");
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

        if (hours === 0 && minutes === 0) {
            setHoursError("La hora y los minutos no pueden ser 0.");
            valid = false;
        } else {
            setHoursError("");
        }

        return valid;
    };

    const handleChangeZone = (event: SelectChangeEvent<string>) => {
        setSelectedZone(event.target.value as string);
    };

    const handleClose = () => {
        setShow(false);
        setHandleShowMainForm(false);
        setHandleShowMainFormEdit(false);
        handleReset();
        setIsEdit(false);
    };

    const handleReset = () => {
        setRouteName("");
        setRouteManager("");
        setAddresses([
            { address: "", coords: { lat: null, lng: null } },
            { address: "", coords: { lat: null, lng: null } },
        ]);
        setRouteNameError("");
        setRouteManagerError("");
        setAddressesError("");
        setZoneError("");
        setHoursError("");
        setMinutesError("");
        setSelectedZone("");
        setHours(0);
        setMinutes(0);
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
            // const now = new Date();
            // const date = now.toISOString().split("T")[0]; // Formato YYYY-MM-DD
            // const hour = now.toTimeString().split(" ")[0]; // Formato HH:MM:SS
            const zoneData = await getZonesByIdQuery(selectedZone);

            if (userData?.companyId) {
                const formData = {
                    routeName,
                    routeManager,
                    zone: selectedZone,
                    zoneName: zoneData?.zoneName,
                    estimatedHours: hours,
                    estimatedMinutes: minutes,
                    // createdDate: date,
                    // createdTime: hour,
                    timestamp: currentDate,
                    idCompany: userData?.companyId,
                    geolocations
                };

                const zoneQueryResult = await saveRouteQuery(formData);

                if (zoneQueryResult.success) {
                    console.log("Route saved successfully");
                } else {
                    console.error(
                        "Failed to save route:",
                        zoneQueryResult.message,
                    );
                }
            } else {
                console.log(
                    "No se pudo encontrar la compañía. Por favor, inténtalo de nuevo.",
                );
                return;
            }
        } catch (error) {
            console.error("Error al enviar el formulario:", error);
        } finally {
            setIsLoading(false);
            handleClose();
        }
    };

    const handleEditForm = async (e: any) => {
        e.preventDefault();
        e.stopPropagation();

        if (!validateFields()) return;

        const geolocations = normalizeAddresses();
        setIsLoading(true);

        try {
            // const now = new Date();
            // const date = now.toISOString().split("T")[0]; // Formato YYYY-MM-DD
            // const hour = now.toTimeString().split(" ")[0]; // Formato HH:MM:SS
            const zoneData = await getZonesByIdQuery(selectedZone);

            if (idRow) {
                const updatedData = {
                    routeName,
                    routeManager,
                    zone: selectedZone,
                    zoneName: zoneData?.zoneName,
                    //addresses,
                    estimatedHours: hours,
                    estimatedMinutes: minutes,
                    // createdDate: date,
                    // createdTime: hour,
                    timestamp: currentDate,
                    geolocations
                };

                const zoneQueryResult = await updateRouteQuery(
                    updatedData,
                    idRow,
                );

                if (zoneQueryResult.success) {
                    console.log("Route saved successfully");
                } else {
                    console.error(
                        "Failed to save route:",
                        zoneQueryResult.message,
                    );
                }
            } else {
                console.log(
                    "No se pudo encontrar la ruta. Por favor, inténtalo de nuevo.",
                );
                return;
            }
        } catch (error) {
            console.error("Error al enviar el formulario:", error);
        } finally {
            setIsLoading(false);
            handleClose();
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
        const getZonesData = listenToDocumentsQuery("zones", setZonesData, companyData?.uid);
        return () => getZonesData(); // Limpia el listener cuando el componente se desmonte
    }, [companyData?.uid]);

    useEffect(() => {
        handleShowMainForm && (setShow(true), setIsEdit(true));
    }, [handleShowMainForm]);

    useEffect(() => {
        handleShowMainFormEdit &&
            (setShow(true),
                setRouteName(editData?.routeName),
                setRouteManager(editData?.routeManager),
                setAddresses(editData?.geolocations),
                setIdRow(editData?.uid),
                setSelectedZone(editData?.zone),
                setHours(editData?.estimatedHours),
                setMinutes(editData?.estimatedMinutes));
    }, [editData, handleShowMainFormEdit]);

    const scrollToCenter = (ref: any, index: any) => {
        const container = ref.current;
        if (container) {
            const items = container.children;
            const itemHeight = items[0]?.clientHeight || 0;
            const containerHeight = container.clientHeight;
            const numVisible = Math.floor(containerHeight / itemHeight);
            const middleIndex = Math.floor(numVisible / 2);
            const scrollOffset = index * itemHeight - middleIndex * itemHeight;
            container.scrollTo({ top: scrollOffset, behavior: "smooth" });
        }
    };

    useEffect(() => {
        scrollToCenter(hourRef, hours);
    }, [hours]);

    useEffect(() => {
        scrollToCenter(minuteRef, minutes);
    }, [minutes]);

    return {
        modeTheme: themeParsed?.dataThemeMode,
        show,
        isLoading,
        isEdit,
        routeName,
        setRouteName,
        routeManager,
        setRouteManager,
        addresses,
        setAddresses,
        routeNameError,
        routeManagerError,
        addressesError,
        handleSendForm,
        handleClose,
        handleReset,
        handleEditForm,
        handleAddressChange,
        handleAddAddress,
        handleDeleteAddress,
        zonesData,
        handleChangeZone,
        selectedZone,
        setSelectedZone,
        hours,
        setHours,
        setMinutes,
        minutes,
        generateOptions,
        hourRef,
        minuteRef,
        zoneError,
        hoursError,
        minutesError,
        addressErrors
    };
};

export default RoutesFormHook;
