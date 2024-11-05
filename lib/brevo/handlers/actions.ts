"use server";

import { sendEmail } from "../brevoWithApiKey";
// import { sendEmailSMTP } from "../brevoWithSMTP";
import { plantillaBienvenida } from "../plantillas/bienvenida";
import { plantillaCierreOrden } from "../plantillas/cierreOrden";
import { plantillaNuevaOrden } from "../plantillas/nuevaOrden";

export const handleSendWelcomeEmail = async (data: any) => {
    try {
        // Para envío con SMTP usar sendEmailSMTP.
        await sendEmail({
            subject: "¡Bienvenido a OneTap Corp!",
            to: [
                {
                    name: `${data.name} ${data.lastName}`,
                    email: data.email,
                },
            ],

            htmlContent: plantillaBienvenida({
                userName: `${data.name} ${data.lastName}`,
                userEmail: data.email,
                password: data.id,
                //Cambiar la URL de login a producción
                /* loginUrl: "https://one-tap-corp-dev.vercel.app/components/signIn/",
                 LINK DE LOGUEO DE BIENVENIDA DESARROLLO VERCEL*/
                loginUrl: "https://one-tap-corp.vercel.app/components/signIn/",
                contactEmail: "info@onetap.com.co",
            }),
        });
    } catch (error) {
        console.log("Este fue el error: ", error);
    }
};

// export const handleSendFinishedOrderEmail = async (data: any) => {
//     try {
//         // Para envío con SMTP usar sendEmailSMTP.
//         await sendEmail({
//             subject: "¡Finalización de orden!",
//             to: [
//                 {
//                     name: `${data.name} ${data.lastName}`,
//                     email: data.email,
//                 },
//                 {
//                     name: data.professionalName,
//                     email: data.professionalEmail,
//                 },
//             ],
//             htmlContent: plantillaCierreOrden({
//                 ...data,
//                 loginUrl: "https://rx-country-client.vercel.app/sign-in",
//                 contactEmail: "soporte-rxcountry@yopmail.com",
//             }),
//         });
//     } catch (error) {
//         console.log("Este fue el error: ", error);
//     }
// };

// export const handleSendNewOrderEmail = async (data: any) => {
//     try {
//         // Para envío con SMTP usar sendEmailSMTP.
//         await sendEmail({
//             subject: "¡Nueva orden registrada!",
//             to: [
//                 {
//                     name: `${data.name} ${data.lastName}`,
//                     email: data.email,
//                 },
//             ],
//             htmlContent: plantillaNuevaOrden({
//                 ...data,
//                 loginUrl: "https://rx-country-client.vercel.app/sign-in",
//                 contactEmail: "soporte-rxcountry@yopmail.com",
//             }),
//         });
//     } catch (error) {
//         console.log("Este fue el error: ", error);
//     }
// };
