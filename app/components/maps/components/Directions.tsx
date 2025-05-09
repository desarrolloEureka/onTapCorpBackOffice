import { useEffect, useRef, useState } from "react";

import { Coords } from "@/types/googleMaps";
import { useMap, useMapsLibrary } from "@vis.gl/react-google-maps";

type DirectionsMapsProps = {
  waypointsCoords: Coords[];
  // onClick?: (e: google.maps.MapMouseEvent) => void;
};

function DirectionsMaps({
  waypointsCoords,
}: // onClick,
DirectionsMapsProps) {
  const map = useMap();
  const routesLibrary = useMapsLibrary("routes");
  const [infoWindow, setInfoWindow] = useState<google.maps.InfoWindow>();
  const [directionsService, setDirectionsService] =
    useState<google.maps.DirectionsService | null>();
  const [directionsRenderer, setDirectionsRenderer] =
    useState<google.maps.DirectionsRenderer>();
  const [routes, setRoutes] = useState<google.maps.DirectionsRoute[]>([]);
  const [routeIndex, setRouteIndex] = useState(0);
  const selected = routes[routeIndex];
  const leg = selected?.legs[0];

  // Initialize directions service and renderer
  useEffect(() => {
    if (!routesLibrary || !map) return;
    setDirectionsService(new routesLibrary.DirectionsService());
    setDirectionsRenderer(new routesLibrary.DirectionsRenderer({ map }));
    setInfoWindow(new google.maps.InfoWindow());
  }, [routesLibrary, map]);

  // Use directions service
  useEffect(() => {
    if (!directionsService || !directionsRenderer || waypointsCoords.length < 2)
      return;
    const waypoints = waypointsCoords
      .slice(1, waypointsCoords.length - 1)
      .map((coords) => ({
        location: new google.maps.LatLng(coords.lat, coords.lng),
        stopover: true,
      }));
    directionsService
      .route({
        origin: waypointsCoords[0],
        destination: waypointsCoords[waypointsCoords.length - 1],
        waypoints: waypoints,
        travelMode: google.maps.TravelMode.DRIVING,
        provideRouteAlternatives: true,
      })
      .then((response) => {
        directionsRenderer.setDirections(response);
        directionsRenderer.setMap(map);
        directionsRenderer.setOptions({
          polylineOptions: {
            strokeColor: "#071FD1",
            strokeOpacity: 0.8,
            strokeWeight: 7,
          },
          infoWindow: infoWindow,
          preserveViewport: true,
        });
        setRoutes(response.routes);
      });
    return () => directionsRenderer.setMap(null);
  }, [directionsService, directionsRenderer, infoWindow, map, waypointsCoords]);

  // Update direction route
  useEffect(() => {
    if (!directionsRenderer) return;
    directionsRenderer.setRouteIndex(routeIndex);
  }, [routeIndex, directionsRenderer]);

  if (!leg) return null;
  return (
    <div className="directions">
      <h2>{selected.summary}</h2>
      <p>
        {leg.start_address.split(",")[0]} to {leg.end_address.split(",")[0]}
      </p>
      <p>Distance: {leg.distance?.text}</p>
      <p>Duration: {leg.duration?.text}</p>

      <h2>Other Routes</h2>
      <ul>
        {routes.map((route, index) => (
          <li key={route.summary}>
            <button onClick={() => setRouteIndex(index)}>
              {route.summary}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default DirectionsMaps;
