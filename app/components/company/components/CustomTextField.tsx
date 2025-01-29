"use client";
import { IconButton, TextField, Typography, Avatar } from "@mui/material";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import { useEffect, useState } from "react";
import { FaTrashCan } from "react-icons/fa6";
import CustomSwitch from "./CustomSwitch";
import LanguageOutlinedIcon from "@mui/icons-material/LanguageOutlined";
import { Button } from "react-bootstrap";
import Image from "next/image";
import Swal from "sweetalert2";

const CustomTextField = (props: any) => {
    const [value, setValue] = useState<string>("");
    const [checked, setChecked] = useState<boolean>(true);

    const theme = createTheme({
        palette: {
            mode: props.theme,
        },
    });

    const handleCustomChange = (
        value: string,
        name: string,
        checked: boolean,
        type?: string
    ) => {
        const newValue = ((value || "") ?? "");
        if (props.isPhoneNumber) {
            if (type === "switch" && newValue.length === 10) {
                setChecked(checked);
            } else if (type === "switch" && newValue.length != 10) {
                Swal.fire({
                    title: "No se puede activar el switch",
                    text: "El teléfonos debe tener exactamente 10 dígitos.",
                    icon: "warning",
                    confirmButtonColor: "#1f2937",
                    confirmButtonText: "Entendido",
                });
                setChecked(true);
            } else if (type === "text" && newValue.length <= 10) {
                setValue(newValue);
                setChecked(true);
            }
        } else if (props.isUrl && type === "switch") {
            if (props.datafilter) {
                props.onChange(newValue, name, checked);
                setValue(newValue);
                setChecked(checked);
            } else {
                props.onChange(newValue, name, true);
                setValue(newValue);
                Swal.fire({
                    title: "No se puede activar el switch",
                    text: "Debe seleccionar un logo antes de continuar.",
                    icon: "warning",
                    confirmButtonColor: "#1f2937",
                    confirmButtonText: "Entendido",
                });
            }
        } else if (newValue === '' || newValue.length <= props.maxLength || props.maxLength === undefined) {
            props.onChange(newValue, name, checked);
            setValue(newValue);
            setChecked(checked);
        }
    };

    useEffect(() => {
        setChecked(props.checked === "none");
    }, [props.checked]);

    useEffect(() => {
        if (props.data) {
            if (Array.isArray(props.data)) {
                setValue(props.data[0]);
                setChecked(!props.data[1]);
            } else if (props.data !== "") {
                setValue(props.data);
            }
        }
    }, [props.data]);

    /* console.log(' props.item ', props.item);
    console.log(' props.index ', props.index); */

    return (
        <div className="tw-flex tw-flex-row tw-mt-4 tw-w-full">
            <ThemeProvider theme={theme}>
                <TextField
                    {...props}
                    value={value}
                    onChange={(e) =>
                        handleCustomChange(
                            e.target.value,
                            e.target.name,
                            checked,
                            'text'
                        )
                    }
                    onClick={() => { }}
                    name={props.name}
                    variant="standard"
                    color="primary"
                    className={`tw-mb-4 ${props.deleted && "tw-w-full"}`}
                    // helperText={props.errorShow}
                    // error={!!props.errorShow}
                    InputLabelProps={{
                        style: {
                            fontSize: "20px",
                            fontWeight: "bold",
                            color:
                                props.theme === "light" ? "#396593" : "#8bb8e7",
                        },
                    }}
                />

                {props.switch && (
                    <CustomSwitch
                        modeTheme={props.theme}
                        checked={!checked}
                        onChange={(e) =>
                            handleCustomChange(
                                value,
                                props.name,
                                !e.target.checked,
                                'switch'
                            )
                        }
                    />
                )}
                {props.deleted && (
                    <div className={`tw-flex tw-items-center tw-justify-center ${props.icon ? 'tw-w-1/12' : 'tw-w-1/5'}`} >
                        <IconButton
                            onClick={() => props.onClick()}
                            size="small"
                            component="span"
                        >
                            <FaTrashCan size={25} />
                        </IconButton>
                    </div>
                )}

                {props.icon && (
                    <div className="tw-flex tw-flex-col tw-justify-center tw-items-center">
                        <Button
                            onClick={() =>
                                props.handleOpenModalIcons(
                                    props.item,
                                    props.index,
                                )
                            }
                            variant="text"
                            style={{ padding: 0 }}
                        >
                            <Avatar
                                sx={{
                                    backgroundColor:
                                        "transparent",
                                    width: 40,
                                    height: 40,
                                }}
                            >
                                {props.datafilter &&
                                    props.datafilter?.imageUrl ? (
                                    <Image
                                        src={props.datafilter.imageUrl}
                                        alt="avatar"
                                        width={34}
                                        height={34}
                                    />
                                ) : (
                                    <LanguageOutlinedIcon
                                        className="url-label"
                                        style={{
                                            fontSize: 34,
                                        }}
                                    />
                                )}
                            </Avatar>
                        </Button>
                        <Typography className="tw-font-normal tw-text-sm url-label" align="center">
                            URL
                        </Typography>
                    </div>
                )}

            </ThemeProvider>
        </div>
    );
};

export default CustomTextField;
