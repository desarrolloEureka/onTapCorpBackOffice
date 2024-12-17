export const dynamic = 'force-dynamic'; // static by default, unless reading the request
import { NextRequest, NextResponse } from 'next/server';
import { getAllEmployeesQuery, getAllCompaniesQuery, sendNotificationQuery } from '@/queries/documentsQueries';

export async function GET(request: NextRequest) {
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
    await sendNotificationQuery("eVBvCCx9QdOZpy9Cgs11Rd:APA91bFumIdPVZNXSqJT3RZO1cPU3k2AWmmjEyvNmEPFVe4ph_7eweFg4ESn4qThJu77-fSCQ8gheT0HwHXymn30VDO8nT6FB3dwy-Lra1LKQuYWUROxwJY", "¡Felicidades!", "te desea un feliz cumpleaños.", "https://firebasestorage.googleapis.com/v0/b/onetapcorp-d0146.appspot.com/o/companiesIcons%2FtwQzX8pj0K18vqxDhj2Z%2FBlanco?alt=media&token=7efd4de8-adf6-4350-ad67-f598c78689e0");
    
    if (birthdayEmployees.length === 0) {
      return NextResponse.json({ message: 'No hay empleados con cumpleaños hoy' });
    }

    const updatedBirthdayEmployees = birthdayEmployees.map(employee => {
      const company: any = companies.find(company => company.uid === employee.idCompany);
      return {
        ...employee,
        companyName: company?.businessName[0] || '',
        companyImage: company?.icon[0] || '',
      };
    });

    const notificationPromises = updatedBirthdayEmployees.map(async (employee: any) => {
      if (!employee?.tokens) {
        return { success: false, message: 'No token available', employeeId: employee.id };
      }

      const body = `${employee?.companyName} te desea un feliz cumpleaños.`;
      const result = await sendNotificationQuery(employee.tokens, "¡Felicidades!", body, employee?.companyImage);

      return { success: result.success, message: result.message, employeeId: employee.id };
    });

    const results = await Promise.all(notificationPromises);
    console.log('Resultados de las notificaciones:', results);

    return NextResponse.json({ message: `Notificaciones de cumpleaños enviadas` });
  } catch (error) {
    console.error('Error al enviar notificaciones de cumpleaños:', error);
    return NextResponse.json({ error: 'Error al enviar notificaciones de cumpleaños' }, { status: 500 });
  }
}