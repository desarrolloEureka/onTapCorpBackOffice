"use client";

import AttachFileOutlinedIcon from "@mui/icons-material/AttachFileOutlined";
import ExploreOutlinedIcon from "@mui/icons-material/ExploreOutlined";
import LanguageOutlinedIcon from "@mui/icons-material/LanguageOutlined";
import LocalPhoneOutlinedIcon from "@mui/icons-material/LocalPhoneOutlined";
import PersonOutlineOutlinedIcon from "@mui/icons-material/PersonOutlineOutlined";
import PinOutlinedIcon from "@mui/icons-material/PinOutlined";
import WorkOutlineOutlinedIcon from "@mui/icons-material/WorkOutlineOutlined";
import { InputAdornment, Typography } from "@mui/material";
import { Button, Card } from "react-bootstrap";
import CustomTextField from "./components/CustomTextField";
import CompanyHook from "./hook/CompanyHook";
import CustomMUITelInput from "./components/CustomMUITelInput";

const CompanyPage = ({ theme }: { theme: string }) => {
    const { data } = CompanyHook();

    return (
        <div className="tw-flex tw-items-center tw-justify-center">
            <div className="tw-container">
                <div className="company-cover__img tw-flex tw-flex-col tw-items-center tw-justify-center tw-p-5 tw-space-y-4">
                    <img
                        className="tw-rounded-full"
                        src={`https://ui-avatars.com/api/?name=JohnDoe?size=150?bold=true`}
                        alt="Profile Photo"
                        width="150"
                    />
                    <div className="banner tw-px-8 tw-py-2 tw-rounded-tr-[35px] tw-rounded-bl-[35px]">
                        <h3 className="h3">Hola Empresa SAS</h3>
                    </div>
                </div>
                <div className="">
                    <Card className="custom-card tw-px-16 tw-py-2">
                        <Card.Body>
                            <Card.Title className="tw-font-bold tw-mb-5">
                                Datos Principales:
                            </Card.Title>
                            <form>
                                <div className="tw-flex tw-flex-col lg:tw-flex-row tw-space-x-0 lg:tw-space-x-4 tw-space-y-4 lg:tw-space-y-0">
                                    <div className="tw-flex tw-w-full tw-flex-col tw-space-y-4">
                                        <div className="tw-flex tw-p-2 tw-rounded tw-flex-col tw-justify-center tw-items-start sub-card-body">
                                            <h6 className="main-title-sub-card tw-m-0 tw-p-2 tw-rounded">
                                                Datos empresa
                                            </h6>

                                            <CustomTextField
                                                value={""}
                                                onChange={() => {}}
                                                type="text"
                                                switch="true"
                                                theme={theme}
                                                id="tradename"
                                                fullWidth
                                                label="Nombre Comercial"
                                                InputProps={{
                                                    startAdornment: (
                                                        <InputAdornment position="start">
                                                            <PersonOutlineOutlinedIcon />
                                                        </InputAdornment>
                                                    ),
                                                }}
                                            />

                                            <CustomTextField
                                                type="text"
                                                switch="true"
                                                theme={theme}
                                                id="businessName"
                                                fullWidth
                                                label="Razón Social"
                                                InputProps={{
                                                    startAdornment: (
                                                        <InputAdornment position="start">
                                                            <PersonOutlineOutlinedIcon />
                                                        </InputAdornment>
                                                    ),
                                                }}
                                            />

                                            <CustomTextField
                                                type="text"
                                                switch="true"
                                                theme={theme}
                                                id="id"
                                                fullWidth
                                                label="Nit"
                                                InputProps={{
                                                    startAdornment: (
                                                        <InputAdornment position="start">
                                                            <PinOutlinedIcon />
                                                        </InputAdornment>
                                                    ),
                                                }}
                                            />

                                            <CustomTextField
                                                type="text"
                                                switch="true"
                                                theme={theme}
                                                id="sector"
                                                fullWidth
                                                label="Sector"
                                                InputProps={{
                                                    startAdornment: (
                                                        <InputAdornment position="start">
                                                            <WorkOutlineOutlinedIcon />
                                                        </InputAdornment>
                                                    ),
                                                }}
                                            />

                                            <CustomTextField
                                                type="text"
                                                switch="true"
                                                theme={theme}
                                                id="webSite"
                                                fullWidth
                                                label="Sitio Web"
                                                InputProps={{
                                                    startAdornment: (
                                                        <InputAdornment position="start">
                                                            <Typography className="tw-font-bold">
                                                                URL
                                                            </Typography>
                                                        </InputAdornment>
                                                    ),
                                                }}
                                            />
                                        </div>
                                        <div className="tw-flex tw-p-2 tw-rounded tw-flex-col tw-justify-center tw-items-start sub-card-body">
                                            <h6 className="main-title-sub-card tw-m-0 tw-p-2 tw-rounded">
                                                Datos Adicionales
                                            </h6>

                                            <CustomTextField
                                                type="text"
                                                switch="true"
                                                theme={theme}
                                                id="dataName"
                                                fullWidth
                                                label="Nombre del Dato"
                                                InputProps={{
                                                    startAdornment: (
                                                        <InputAdornment position="start">
                                                            <AttachFileOutlinedIcon />
                                                        </InputAdornment>
                                                    ),
                                                }}
                                            />

                                            <CustomTextField
                                                type="text"
                                                className="tw-w-full tw-mb-4"
                                                theme={theme}
                                                id="data"
                                                fullWidth
                                                label="Dato"
                                            />
                                        </div>
                                    </div>
                                    <div className="tw-flex tw-w-full tw-flex-col tw-space-y-4">
                                        <div className="tw-flex tw-p-2 tw-rounded tw-flex-col tw-justify-center tw-items-start sub-card-body">
                                            <h6 className="main-title-sub-card tw-m-0 tw-p-2 tw-rounded">
                                                Teléfonos de Contacto
                                            </h6>
                                            <div className="tw-flex tw-flex-row tw-px-3 tw-mt-4 tw-w-full">
                                                <CustomMUITelInput
                                                    // value={value ?? ""}
                                                    theme={theme}
                                                    id="indicative"
                                                    variant="standard"
                                                    defaultCountry="CO"
                                                    size="medium"
                                                    label="Indicativo"
                                                    InputProps={{
                                                        readOnly: true,
                                                    }}
                                                    // onChange={onChange}
                                                />

                                                <CustomTextField
                                                    type="text"
                                                    switch="true"
                                                    theme={theme}
                                                    id="phone"
                                                    fullWidth
                                                    label="Teléfono"
                                                    InputProps={{
                                                        startAdornment: (
                                                            <InputAdornment position="start">
                                                                <LocalPhoneOutlinedIcon />
                                                            </InputAdornment>
                                                        ),
                                                    }}
                                                />
                                            </div>
                                            <CustomTextField
                                                type="text"
                                                className="tw-w-full tw-mb-4"
                                                theme={theme}
                                                id="ext"
                                                fullWidth
                                                // label="Dato"
                                                InputProps={{
                                                    startAdornment: (
                                                        <InputAdornment position="start">
                                                            <Typography className="tw-font-bold">
                                                                EXT
                                                            </Typography>
                                                        </InputAdornment>
                                                    ),
                                                }}
                                            />
                                        </div>
                                        <div className="tw-flex tw-p-2 tw-rounded tw-flex-col tw-justify-center tw-items-start sub-card-body">
                                            <h6 className="main-title-sub-card tw-m-0 tw-p-2 tw-rounded">
                                                Direcciones
                                            </h6>
                                            <CustomTextField
                                                type="text"
                                                switch="true"
                                                theme={theme}
                                                id="address"
                                                fullWidth
                                                label="Dirección"
                                                InputProps={{
                                                    startAdornment: (
                                                        <InputAdornment position="start">
                                                            <ExploreOutlinedIcon />
                                                        </InputAdornment>
                                                    ),
                                                }}
                                            />
                                        </div>
                                        <div className="tw-flex tw-p-2 tw-rounded tw-flex-col tw-justify-center tw-items-start sub-card-body">
                                            <h6 className="main-title-sub-card tw-m-0 tw-p-2 tw-rounded">
                                                Urls Empresa
                                            </h6>
                                            <CustomTextField
                                                type="text"
                                                switch="true"
                                                theme={theme}
                                                id="url"
                                                fullWidth
                                                label="Nombre del url"
                                                InputProps={{
                                                    startAdornment: (
                                                        <InputAdornment position="start">
                                                            <ExploreOutlinedIcon />
                                                        </InputAdornment>
                                                    ),
                                                }}
                                            />

                                            <CustomTextField
                                                type="text"
                                                className="tw-w-full tw-mb-4"
                                                theme={theme}
                                                id="urlDato"
                                                fullWidth
                                                label="Dato"
                                                InputProps={{
                                                    startAdornment: (
                                                        <InputAdornment position="start">
                                                            <Typography className="tw-font-bold">
                                                                URL
                                                            </Typography>
                                                        </InputAdornment>
                                                    ),
                                                }}
                                            />

                                            <div className="tw-flex tw-flex-col tw-justify-center tw-items-center tw-px-3 tw-mt-4 tw-w-full">
                                                <LanguageOutlinedIcon
                                                    style={{ fontSize: 50 }}
                                                />
                                                <Typography className="tw-font-bold tw-text-black">
                                                    URL
                                                </Typography>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </form>
                        </Card.Body>
                        <Card.Footer className="text-muted">
                            <Button className="tw-rounded-3xl" variant="dark">
                                Guardar Datos
                            </Button>
                        </Card.Footer>
                    </Card>
                </div>
            </div>
        </div>
    );
};

export default CompanyPage;
