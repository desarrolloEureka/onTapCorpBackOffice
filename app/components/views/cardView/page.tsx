"use client";
import CustomModalAlert from "@/components/customModalAlert/CustomModalAlert";
import {
    getAreaDataByIdFb,
    getCompanyDataByIdFb,
    getHeadquarterDataByIdFb,
    SendDataMetrics,
} from "@/firebase/user";
import { Box, CircularProgress } from "@mui/material";
import { useSearchParams } from "next/navigation";
import platform from "platform";
import { Suspense, useEffect, useState } from "react";
import Template from "../templateSelector/Template";
import CardViewHookWithUser from "./hooks/CardViewHookWithUser";
import CardViewUserMobile from "./hooks/CardViewUserMobile";
import CardViewWhitOutUser from "./hooks/CardViewWhitOutUser";

const countryCodes: { [key: string]: string } = {
    AF: "Afghanistan",
    AL: "Albania",
    DZ: "Algeria",
    AS: "American Samoa",
    AD: "Andorra",
    AO: "Angola",
    AI: "Anguilla",
    AQ: "Antarctica",
    AG: "Antigua and Barbuda",
    AR: "Argentina",
    AM: "Armenia",
    AW: "Aruba",
    AU: "Australia",
    AT: "Austria",
    AZ: "Azerbaijan",
    BS: "Bahamas",
    BH: "Bahrain",
    BD: "Bangladesh",
    BB: "Barbados",
    BY: "Belarus",
    BE: "Belgium",
    BZ: "Belize",
    BJ: "Benin",
    BM: "Bermuda",
    BT: "Bhutan",
    BO: "Bolivia",
    BA: "Bosnia and Herzegovina",
    BW: "Botswana",
    BV: "Bouvet Island",
    BR: "Brazil",
    IO: "British Indian Ocean Territory",
    BN: "Brunei Darussalam",
    BG: "Bulgaria",
    BF: "Burkina Faso",
    BI: "Burundi",
    KH: "Cambodia",
    CM: "Cameroon",
    CA: "Canada",
    CV: "Cape Verde",
    KY: "Cayman Islands",
    CF: "Central African Republic",
    TD: "Chad",
    CL: "Chile",
    CN: "China",
    CX: "Christmas Island",
    CC: "Cocos (Keeling) Islands",
    CO: "Colombia",
    KM: "Comoros",
    CG: "Congo",
    CD: "Congo, The Democratic Republic of the",
    CK: "Cook Islands",
    CR: "Costa Rica",
    CI: "Cote D'Ivoire",
    HR: "Croatia",
    CU: "Cuba",
    CY: "Cyprus",
    CZ: "Czech Republic",
    DK: "Denmark",
    DJ: "Djibouti",
    DM: "Dominica",
    DO: "Dominican Republic",
    EC: "Ecuador",
    EG: "Egypt",
    SV: "El Salvador",
    GQ: "Equatorial Guinea",
    ER: "Eritrea",
    EE: "Estonia",
    ET: "Ethiopia",
    FK: "Falkland Islands (Malvinas)",
    FO: "Faroe Islands",
    FJ: "Fiji",
    FI: "Finland",
    FR: "France",
    GF: "French Guiana",
    PF: "French Polynesia",
    TF: "French Southern Territories",
    GA: "Gabon",
    GM: "Gambia",
    GE: "Georgia",
    DE: "Germany",
    GH: "Ghana",
    GI: "Gibraltar",
    GR: "Greece",
    GL: "Greenland",
    GD: "Grenada",
    GP: "Guadeloupe",
    GU: "Guam",
    GT: "Guatemala",
    GG: "Guernsey",
    GN: "Guinea",
    GW: "Guinea-Bissau",
    GY: "Guyana",
    HT: "Haiti",
    HM: "Heard Island and Mcdonald Islands",
    VA: "Holy See (Vatican City State)",
    HN: "Honduras",
    HK: "Hong Kong",
    HU: "Hungary",
    IS: "Iceland",
    IN: "India",
    ID: "Indonesia",
    IR: "Iran, Islamic Republic Of",
    IQ: "Iraq",
    IE: "Ireland",
    IM: "Isle of Man",
    IL: "Israel",
    IT: "Italy",
    JM: "Jamaica",
    JP: "Japan",
    JE: "Jersey",
    JO: "Jordan",
    KZ: "Kazakhstan",
    KE: "Kenya",
    KI: "Kiribati",
    KP: "Korea, Democratic People'S Republic of",
    KR: "Korea, Republic of",
    KW: "Kuwait",
    KG: "Kyrgyzstan",
    LA: "Lao People'S Democratic Republic",
    LV: "Latvia",
    LB: "Lebanon",
    LS: "Lesotho",
    LR: "Liberia",
    LY: "Libyan Arab Jamahiriya",
    LI: "Liechtenstein",
    LT: "Lithuania",
    LU: "Luxembourg",
    MO: "Macao",
    MK: "Macedonia, The Former Yugoslav Republic of",
    MG: "Madagascar",
    MW: "Malawi",
    MY: "Malaysia",
    MV: "Maldives",
    ML: "Mali",
    MT: "Malta",
    MH: "Marshall Islands",
    MQ: "Martinique",
    MR: "Mauritania",
    MU: "Mauritius",
    YT: "Mayotte",
    MX: "Mexico",
    FM: "Micronesia, Federated States of",
    MD: "Moldova, Republic of",
    MC: "Monaco",
    MN: "Mongolia",
    ME: "Montenegro",
    MS: "Montserrat",
    MA: "Morocco",
    MZ: "Mozambique",
    MM: "Myanmar",
    NA: "Namibia",
    NR: "Nauru",
    NP: "Nepal",
    NL: "Netherlands",
    AN: "Netherlands Antilles",
    NC: "New Caledonia",
    NZ: "New Zealand",
    NI: "Nicaragua",
    NE: "Niger",
    NG: "Nigeria",
    NU: "Niue",
    NF: "Norfolk Island",
    MP: "Northern Mariana Islands",
    NO: "Norway",
    OM: "Oman",
    PK: "Pakistan",
    PW: "Palau",
    PS: "Palestinian Territory, Occupied",
    PA: "Panama",
    PG: "Papua New Guinea",
    PY: "Paraguay",
    PE: "Peru",
    PH: "Philippines",
    PN: "Pitcairn",
    PL: "Poland",
    PT: "Portugal",
    PR: "Puerto Rico",
    QA: "Qatar",
    RE: "Reunion",
    RO: "Romania",
    RU: "Russian Federation",
    RW: "Rwanda",
    SH: "Saint Helena",
    KN: "Saint Kitts and Nevis",
    LC: "Saint Lucia",
    PM: "Saint Pierre and Miquelon",
    VC: "Saint Vincent and the Grenadines",
    WS: "Samoa",
    SM: "San Marino",
    ST: "Sao Tome and Principe",
    SA: "Saudi Arabia",
    SN: "Senegal",
    RS: "Serbia",
    SC: "Seychelles",
    SL: "Sierra Leone",
    SG: "Singapore",
    SK: "Slovakia",
    SI: "Slovenia",
    SB: "Solomon Islands",
    SO: "Somalia",
    ZA: "South Africa",
    GS: "South Georgia and the South Sandwich Islands",
    ES: "Spain",
    LK: "Sri Lanka",
    SD: "Sudan",
    SR: "Suriname",
    SJ: "Svalbard and Jan Mayen",
    SZ: "Swaziland",
    SE: "Sweden",
    CH: "Switzerland",
    SY: "Syrian Arab Republic",
    TW: "Taiwan, Province of China",
    TJ: "Tajikistan",
    TZ: "Tanzania, United Republic of",
    TH: "Thailand",
    TL: "Timor-Leste",
    TG: "Togo",
    TK: "Tokelau",
    TO: "Tonga",
    TT: "Trinidad and Tobago",
    TN: "Tunisia",
    TR: "Turkey",
    TM: "Turkmenistan",
    TC: "Turks and Caicos Islands",
    TV: "Tuvalu",
    UG: "Uganda",
    UA: "Ukraine",
    AE: "United Arab Emirates",
    GB: "United Kingdom",
    US: "United States",
    UM: "United States Minor Outlying Islands",
    UY: "Uruguay",
    UZ: "Uzbekistan",
    VU: "Vanuatu",
    VE: "Venezuela",
    VN: "Viet Nam",
    VG: "Virgin Islands, British",
    VI: "Virgin Islands, U.S.",
    WF: "Wallis and Futuna",
    EH: "Western Sahara",
    YE: "Yemen",
    ZM: "Zambia",
    ZW: "Zimbabwe",
};

