"use client";
import { MenuItem, TextField } from "@mui/material";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import { useEffect, useState } from "react";

const CustomSelect = (props: any) => {
    const [value, setValue] = useState<string | boolean>("");

    const theme = createTheme({
        palette: {
            mode: props.theme,
        },
    });

    const handleCustomChange = (value: string | boolean, name: string) => {
        if (name === "isActive") {
            props.onChange(value, name);
            setValue(value);
            return;
        }
        props.onChange((value || "") ?? "", name);
        setValue((value || "") ?? "");
    };

    useEffect(() => {
        if (props.name === "isActive") {
            setValue(new Boolean(props.data) as boolean);
            return;
        }
        if (props.data && props.data !== "") {
            setValue(props.data as string);
            return;
        }
    }, [props.data, props.name]);

    return (
        <div className="tw-flex tw-flex-row tw-mt-4 tw-w-full">
            <ThemeProvider theme={theme}>
                <TextField
                    {...props}
                    value={value}
                    onChange={(e) =>
                        handleCustomChange(e.target.value, e.target.name)
                    }
                    select
                    sx={{
                        "& .MuiSelect-select span::before": props.name !==
                            "isActive" && {
                            content: '"Seleccione..."',
                            fontStyle: "oblique",
                        },
                    }}
                    defaultValue={"None"}
                    name={props.name}
                    variant="standard"
                    color="primary"
                    className={`tw-mb-4`}
                    InputLabelProps={{
                        style: {
                            fontSize: "20px",
                            fontWeight: "bold",
                            color:
                                props.theme === "light" ? "#396593" : "#8bb8e7",
                        },
                    }}
                    aria-hidden="false"
                >
                    {props.name !== "isActive" && (
                        <MenuItem value="">
                            <em>Seleccione...</em>
                        </MenuItem>
                    )}
                    {props.options.map(
                        (option: {
                            value: string;
                            label: string;
                            statusInfo?: string;
                        }) => (
                            <MenuItem key={option.value} value={option.value}>
                                {option.statusInfo && (
                                    <span
                                        className={`status bg-${option.statusInfo}`}
                                    ></span>
                                )}
                                {option.label}
                            </MenuItem>
                        ),
                    )}
                </TextField>
            </ThemeProvider>
        </div>
    );
};

export default CustomSelect;
