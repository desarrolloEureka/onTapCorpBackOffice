interface WelcomeEmailProps {
    userName?: string;
    userEmail?: string;
    password?: string;
    loginUrlApple?: string;
    loginUrl?: string;
    loginUrlAndroid?: string;
    contactEmail?: string;
    rolId?: string
}
export const plantillaBienvenida = ({
    userName,
    userEmail,
    password,
    loginUrlApple,
    loginUrlAndroid,
    contactEmail,
    rolId,
    loginUrl,
}: WelcomeEmailProps): string => {
    let appLinks;
    if (rolId === "uysG1ULyEDklfbGDFate") {
        appLinks = `
        <a href="${loginUrlApple}" 
        style="margin-top: 1.5rem; display: inline-flex; align-items: center; background-color: #2563eb; color: #ffffff; padding: 0.5rem 1rem; border-radius: 0.5rem; text-decoration: none; gap: 0.5rem;">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1024 1024" fill="#ffffff" style="width: 20px; height: 20px;">
                <path d="M834 664c-14-4-25-13-33-23-26-38-53-75-80-113-5-7-5-10-1-17 12-21 23-42 35-62 30-50 51-105 59-164 5-34 5-67-5-100-15-51-48-86-98-104-50-19-98-15-146 6-43 18-81 46-118 75-28 21-52 21-81 0-29-21-58-42-89-60-42-22-86-25-129-8-38 15-62 42-74 81-9 30-8 61-5 91 7 66 25 128 57 186 15 28 33 53 50 79 5 8 5 13 0 20-25 36-51 72-76 109-19 29-40 56-62 82-16 18-36 32-62 36v68h256c1-33-14-56-31-79-27-37-54-75-81-113-5-8-5-12 1-20 26-37 53-75 79-112 5-7 9-11 15-20 27 33 51 62 75 90 26 30 49 62 75 93 23 28 45 55 67 83 23 29 37 63 31 101h255v-68c-34-7-59-28-81-53-39-43-73-91-108-137-4-6-7-11-9-18h0l1-1 0 1zm-178-516c22 7 41 18 63 24-2 11-5 20-7 29-7 29-18 56-34 81-20 30-47 54-81 68-2-14-5-25-8-36-5-26-13-50-27-71-17-26-41-46-63-67 41-22 82-37 123-28h0z" />
            </svg>
            IOS
        </a>
        <a href="${loginUrlAndroid}" 
        style="margin-top: 1.5rem; display: inline-flex; align-items: center; background-color: #2563eb; color: #ffffff; padding: 0.5rem 1rem; border-radius: 0.5rem; text-decoration: none; gap: 0.5rem;">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="#ffffff" style="width: 20px; height: 20px;">
                <path d="M16.65 2.59c.16-.32.1-.72-.17-.94-.27-.23-.64-.24-.91-.05l-.18.12c-.43.32-.83.68-1.18 1.1-.35.42-.66.9-.92 1.4H10.64c-.26-.5-.57-.97-.92-1.4-.35-.42-.75-.78-1.18-1.1l-.18-.12c-.28-.2-.64-.19-.91.05-.27.22-.33.62-.17.94l.15.26c.34.62.71 1.2 1.11 1.76H7.88c-.75 0-1.36.61-1.36 1.36V15c0 .75.61 1.36 1.36 1.36h.33v2.86c0 .75.61 1.36 1.36 1.36h1.8c.75 0 1.36-.61 1.36-1.36V16.36h1.6v2.86c0 .75.61 1.36 1.36 1.36h1.8c.75 0 1.36-.61 1.36-1.36V16.36h.33c.75 0 1.36-.61 1.36-1.36V6.96c0-.75-.61-1.36-1.36-1.36h-1.91c.4-.56.77-1.14 1.11-1.76l.15-.25zM9 10.27H8.14c-.37 0-.68.3-.68.68v4.1c0 .38.3.68.68.68H9c.37 0 .68-.3.68-.68v-4.1c0-.38-.3-.68-.68-.68zm6.86 0H15c-.37 0-.68.3-.68.68v4.1c0 .38.3.68.68.68h.86c.37 0 .68-.3.68-.68v-4.1c0-.38-.3-.68-.68-.68zM12 8.1c-.53 0-.96-.43-.96-.96s.43-.96.96-.96.96.43.96.96-.43.96-.96.96z"/>
            </svg>
            Play Store
        </a>
        `;
      } else {
        appLinks = `
          <a href="${loginUrl}" style="margin-top: 1.5rem; display: inline-block; background-color: #2563eb; color: #ffffff; padding: 0.5rem 1rem; border-radius: 0.5rem; text-decoration: none;">Iniciar Sesión</a>
        `;
      }
      
    const plantilla = `<!DOCTYPE html>
<html lang="es">
    <head>
        <meta charset="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>Bienvenida</title>
    </head>
    <body style="background-color: #e2e8f0;">
        <div style="max-width: 32rem; margin: 2.5rem auto; background-color: #ffffff; border-radius: 0.5rem; box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05);">
            <div style="background-color: #2563eb; color: #ffffff; text-align: center; padding: 1rem; border-top-left-radius: 0.5rem; border-top-right-radius: 0.5rem;">
                <h1 style="font-size: 1.5rem; font-weight: bold;">Bienvenidos a One Tap</h1>
            </div>
            <div style="padding: 1.5rem;">
                <p style="color: #4a5568; font-size: 1.125rem;">Hola <span style="font-weight: bold;">${userName}</span>,</p>
                <p style="margin-top: 1rem; color: #4a5568;">
                    Es un gusto para nosotros recibirte en One Tap, para que juntos construyamos la nueva manera compartir información.
                </p>
                <p style="margin-top: 1rem; color: #4a5568;">
                    A continuación, relacionamos los datos para que inicies sesión:
                </p>
                <div style="background-color: #f7fafc; padding: 1rem; border-radius: 0.5rem; margin-top: 1rem;">
                    <p style="color: #4a5568;"><strong>Email:</strong> ${userEmail}</p>
                    <p style="color: #4a5568;"><strong>Contraseña:</strong> ${password}</p>
                </div>
                <p style="margin-top: 1rem; color: #4a5568;">
                    Te invitamos a que descargues las aplicaciones tanto en IOS como en Play Store
                </p>
                ${appLinks} 
            </div>
            <div style="text-align: center; padding: 1rem; color: #718096; font-size: 0.875rem; border-top: 1px solid #e2e8f0;">
                <p>
                    Si tienes alguna pregunta, no dudes en
                    <a href="mailto:${contactEmail}" style="color: #2563eb; text-decoration: none;">contactarnos</a>.
                </p>
                <p style="margin-top: 0.5rem;">© 2024 OneTap Corp. Todos los derechos reservados.</p>
            </div>
        </div>
    </body>
</html>
`;
    return plantilla;
};
