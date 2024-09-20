import { useState } from "react";
import GeoMapsHook from "./hook/GeoMapsHook";

const GeoMapsComponent = () => {
    const { getCoordinates } = GeoMapsHook();

    const [address, setAddress] = useState("");
    const [coordinates, setCoordinates] = useState<{
        lat: number;
        lng: number;
    } | null>(null);
    const [loading, setLoading] = useState(false);

    const handleGetCoordinates = async () => {
        setLoading(true);
        const coords = await getCoordinates(address);
        if (coords) {
            setCoordinates(coords);
        }
        setLoading(false);
    };

    return (
        <div>
            <h2>Obtener Coordenadas</h2>
            <input
                type="text"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                placeholder="Ingresa una dirección"
            />
            <button onClick={handleGetCoordinates} disabled={loading}>
                {loading ? "Cargando..." : "Obtener Coordenadas"}
            </button>

            {coordinates && (
                <div>
                    <p>Latitud: {coordinates.lat}</p>
                    <p>Longitud: {coordinates.lng}</p>
                </div>
            )}
        </div>
    );
};

export default GeoMapsComponent;
