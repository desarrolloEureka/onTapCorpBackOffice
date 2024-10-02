// Coordenadas para múltiples puntos
export const fixedPoints = [
    { lat: 3.41092, lng: -76.54129 }, // Punto Fijo 1
    { lat: 3.42057, lng: -76.52933 }, // Punto Fijo 2
    { lat: 3.43013, lng: -76.51887 }, // Punto Fijo 3
    { lat: 3.44365, lng: -76.50714 }, // Punto Fijo 4
    { lat: 3.45028, lng: -76.49556 }, // Punto Fijo 5
];

// Coordenadas para trazar una ruta
export const routeCoordinates = [
    { lat: 3.40582, lng: -76.53892 }, // Inicio Ruta
    { lat: 3.41234, lng: -76.52347 }, // Punto Medio 1
    { lat: 3.42567, lng: -76.52016 }, // Punto Medio 2
    { lat: 3.43541, lng: -76.53563 }, // Punto Medio 3
    { lat: 3.44213, lng: -76.55018 }, // Fin Ruta
];

// Coordenadas para un área (polígono) con 3 o más puntos
export const zoneCoordinates = [
    { lat: 3.43785, lng: -76.52143 }, // Punto 1
    { lat: 3.44158, lng: -76.50992 }, // Punto 2
    { lat: 3.45023, lng: -76.51337 }, // Punto 3
    { lat: 3.45291, lng: -76.52665 }, // Punto 4
];

// Coordenadas para las sedes
export const officeLocations = [
    { lat: 3.45164, lng: -76.53199 }, // Sede Principal
    { lat: 3.48856, lng: -76.52013 }, // Sede Norte
    { lat: 3.39954, lng: -76.54741 }, // Sede Sur
    { lat: 3.42967, lng: -76.48867 }, // Sede Este
    { lat: 3.45107, lng: -76.56144 }, // Sede Oeste
];

// Coordenadas de los empleados
export const employeeLocations = [
    { lat: 3.45074, lng: -76.53191 }, // Empleado 1
    { lat: 3.45543, lng: -76.53512 }, // Empleado 2
    { lat: 3.46236, lng: -76.51859 }, // Empleado 3
    { lat: 3.43915, lng: -76.52849 }, // Empleado 4
    { lat: 3.43387, lng: -76.53716 }, // Empleado 5
];

// Coordenadas para el polígono (Ejemplo: Triángulo en Cali)
export const polygonCoords = [
    [
        [-76.532031, 3.451646], // Punto 1
        [-76.53745, 3.459378], // Punto 2
        [-76.525392, 3.454872], // Punto 3
        [-76.532031, 3.451646], // Punto 1 (cerrar el polígono)
    ],
];
