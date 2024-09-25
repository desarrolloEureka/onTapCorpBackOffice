import { SendTemplateSelected } from "@/firebase/user";
import { Checkbox } from "@mui/material";
import RadioButtonUncheckedOutlinedIcon from "@mui/icons-material/RadioButtonUncheckedOutlined";
import RadioButtonCheckedOutlinedIcon from "@mui/icons-material/RadioButtonCheckedOutlined";
import React, { useRef, useState } from "react";

interface TemplateType {
    id: string;
    name: string;
    image: string;
}

interface TemplateData {
    id: string;
    checked: boolean;
}
[];

const CustomCheckbox = ({
    uid,
    value,
    setTemplateSelect,
    templates,
    checked,
}: {
    uid?: string;
    value: any;
    setTemplateSelect?: (e: any) => void;
    templates?: TemplateData[];
    checked: boolean;
}) => {
    const checkboxRef = useRef<any>(null);

    const handleSelectTemplate = async () => {
        const userId = uid;
        const newCheckedState = !checked;

        if (newCheckedState) {
            setTemplateSelect && setTemplateSelect(value); // Si se selecciona, actualiza el template seleccionado
        } else {
            setTemplateSelect && setTemplateSelect(null); // Si se deselecciona, limpia el template seleccionado
        }

        const fakeDataClone = templates ? [...templates] : [];
        const templateIndex = fakeDataClone.findIndex(
            (item) => item.id === checkboxRef.current.id,
        );

        if (templateIndex !== -1) {
            fakeDataClone[templateIndex].checked = newCheckedState;
        } else {
            fakeDataClone.push({
                id: checkboxRef.current.id,
                checked: newCheckedState,
            });
            userId && (await SendTemplateSelected(userId, fakeDataClone));
        }
    };

    return (
        <Checkbox
            inputRef={checkboxRef}
            checked={checked}
            onChange={handleSelectTemplate}
            id={value.id}
            disabled={checked}
            icon={
                <RadioButtonUncheckedOutlinedIcon
                    style={{
                        fontSize: checked ? "1rem" : "1.1rem",
                        color: checked ? "#ffffff" : "#ffffff ",
                    }}
                />
            }
            checkedIcon={
                <RadioButtonCheckedOutlinedIcon
                    style={{
                        fontSize: checked ? "1rem" : "1.1rem",
                        color: checked ? "#ffffff" : "#ffffff ",
                    }}
                />
            }
        />
    );
};

export default CustomCheckbox;
