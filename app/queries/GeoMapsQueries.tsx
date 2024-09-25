import axios from "axios";

export const getCoordinates = async (address: string) => {
    try {
        const apiKey = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY; // Reemplaza con tu clave API
        const response = await axios.get(
            `https://maps.googleapis.com/maps/api/geocode/json`,
            {
                params: {
                    address: address,
                    key: apiKey,
                },
            },
        );

        const data = response.data;

        if (!address) return null;

        if (data.status === "OK") {
            const { lat, lng } = data.results[0].geometry.location;
            return { lat, lng };
        } else {
            console.error("Error en la API de Google:", data.status);
            return null;
        }
    } catch (error) {
        console.error("Error al obtener coordenadas:", error);
        return null;
    }
};
