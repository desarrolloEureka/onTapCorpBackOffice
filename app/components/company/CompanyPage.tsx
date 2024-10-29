"use client";
import AttachFileOutlinedIcon from "@mui/icons-material/AttachFileOutlined";
import ExploreOutlinedIcon from "@mui/icons-material/ExploreOutlined";
import LanguageOutlinedIcon from "@mui/icons-material/LanguageOutlined";
import LocalPhoneOutlinedIcon from "@mui/icons-material/LocalPhoneOutlined";
import PersonOutlineOutlinedIcon from "@mui/icons-material/PersonOutlineOutlined";
import PinOutlinedIcon from "@mui/icons-material/PinOutlined";
import WorkOutlineOutlinedIcon from "@mui/icons-material/WorkOutlineOutlined";
import { Avatar, IconButton, InputAdornment, Typography } from "@mui/material";
import { Button, Card } from "react-bootstrap";
import { IoAddCircle } from "react-icons/io5";
import { MdEditSquare } from "react-icons/md";
import CustomMUITelInput from "./components/CustomMUITelInput";
import CustomSwitch from "./components/CustomSwitch";
import CustomTextField from "./components/CustomTextField";
import CompanyHook from "./hook/CompanyHook";
import IconsUrlModal from "./components/iconsUrlModal";
import Image from "next/image";
import LinkIcon from "@mui/icons-material/Link";
import React from "react";

type CompanyProps = {
    theme: string;
};

