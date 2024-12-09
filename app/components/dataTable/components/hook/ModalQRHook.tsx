"use client";
import { LocalVariable } from "@/types/global";
import { useEffect, useState } from "react";

const ModalQRHook = ({
    handleShowMainForm,
    setHandleShowMainForm,
    data,
}: {
    handleShowMainForm: boolean;
    setHandleShowMainForm: (e: boolean) => void;
    data: any;
}
) => {
    const [show, setShow] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [urlQR, setUrlQR] = useState('');
    const theme = localStorage.getItem("@theme");
    const themeParsed = theme ? (JSON.parse(theme) as LocalVariable) : null;

    const handleClose = () => {
        setShow(false);
        setHandleShowMainForm(false);
        setIsLoading(false);
        setUrlQR('');
    };

    const handleDownloadQR = () => {
        // Obtener el elemento SVG del QR
        const svgElement = document.getElementById("qrcode-svg");

        // Verificar si el elemento encontrado es un SVGElement
        if (!(svgElement instanceof SVGElement)) {
            console.error("Elemento SVG no encontrado");
            return;
        }

        // Tamaño deseado para el SVG y el canvas
        const size = 1500;

        // Margen deseado para el QR dentro del canvas
        const margin = 100;

        // Crear un elemento <canvas> para convertir SVG a imagen
        const canvas = document.createElement("canvas");
        const context = canvas.getContext("2d");

        // Verificar si el contexto 2D está disponible
        if (!context) {
            console.error("Contexto 2D no disponible");
            return;
        }

        // Dimensionar el canvas para ajustarse al SVG más los márgenes
        canvas.width = size + 2 * margin;
        canvas.height = size + 2 * margin;

        // Rellenar el canvas con fondo blanco
        context.fillStyle = "#ffffff";
        context.fillRect(0, 0, canvas.width, canvas.height);

        // Dibujar el SVG en el canvas con los márgenes
        const svgXML = new XMLSerializer().serializeToString(svgElement);
        const svg64 = btoa(svgXML);
        const b64Start = "data:image/svg+xml;base64,";

        const image = new Image();
        image.onload = () => {
            context.drawImage(image, margin, margin, size, size);

            // Obtener la URL de datos del canvas en formato PNG
            const imageDataURL = canvas.toDataURL("image/png");

            // Crear un elemento <a> para descargar
            const downloadLink = document.createElement("a");
            downloadLink.href = imageDataURL;
            downloadLink.download = "qrcode.png";

            // Añadir el enlace al documento y hacer clic en él
            document.body.appendChild(downloadLink);
            downloadLink.click();

            // Limpiar después de la descarga
            document.body.removeChild(downloadLink);
        };

        image.src = b64Start + svg64;
    };

    useEffect(() => {
        if (handleShowMainForm) {
            setShow(true);
            setUrlQR(data?.preview);
        }
    }, [data, handleShowMainForm]);

    return {
        modeTheme: themeParsed?.dataThemeMode,
        show,
        urlQR,
        handleClose,
        handleDownloadQR
    };
};

export default ModalQRHook;