const CardView = () => {
    const [isModalAlert, setIsModalAlert] = useState(true);
    const searchParams = useSearchParams();
    const uid = searchParams.get("uid");
    const typePlatform = searchParams.get("platform");
    const handleModalAlert = () => setIsModalAlert(!isModalAlert);
    const [ipAddress, setIpAddress] = useState("");
    const [currentDate, setCurrentDate] = useState<string>("");
    const [currentTime, setCurrentTime] = useState<string>("");
    const [so, setSO] = useState<string | null>("");
    const [typeDevice, setTypeDevice] = useState<string | null>("");
    const [city, setCity] = useState<string | null>(null);
    const [country, setCountry] = useState<string | null>(null);
    const [isCookies, setIsCookies] = useState(false);
    const [company, setCompany] = useState<any>(null);
    const [headquarter, setHeadquarter] = useState<any>(null);
    const [area, setArea] = useState<any>(null);

    const { user } =
        uid && typePlatform
            ? CardViewUserMobile({
                  userUid: uid,
                  typePlatform: typePlatform,
              }) /* Abrir desde el WebView del cel */
            : uid
            ? CardViewHookWithUser({ uid }) /* Cuando comparto mi url */
            : CardViewWhitOutUser(typePlatform); /*  Abrir desde la parte web */

    useEffect(() => {
        const fetchCompanyData = async () => {
            const data = await getCompanyDataByIdFb(user?.idCompany);
            setCompany(data);
        };
        user && fetchCompanyData();
    }, [user]);

    useEffect(() => {
        const fetchAreaData = async () => {
            const data = await getAreaDataByIdFb(user?.selectedArea);
            setArea(data);
        };
        user && fetchAreaData();
    }, [user]);

    useEffect(() => {
        const fetchHeadquarterData = async () => {
            const data = await getHeadquarterDataByIdFb(
                user?.selectedHeadquarter,
            );
            setHeadquarter(data);
        };
        user && fetchHeadquarterData();
    }, [user]);

    useEffect(() => {
        if (ipAddress && city && country && currentDate && currentTime && uid) {
            const dataSend = {
                viewsDate: currentDate,
                viewsTime: currentTime,
                ipAddress: ipAddress,
                so: so,
                typeDevice: typeDevice,
                cityView: city,
                countryView: country,
            };
            SendDataMetrics(uid, dataSend);
        }
    }, [
        ipAddress,
        city,
        country,
        currentDate,
        currentTime,
        so,
        typeDevice,
        uid,
    ]);

    const fetchIpAndLocation = async () => {
        try {
            const ipResponse = await fetch("https://api.ipify.org?format=json");
            const ipData = await ipResponse.json();
            setIpAddress(ipData.ip);
        } catch (error) {
            setIpAddress("No disponible");
        }

        try {
            const locationResponse = await fetch(
                "https://ipinfo.io/ipinfo.io/http://181.53.14.189/?token=33af753b78413d",
            );
            const dataLocation = await locationResponse.json();

            // Convertir el código de país al nombre completo
            const countryName =
                countryCodes[dataLocation?.country] ||
                dataLocation?.country ||
                "No disponible";

            setCity(dataLocation?.city || "No disponible");
            setCountry(countryName);
        } catch (error) {
            console.error("Error al obtener la geolocalización:", error);
            setCity("No disponible");
            setCountry("No disponible");
        }
    };

    const fetchDeviceInfo = async () => {
        try {
            const platformInfo = await platform.parse(navigator.userAgent);
            setSO(platformInfo.os?.family || "No disponible");
            setTypeDevice(platformInfo.product || "No disponible");
        } catch (error) {
            setSO("No disponible");
            setTypeDevice("No disponible");
        }
    };

    const fetchCurrentDateTime = () => {
        try {
            const now = new Date();

            const day = String(now.getDate()).padStart(2, "0");
            const month = String(now.getMonth() + 1).padStart(2, "0");
            const year = now.getFullYear();

            const formattedDate = `${day}/${month}/${year}`;
            const formattedTime = now.toLocaleTimeString("es-ES", {
                hour: "2-digit",
                minute: "2-digit",
                second: "2-digit",
                hour12: false,
            });

            setCurrentDate(formattedDate);
            setCurrentTime(formattedTime);
        } catch (error) {
            setCurrentDate("No disponible");
            setCurrentTime("No disponible");
        }
    };

    const handleAceptCookies = async () => {
        await localStorage.setItem("@cookies", JSON.stringify(true));
        setIsCookies(false);
        if (uid && !typePlatform) {
            fetchIpAndLocation();
            fetchDeviceInfo();
            fetchCurrentDateTime();
        }
    };

    useEffect(() => {
        const cookies = localStorage.getItem("@cookies");
        //console.log('cookies ', cookies);
        if (uid && !typePlatform && cookies) {
            fetchIpAndLocation();
            fetchDeviceInfo();
            fetchCurrentDateTime();
        }
    }, [typePlatform, uid]);

    useEffect(() => {
        const cookies = localStorage.getItem("@cookies");
        setIsCookies(!cookies);
    }, []);

    return user ? (
        user.switch_activateCard ? (
            <Template
                userData={user}
                companyData={company}
                headquarterData={headquarter}
                areaData={area}
                handleAceptCookies={handleAceptCookies}
                isCookies={isCookies}
            />
        ) : (
            <CustomModalAlert
                handleModalAlert={handleModalAlert}
                title={"Error"}
                description={
                    "El usuario no comparte su información en estos momentos"
                }
                isModalAlert={isModalAlert}
            />
        )
    ) : (
        <Box className="tw-flex tw-justify-center tw-items-center tw-h-screen">
            <CircularProgress />
        </Box>
    );
};

const page = () => {
    return (
        <Suspense>
            <CardView />
        </Suspense>
    );
};

export default page;
