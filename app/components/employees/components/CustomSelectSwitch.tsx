"use client";
import CustomSwitch from "@/components/company/components/CustomSwitch";
import { FormHelperText, IconButton, InputAdornment, InputLabel, MenuItem, Select, TextField } from "@mui/material";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import { useEffect, useState } from "react";
import { FaTrashCan } from "react-icons/fa6";
import AttachFileIcon from '@mui/icons-material/AttachFile';
import FormControl from '@mui/material/FormControl';

const CustomSelectSwitch = (props: any) => {
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
        props.onChange((value || "") ?? "", name, checked);
        setValue((value || "") ?? "");
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
        <div className="tw-flex tw-flex-row tw-mt-4 tw-w-full">
            <FormControl variant="standard" fullWidth>
                <InputLabel
                    id="doc-type-label"
                    style={{ color: props.theme === "light" ? "#396593" : "#8bb8e7", fontSize: '20px', fontWeight: 'bold' }}
                >
                    Tipo de Documento *
                </InputLabel>
                <Select
                    labelId="doc-type-label"
                    id="doc-type-select"
                    value={value}
                    name={props.name}
                    color="primary"
                    error={
                        !!props.errorShow
                    }
                    onChange={(e) =>
                        handleCustomChange(
                            e.target.value,
                            e.target.name,
                            checked,
                        )
                    }
                    startAdornment={
                        <InputAdornment position="start">
                            <AttachFileIcon />
                        </InputAdornment>
                    }
                >
                    <MenuItem value="AS">AS</MenuItem>
                    <MenuItem value="CC">CC</MenuItem>
                    <MenuItem value="CD">CD</MenuItem>
                    <MenuItem value="CE">CE</MenuItem>
                    <MenuItem value="CN">CN</MenuItem>
                    <MenuItem value="MS">MS</MenuItem>
                    <MenuItem value="NIT">NIT</MenuItem>
                    <MenuItem value="PA">PA</MenuItem>
                    <MenuItem value="PE">PE</MenuItem>
                    <MenuItem value="RC">RC</MenuItem>
                </Select>
                {props.errorShow && <div style={{ color: '#d32f2f', fontSize: '12px' }}>{props.errorShow}</div>}
            </FormControl>

            <div className="tw-flex tw-items-center tw-ml-0">
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
            </div>
        </div>
    );
};

export default CustomSelectSwitch;