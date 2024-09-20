"use client";
import { getGeolocation } from "@/data/formConstant";
import useAuth from "@/firebase/auth";
import {
    getAllDocumentsQuery,
    getZonesByIdQuery,
    saveRouteQuery,
    updateRouteQuery,
} from "@/queries/documentsQueries";
import { LocalVariable } from "@/types/global";
import { ModalParamsMainForm } from "@/types/modals";
import { SelectChangeEvent } from "@mui/material/Select";
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
    //const [addresses, setAddresses] = useState<string[]>([]);
    const [addresses, setAddresses] = useState([""]);
    const [hours, setHours] = useState(0);
    const [minutes, setMinutes] = useState(0);

    // Errores
    const [routeNameError, setRouteNameError] = useState("");
    const [routeManagerError, setRouteManagerError] = useState("");
    const [zoneError, setZoneError] = useState("");
    const [addressesError, setAddressesError] = useState("");
    const [hoursError, setHoursError] = useState("");
    const [minutesError, setMinutesError] = useState("");

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

        // Validación del campo 'addresses'
        if (addresses.length === 0) {
            setAddressesError("Debe agregar al menos una dirección");
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
        setAddresses([""]);
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

    const handleSendForm = async (e?: any) => {
        e.preventDefault();

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

        //Coordenadas de la Dirección
        const allCoordsFromAddresses: {
            address: string;
            coords: { lat: number; lng: number } | null;
        }[] = await getCoordinatesFromAddresses(addresses);

        // Validar los campos antes de continuar
        if (!validateFields()) return;

        setIsLoading(true);

        try {
            const now = new Date();
            const date = now.toISOString().split("T")[0]; // Formato YYYY-MM-DD
            const hour = now.toTimeString().split(" ")[0]; // Formato HH:MM:SS
            const zoneData = await getZonesByIdQuery(selectedZone);

            if (userData?.companyId) {
                const formData = {
                    routeName,
                    routeManager,
                    zone: selectedZone,
                    zoneName: zoneData?.zoneName,
                    addresses,
                    estimatedHours: hours,
                    estimatedMinutes: minutes,
                    createdDate: date,
                    createdTime: hour,
                    idCompany: userData?.companyId,
                    geolocations: allCoordsFromAddresses,
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

        // Validar los campos antes de continuar
        if (!validateFields()) return;

        setIsLoading(true);

        try {
            const now = new Date();
            const date = now.toISOString().split("T")[0]; // Formato YYYY-MM-DD
            const hour = now.toTimeString().split(" ")[0]; // Formato HH:MM:SS
            const zoneData = await getZonesByIdQuery(selectedZone);

            if (idRow) {
                const updatedData = {
                    routeName,
                    routeManager,
                    zone: selectedZone,
                    zoneName: zoneData?.zoneName,
                    addresses,
                    estimatedHours: hours,
                    estimatedMinutes: minutes,
                    createdDate: date,
                    createdTime: hour,
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

    const handleAddressChange = (index: number, value: string) => {
        const newAddresses = [...addresses];
        newAddresses[index] = value;
        setAddresses(newAddresses);
    };

    const handleAddAddress = () => {
        setAddresses([...addresses, ""]);
    };

    const getZonesData = async () => {
        const dataZones = await getAllDocumentsQuery("zones");
        setZonesData(dataZones);
    };

    useEffect(() => {
        getZonesData();
    }, []);

    useEffect(() => {
        handleShowMainForm && (setShow(true), setIsEdit(true));
    }, [handleShowMainForm]);

    useEffect(() => {
        handleShowMainFormEdit &&
            (setShow(true),
            setRouteName(editData?.routeName),
            setRouteManager(editData?.routeManager),
            setAddresses(editData?.addresses),
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
    };
};

export default RoutesFormHook;
