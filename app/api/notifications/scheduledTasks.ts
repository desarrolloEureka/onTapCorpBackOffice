var cron = require('node-cron');
import useAuth from '@/firebase/auth';
import { getEmployeesByCompanyIdQuery, sendNotificationsToUsersQuery } from '@/queries/documentsQueries';

const useSendBirthdayNotifications = async () => {
    const { companyData } = useAuth();
    try {
        const employees = await getEmployeesByCompanyIdQuery(companyData?.uid);
        const today = new Date();
        const todayString = today.toISOString().split('T')[0]; // Formato YYYY-MM-DD

        // Filtrar empleados que cumplen años hoy
        const birthdayEmployees = employees.filter(employee => {
            const birthDate = new Date(employee?.dateOfBirth[0]);
            return birthDate.toISOString().split('T')[0] === todayString;
        });

        if (birthdayEmployees.length === 0) {
            console.log("No hay empleados que cumplen años hoy.");
            return;
        }

        const tokens = birthdayEmployees.map(employee => employee.tokens).filter(token => token !== undefined);
        const title = "¡Felicidades!";
        const body = `${companyData?.businessName[0]} te desea un feliz cumpleaños.`;
        await sendNotificationsToUsersQuery(tokens, title, body, companyData?.icon[0]);
        console.log("Notificaciones de cumpleaños enviadas exitosamente.");
    } catch (error) {
        console.error("Error al enviar notificaciones de cumpleaños:", error);
    }
};
// Función para programar el envío de notificaciones de cumpleaños
const scheduleBirthdayNotifications = () => {
    console.log("Verificando tarea programada ...");
    // Ejecutar la tarea todos los días a las 8 AM
    cron.schedule('* 8 * * *', async () => {
        console.log("Verificando empleados con cumpleaños hoy...");
        await useSendBirthdayNotifications();
    });
};

// Exportar la función
export default scheduleBirthdayNotifications;