const CompanyPage = ({ theme }: CompanyProps) => {
    const {
        errors,
        data,
        handleChange,
        companyName,
        handleChangeMiuTel,
        allChecked,
        handleAllChecked,
        handleChangeIcon,
        fileName,
        objToArrayItems,
        handleNewItem,
        handleDeleteItem,
        handleSendForm,
        handleOpenModalIcons,
        handleCloseModalIcons,
        isOpenModalIcons,
        handleDataNetworks,
        itemUrlKey,
        itemUrlSelected,
        dataLogos,
    } = CompanyHook();

    return (
        data && (
            <>
                <div className="tw-flex tw-items-center tw-justify-center">
                    <div className="tw-container">
                        <div className="company-cover__img tw-flex tw-flex-col tw-items-center tw-justify-center tw-p-5 tw-space-y-4 tw-relative">
                            <img
                                className="tw-rounded-full tw-w-full tw-aspect-square tw-object-cover"
                                src={
                                    data.icon[0]
                                        ? data.icon[0]
                                        : `https://ui-avatars.com/api/?name=${companyName}?size=150?bold=true`
                                }
                                alt="Profile Photo"
                                width="150"
                            />

                            <label
                                htmlFor="dropzone-file"
                                className="tw-absolute tw-left-[53%] tw-top-3"
                            >
                                <IconButton
                                    className="edit-icon"
                                    size="small"
                                    component="span"
                                >
                                    <MdEditSquare size={32} />
                                </IconButton>
                                <input
                                    type="file"
                                    name="icon"
                                    id="dropzone-file"
                                    accept=".jpg, .jpeg, .png"
                                    hidden
                                    onChange={handleChangeIcon}
                                    className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                                />
                            </label>
                            {fileName && (
                                <span className="tw-text-[#396593] tw-font-bold">
                                    {fileName}
                                </span>
                            )}

                            <div className="tw-absolute tw-left-5 tw-bottom-5">
                                <h5 className="h5">Compartir Todo</h5>
                                <CustomSwitch
                                    modeTheme={theme}
                                    onChange={(e) => handleAllChecked(e)}
                                    checked={allChecked === "none"}
                                />
                            </div>
                            <div className="banner tw-px-8 tw-py-2 tw-rounded-tr-[35px] tw-rounded-bl-[35px]">
                                <h3 className="h3">Hola {companyName}</h3>
                            </div>
                        </div>

                        <form onSubmit={handleSendForm} className="">
                            <Card className="custom-card tw-px-16 tw-py-2 tw-shadow-2xl tw-rounded-3xl">
                                <Card.Body>
                                    <Card.Title className="tw-font-bold tw-mb-5">
                                        Datos Principales:
                                    </Card.Title>
                                    <div className="tw-flex tw-flex-col lg:tw-flex-row tw-space-x-0 lg:tw-space-x-4 tw-space-y-4 lg:tw-space-y-0">
                                        <div className="tw-flex tw-w-full tw-flex-col tw-space-y-4">
                                            <div className="tw-flex tw-p-2 tw-rounded tw-flex-col tw-justify-center tw-items-start sub-card-body">
                                                <h6 className="main-title-sub-card tw-m-0 tw-p-2 tw-rounded">
                                                    Datos empresa
                                                </h6>

                                                <div className="tw-px-3 tw-w-full">
                                                    <CustomTextField
                                                        required
                                                        checked={allChecked}
                                                        data={data.tradename}
                                                        onChange={(
                                                            value: string,
                                                            name: string,
                                                            checked: boolean,
                                                        ) =>
                                                            handleChange(
                                                                value,
                                                                name,
                                                                checked,
                                                            )
                                                        }
                                                        name="tradename"
                                                        type="text"
                                                        switch="true"
                                                        theme={theme}
                                                        id="tradename"
                                                        helperText={
                                                            errors.tradename
                                                        }
                                                        error={
                                                            !!errors.tradename
                                                        }
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
                                                        required
                                                        checked={allChecked}
                                                        data={data.businessName}
                                                        onChange={(
                                                            value: string,
                                                            name: string,
                                                            checked: boolean,
                                                        ) =>
                                                            handleChange(
                                                                value,
                                                                name,
                                                                checked,
                                                            )
                                                        }
                                                        name="businessName"
                                                        type="text"
                                                        switch="true"
                                                        theme={theme}
                                                        id="businessName"
                                                        helperText={
                                                            errors.businessName
                                                        }
                                                        error={
                                                            !!errors.businessName
                                                        }
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
                                                        required
                                                        checked={allChecked}
                                                        data={data.id}
                                                        onChange={(
                                                            value: string,
                                                            name: string,
                                                            checked: boolean,
                                                        ) =>
                                                            handleChange(
                                                                value,
                                                                name,
                                                                checked,
                                                            )
                                                        }
                                                        name="id"
                                                        type="text"
                                                        switch="true"
                                                        theme={theme}
                                                        id="id"
                                                        helperText={errors.id}
                                                        error={!!errors.id}
                                                        fullWidth
                                                        label="Nit"
                                                        InputProps={{
                                                            startAdornment: (
                                                                <InputAdornment position="start">
                                                                    <PinOutlinedIcon />
                                                                </InputAdornment>
                                                            ),
                                                        }}
                                                        maxLength = {9}
                                                    />
                                                    <CustomTextField
                                                        checked={allChecked}
                                                        data={data.sector}
                                                        onChange={(
                                                            value: string,
                                                            name: string,
                                                            checked: boolean,
                                                        ) =>
                                                            handleChange(
                                                                value,
                                                                name,
                                                                checked,
                                                            )
                                                        }
                                                        name="sector"
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
                                                        checked={allChecked}
                                                        data={data.webSite}
                                                        onChange={(
                                                            value: string,
                                                            name: string,
                                                            checked: boolean,
                                                        ) =>
                                                            handleChange(
                                                                value,
                                                                name,
                                                                checked,
                                                            )
                                                        }
                                                        name="webSite"
                                                        type="url"
                                                        helperText={errors.webSite}
                                                        error={!!errors.webSite}
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
                                            </div>
                                            <div className="tw-flex tw-p-2 tw-rounded tw-flex-col tw-justify-center tw-items-start sub-card-body">
                                                <div className="tw-flex tw-w-full tw-justify-between">
                                                    <h6 className="main-title-sub-card tw-m-0 tw-p-2 tw-rounded">
                                                        Datos Adicionales
                                                    </h6>
                                                    <div
                                                        onClick={() =>
                                                            handleNewItem(
                                                                "additionalDataName",
                                                            )
                                                        }
                                                        className="add-button-item tw-flex tw-justify-center tw-items-center tw-rounded tw-px-2 tw-text-md tw-cursor-pointer"
                                                    >
                                                        <IoAddCircle
                                                            size={25}
                                                        />
                                                        Agregar Dato Adicional
                                                    </div>
                                                </div>

                                                {objToArrayItems?.additionalDataName?.map(
                                                    (item, index) => (
                                                        <div
                                                            key={index}
                                                            className="tw-flex tw-flex-col tw-px-3 tw-w-full"
                                                        >
                                                            <CustomTextField
                                                                checked={
                                                                    allChecked
                                                                }
                                                                data={[
                                                                    item[1],
                                                                    item[2],
                                                                ]}
                                                                onChange={(
                                                                    value: string,
                                                                    name: string,
                                                                    checked: boolean,
                                                                ) =>
                                                                    handleChange(
                                                                        value,
                                                                        name,
                                                                        checked,
                                                                    )
                                                                }
                                                                name={item[0]}
                                                                type="text"
                                                                switch="true"
                                                                theme={theme}
                                                                id={item[0]}
                                                                fullWidth
                                                                label="Nombre del Dato"
                                                                InputProps={{
                                                                    startAdornment:
                                                                        (
                                                                            <InputAdornment position="start">
                                                                                <AttachFileOutlinedIcon />
                                                                            </InputAdornment>
                                                                        ),
                                                                }}
                                                            />
                                                            <CustomTextField
                                                                data={item[4]}
                                                                onChange={(
                                                                    value: string,
                                                                    name: string,
                                                                ) =>
                                                                    handleChange(
                                                                        value,
                                                                        name,
                                                                    )
                                                                }
                                                                onClick={() => {
                                                                    handleDeleteItem(
                                                                        item,
                                                                    );
                                                                }}
                                                                name={item[3]}
                                                                type="text"
                                                                deleted={
                                                                    index !== 0
                                                                        ? "true"
                                                                        : ""
                                                                }
                                                                theme={theme}
                                                                id={item[3]}
                                                                fullWidth
                                                                label="Dato"
                                                            />
                                                        </div>
                                                    ),
                                                )}
                                            </div>
                                        </div>
                                        <div className="tw-flex tw-w-full tw-flex-col tw-space-y-4">
                                            <div className="tw-flex tw-p-2 tw-rounded tw-flex-col tw-justify-center tw-items-start sub-card-body">
                                                <div className="tw-flex tw-w-full tw-justify-between">
                                                    <h6 className="main-title-sub-card tw-m-0 tw-p-2 tw-rounded">
                                                        Teléfonos de Contacto
                                                    </h6>
                                                    {objToArrayItems?.phone
                                                        ?.length < 3 && (
                                                        <div
                                                            onClick={() =>
                                                                handleNewItem(
                                                                    "phone",
                                                                )
                                                            }
                                                            className="add-button-item tw-flex tw-justify-center tw-items-center tw-rounded tw-px-2 tw-text-md tw-cursor-pointer"
                                                        >
                                                            <IoAddCircle
                                                                size={25}
                                                            />
                                                            Agregar Teléfono
                                                            Adicional
                                                        </div>
                                                    )}
                                                </div>

                                                {objToArrayItems?.phone?.map(
                                                    (item, index) => (
                                                        <div
                                                            key={index}
                                                            className="tw-flex tw-flex-col tw-px-3 tw-w-full"
                                                        >
                                                            <div className="tw-flex tw-flex-row tw-mt-4 tw-w-full">
                                                                <CustomMUITelInput
                                                                    className="tw-mt-4 tw-w-1/4"
                                                                    value={
                                                                        item[6] &&
                                                                        item[6].includes(
                                                                            "+",
                                                                        )
                                                                            ? item[6]
                                                                            : "+" +
                                                                              item[6]
                                                                    }
                                                                    onChange={(
                                                                        value: string,
                                                                        name: string,
                                                                    ) =>
                                                                        handleChangeMiuTel(
                                                                            value,
                                                                            name,
                                                                        )
                                                                    }
                                                                    name={
                                                                        item[5]
                                                                    }
                                                                    theme={
                                                                        theme
                                                                    }
                                                                    id={item[5]}
                                                                    variant="standard"
                                                                    // defaultCountry="CO"
                                                                    size="medium"
                                                                    label="Indicativo"
                                                                    InputProps={{
                                                                        readOnly:
                                                                            true,
                                                                    }}
                                                                />

                                                                <CustomTextField
                                                                    required
                                                                    checked={
                                                                        allChecked
                                                                    }
                                                                    data={[
                                                                        item[1],
                                                                        item[2],
                                                                    ]}
                                                                    onChange={(
                                                                        value: string,
                                                                        name: string,
                                                                        checked: boolean,
                                                                    ) =>
                                                                        handleChange(
                                                                            value,
                                                                            name,
                                                                            checked,
                                                                        )
                                                                    }
                                                                    name={
                                                                        item[0]
                                                                    }
                                                                    type="number"
                                                                    switch="true"
                                                                    theme={
                                                                        theme
                                                                    }
                                                                    id={item[0]}
                                                                    fullWidth
                                                                    label="Teléfono"
                                                                    maxLength = {10}
                                                                    InputProps={{
                                                                        startAdornment:
                                                                            (
                                                                                <InputAdornment position="start">
                                                                                    <LocalPhoneOutlinedIcon />
                                                                                </InputAdornment>
                                                                            ),
                                                                    }}
                                                                />
                                                            </div>
                                                            <CustomTextField
                                                                data={item[4]}
                                                                onChange={(
                                                                    value: string,
                                                                    name: string,
                                                                ) =>
                                                                    handleChange(
                                                                        value,
                                                                        name,
                                                                    )
                                                                }
                                                                onClick={() => {
                                                                    handleDeleteItem(
                                                                        item,
                                                                    );
                                                                }}
                                                                name={item[3]}
                                                                type="number"
                                                                deleted={
                                                                    index !== 0
                                                                        ? "true"
                                                                        : ""
                                                                }
                                                                theme={theme}
                                                                id={item[3]}
                                                                maxLength = {3}
                                                                fullWidth
                                                                InputProps={{
                                                                    startAdornment:
                                                                        (
                                                                            <InputAdornment position="start">
                                                                                <Typography className="tw-font-bold">
                                                                                    EXT
                                                                                </Typography>
                                                                            </InputAdornment>
                                                                        ),
                                                                }}
                                                            />
                                                        </div>
                                                    ),
                                                )}
                                            </div>
                                            <div className="tw-flex tw-p-2 tw-rounded tw-flex-col tw-justify-center tw-items-start sub-card-body">
                                                <div className="tw-flex tw-w-full tw-justify-between">
                                                    <h6 className="main-title-sub-card tw-m-0 tw-p-2 tw-rounded">
                                                        Direcciones
                                                    </h6>
                                                    <div
                                                        onClick={() =>
                                                            handleNewItem(
                                                                "address",
                                                            )
                                                        }
                                                        className="add-button-item tw-flex tw-justify-center tw-items-center tw-rounded tw-px-2 tw-text-md tw-cursor-pointer"
                                                    >
                                                        <IoAddCircle
                                                            size={25}
                                                        />
                                                        Agregar Dirección
                                                        Adicional
                                                    </div>
                                                </div>

                                                {objToArrayItems?.address?.map(
                                                    (item, index) => (
                                                        <div
                                                            key={index}
                                                            className="tw-flex tw-flex-col tw-px-3 tw-w-full"
                                                        >
                                                            <CustomTextField
                                                                required
                                                                checked={
                                                                    allChecked
                                                                }
                                                                data={[
                                                                    item[1],
                                                                    item[2],
                                                                ]}
                                                                onChange={(
                                                                    value: string,
                                                                    name: string,
                                                                    checked: boolean,
                                                                ) =>
                                                                    handleChange(
                                                                        value,
                                                                        name,
                                                                        checked,
                                                                    )
                                                                }
                                                                onClick={() => {
                                                                    handleDeleteItem(
                                                                        item,
                                                                    );
                                                                }}
                                                                name={item[0]}
                                                                type="text"
                                                                deleted={
                                                                    index !== 0
                                                                        ? "true"
                                                                        : ""
                                                                }
                                                                switch="true"
                                                                theme={theme}
                                                                id={item[0]}
                                                                fullWidth
                                                                label="Dirección"
                                                                InputProps={{
                                                                    startAdornment:
                                                                        (
                                                                            <InputAdornment position="start">
                                                                                <ExploreOutlinedIcon />
                                                                            </InputAdornment>
                                                                        ),
                                                                }}
                                                            />
                                                        </div>
                                                    ),
                                                )}
                                            </div>
                                            <div className="tw-flex tw-p-2 tw-rounded tw-flex-col tw-justify-center tw-items-start sub-card-body">
                                                <div className="tw-flex tw-w-full tw-justify-between">
                                                    <h6 className="main-title-sub-card tw-m-0 tw-p-2 tw-rounded">
                                                        Urls Empresa
                                                    </h6>
                                                    <div
                                                        onClick={() =>
                                                            handleNewItem(
                                                                "urlName",
                                                            )
                                                        }
                                                        className="add-button-item tw-flex tw-justify-center tw-items-center tw-rounded tw-px-2 tw-text-md tw-cursor-pointer"
                                                    >
                                                        <IoAddCircle
                                                            size={25}
                                                        />
                                                        Agregar Url Adicional
                                                    </div>
                                                </div>
                                                {objToArrayItems?.urlName?.map(
                                                    (item, index) => {
                                                        const datafilter =
                                                            dataLogos?.find(
                                                                (val: any) =>
                                                                    val.logoName ===
                                                                    item[6],
                                                            );
                                                        return (
                                                            <div
                                                                key={index}
                                                                className="tw-flex tw-flex-col tw-px-3 tw-w-full"
                                                            >
                                                                <CustomTextField
                                                                    required
                                                                    checked={
                                                                        allChecked
                                                                    }
                                                                    data={[
                                                                        item[1],
                                                                        item[2],
                                                                    ]}
                                                                    onChange={(
                                                                        value: string,
                                                                        name: string,
                                                                        checked: boolean,
                                                                    ) =>
                                                                        handleChange(
                                                                            value,
                                                                            name,
                                                                            checked,
                                                                        )
                                                                    }
                                                                    name={
                                                                        item[0]
                                                                    }
                                                                    type="text"
                                                                    switch="true"
                                                                    theme={
                                                                        theme
                                                                    }
                                                                    id={item[0]}
                                                                    fullWidth
                                                                    label="Nombre del url"
                                                                    InputProps={{
                                                                        startAdornment:
                                                                            (
                                                                                <InputAdornment position="start">
                                                                                    <ExploreOutlinedIcon />
                                                                                </InputAdornment>
                                                                            ),
                                                                    }}
                                                                />

                                                                <CustomTextField
                                                                    required
                                                                    data={
                                                                        item[4]
                                                                    }
                                                                    onChange={(
                                                                        value: string,
                                                                        name: string,
                                                                    ) =>
                                                                        handleChange(
                                                                            value,
                                                                            name,
                                                                        )
                                                                    }
                                                                    onClick={() => {
                                                                        handleDeleteItem(
                                                                            item,
                                                                        );
                                                                    }}
                                                                    name={
                                                                        item[3]
                                                                    }
                                                                    type="url"
                                                                    helperText={errors.urlLink}
                                                                    error={!!errors.urlLink}
                                                                    deleted={
                                                                        index !==
                                                                        0
                                                                            ? "true"
                                                                            : ""
                                                                    }
                                                                    theme={
                                                                        theme
                                                                    }
                                                                    id={item[3]}
                                                                    fullWidth
                                                                    label="Dato"
                                                                    InputProps={{
                                                                        startAdornment:
                                                                            (
                                                                                <InputAdornment position="start">
                                                                                    <Typography className="tw-font-bold">
                                                                                        URL
                                                                                    </Typography>
                                                                                </InputAdornment>
                                                                            ),
                                                                    }}
                                                                />

                                                                <div className="tw-flex tw-flex-col tw-justify-center tw-items-center tw-px-3 tw-mt-4 tw-w-full">
                                                                    <Button
                                                                        onClick={() =>
                                                                            handleOpenModalIcons(
                                                                                item,
                                                                                index,
                                                                            )
                                                                        }
                                                                        variant="text"
                                                                    >
                                                                        <Avatar
                                                                            sx={{
                                                                                backgroundColor:
                                                                                    "transparent",
                                                                                width: 40,
                                                                                height: 40,
                                                                            }}
                                                                        >
                                                                            {datafilter &&
                                                                            datafilter?.imageUrl ? (
                                                                                <Image
                                                                                    src={
                                                                                        datafilter.imageUrl
                                                                                    }
                                                                                    // alt={
                                                                                    // 		datafilter.name
                                                                                    // }
                                                                                    alt="avatar"
                                                                                    width={
                                                                                        40
                                                                                    }
                                                                                    height={
                                                                                        40
                                                                                    }
                                                                                />
                                                                            ) : (
                                                                                <LinkIcon
                                                                                    style={{
                                                                                        fontSize: 34,
                                                                                    }}
                                                                                    className="tw-text-gray-400"
                                                                                />
                                                                            )}
                                                                        </Avatar>
                                                                    </Button>
                                                                    <Typography className="tw-font-bold tw-text-black">
                                                                        URL
                                                                    </Typography>
                                                                </div>
                                                            </div>
                                                        );
                                                    },
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                </Card.Body>
                                <Card.Footer className="text-muted">
                                    <Button
                                        type="submit"
                                        // onClick={handleSendForm}
                                        className="tw-rounded-3xl"
                                        variant="dark"
                                    >
                                        Guardar Datos
                                    </Button>
                                </Card.Footer>
                            </Card>
                        </form>
                    </div>
                    <IconsUrlModal
                        show={isOpenModalIcons}
                        handleClose={() => handleCloseModalIcons()}
                        dataLogos={dataLogos}
                        handleDataNetworks={handleDataNetworks}
                        itemKey={itemUrlKey}
                        val={itemUrlSelected}
                        modeTheme={theme}
                    />
                </div>
            </>
        )
    );
};

export default CompanyPage;
