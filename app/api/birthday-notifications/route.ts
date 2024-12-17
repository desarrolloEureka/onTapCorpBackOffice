export const dynamic = 'force-dynamic'; // static by default, unless reading the request
import { NextRequest, NextResponse } from 'next/server';
import { getAllEmployeesQuery, getAllCompaniesQuery, sendNotificationQuery } from '@/queries/documentsQueries';

export async function GET(request: NextRequest) {
  try {
    const employees = await getAllEmployeesQuery();
    const companies = await getAllCompaniesQuery();
    const today = new Date().toISOString().split('T')[0]; // Formato YYYY-MM-DD
    const [_, todayMonth, todayDay] = today.split('-').map(Number);
    // Filtrar empleados que cumplen años hoy
    const birthdayEmployees = employees.filter(employee => {
      const [_, birthMonth, birthDay] = employee?.dateOfBirth[0]).split('-').map(Number);
      return birthMonth === todayMonth && birthDay === todayDay;
    });

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

    return NextResponse.json({ message: `Notificaciones de cumpleaños enviadas` });
  } catch (error) {
    console.error('Error al enviar notificaciones de cumpleaños:', error);
    return NextResponse.json({ error: 'Error al enviar notificaciones de cumpleaños' }, { status: 500 });
  }
}
