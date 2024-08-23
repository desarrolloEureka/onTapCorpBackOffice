"use client";
import { IconButton, TextField } from "@mui/material";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import { useEffect, useState } from "react";
import { FaTrashCan } from "react-icons/fa6";
import CustomSwitch from "./CustomSwitch";

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
    ) => {
        props.onChange(value, name, checked);
        setValue(value);
        setChecked(checked);
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

    return (
        <div className="tw-flex tw-flex-row tw-px-3 tw-mt-4 tw-w-full">
            <ThemeProvider theme={theme}>
                <TextField
                    {...props}
                    value={value}
                    onChange={(e) =>
                        handleCustomChange(
                            e.target.value,
                            e.target.name,
                            checked,
                        )
                    }
                    onClick={() => {}}
                    name={props.name}
                    variant="standard"
                    color="primary"
                    className={`tw-mb-4 ${props.deleted && "tw-w-full"}`}
                />

                {props.switch && (
                    <CustomSwitch
                        modeTheme={props.theme}
                        checked={checked}
                        onChange={(e) =>
                            handleCustomChange(
                                value,
                                props.name,
                                e.target.checked,
                            )
                        }
                    />
                )}
                {props.deleted && (
                    <div className="tw-flex tw-w-1/5  tw-items-center tw-justify-center">
                        <IconButton
                            onClick={() => props.onClick()}
                            size="small"
                            component="span"
                        >
                            <FaTrashCan size={25} />
                        </IconButton>
                    </div>
                )}
            </ThemeProvider>
        </div>
    );
};

export default CustomTextField;
