interface WelcomeEmailProps {
    userName?: string;
    userEmail?: string;
    password?: string;
    loginUrlApple?: string;
    loginUrlAndroid?: string;
    contactEmail?: string;
}

export const plantillaBienvenida = ({
    userName,
    userEmail,
    password,
    loginUrlApple,
    loginUrlAndroid,
    contactEmail,
}: WelcomeEmailProps): string => {
    const appLinks = `
        <a href="${loginUrlApple}" 
           style="margin-top: 1.5rem; display: inline-block; text-decoration: none;">
            <img src="https://upload.wikimedia.org/wikipedia/commons/6/67/App_Store_%28iOS%29.svg" 
                 alt="Descargar en App Store" 
                 style="width: 50px; height: 50px; border-radius: 0.5rem;" />
        </a>
        <a href="${loginUrlAndroid}" 
           style="margin-top: 1.5rem; display: inline-block; text-decoration: none;">
            <img src="https://upload.wikimedia.org/wikipedia/commons/d/d0/Google_Play_Arrow_logo.svg"
                 alt="Descargar en Play Store" 
                 style="width: 50px; height: 50px; border-radius: 0.5rem;" />
        </a>
    `;

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
                <h1 style="font-size: 1.5rem; font-weight: bold;">Bienvenidos a OneTap Corporativo</h1>
            </div>
            <div style="padding: 1.5rem;">
                <p style="color: #4a5568; font-size: 1.125rem;">Hola <span style="font-weight: bold;">${userName}</span>,</p>
                <p style="margin-top: 1rem; color: #4a5568;">
                    Es un gusto para nosotros recibirte en One Tap, para que juntos construyamos la nueva manera de compartir información.
                </p>
                <p style="margin-top: 1rem; color: #4a5568;">
                    A continuación, relacionamos los datos para que inicies sesión:
                </p>
                <div style="background-color: #f7fafc; padding: 1rem; border-radius: 0.5rem; margin-top: 1rem;">
                    <p style="color: #4a5568;"><strong>Email:</strong> ${userEmail}</p>
                    <p style="color: #4a5568;"><strong>Contraseña:</strong> ${password}</p>
                </div>
                <p style="margin-top: 1rem; color: #4a5568;">
                    Te invitamos a que descargues las aplicaciones tanto en iOS como en Play Store:
                </p>
                <div style="text-align: center;">
                    ${appLinks}
                </div>
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
