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

export const getAddressFromCoordinates = async (latitude: number, longitude: number) => {
    try {
        const apiKey = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY; // Asegúrate de tener tu clave API configurada
        if (latitude && longitude) {
            const response = await axios.get(
                `https://maps.googleapis.com/maps/api/geocode/json`,
                {
                    params: {
                        latlng: `${latitude},${longitude}`,
                        key: apiKey,
                    },
                }
            );

            if (response.data.status === "OK") {
                // Retorna la dirección formateada
                return response.data.results[0].formatted_address;
            }
        }

    } catch (error) {
        return null;
    }
};
