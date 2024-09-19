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
    setTemplateSelect?: (e: TemplateType) => void;
    templates?: TemplateData[];
    checked: boolean;
}) => {
    const checkboxRef = useRef<any>(null);
    const [isUpdate, setIsUpdate] = useState(false);
    const [fakeData, setFakeData] = useState<TemplateData[]>(templates ?? []);

    const handleSelectTemplate = async () => {
        const userId = uid;
        const fakeDataClone = [...fakeData];
        const templateIndex = fakeDataClone.findIndex(
            (item) => item.id === checkboxRef.current.id,
        );

        if (templateIndex !== -1) {
            fakeDataClone[templateIndex].checked = true;
        } else {
            fakeDataClone.push({
                id: checkboxRef.current.id,
                checked: true,
            });
            setFakeData(fakeDataClone);
            userId && (await SendTemplateSelected(userId, fakeDataClone));
        }
        setIsUpdate(!isUpdate);
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
