var cron = require('node-cron');
import { getAllEmployeesQuery, getAllCompaniesQuery, sendNotificationQuery } from '@/queries/documentsQueries';

const useSendBirthdayNotifications = async () => {
    try {
        const employees = await getAllEmployeesQuery();
        const companies = await getAllCompaniesQuery();
        const today = new Date();
        const todayString = today.toISOString().split('T')[0]; // Formato YYYY-MM-DD

        // Filtrar empleados que cumplen años hoy
        const birthdayEmployees = employees.filter(employee => {
            const birthDate = new Date(employee?.dateOfBirth[0]);
            return birthDate.toISOString().split('T')[0] === todayString;
        });

        if (birthdayEmployees.length === 0) {
            //console.log("No hay empleados que cumplen años hoy.");
            return;
        }

        const updatedBirthdayEmployees = birthdayEmployees.map(employee => {
            const company:any = companies.find(company => company.uid === employee.idCompany);
            return {
                ...employee,
                companyName: company?.businessName[0] || '', 
                companyImage: company?.icon[0] || '', 
            };
        });

        const notificationPromises = updatedBirthdayEmployees.map(async (employee: any) => {
            if (!employee?.tokens) {
                //console.log(`Empleado ${employee.id} no tiene tokens disponibles para notificación.`);
                return { success: false, message: "No token available", employeeId: employee.id };
            }

            const body = `${employee?.companyName} te desea un feliz cumpleaños.`;
            const result = await sendNotificationQuery(employee.tokens, "¡Felicidades!", body, employee?.companyImage);

            return { success: result.success, message: result.message, employeeId: employee.id };
        });

        // Esperar a que todas las notificaciones se envíen
        const results = await Promise.all(notificationPromises);

        //console.log("Resultados de las notificaciones:", results);
    } catch (error) {
        console.error("Error al enviar notificaciones de cumpleaños:", error);
    }
};

// Función para programar el envío de notificaciones de cumpleaños
const scheduleBirthdayNotifications = () => {
    //console.log("Verificando tarea programada ...");
    // Ejecutar la tarea todos los días a las 8 AM
    cron.schedule('* 8 * * *', async () => {
        //console.log("Verificando empleados con cumpleaños hoy...");
        await useSendBirthdayNotifications();
    });
};

// Exportar la función
export default scheduleBirthdayNotifications;