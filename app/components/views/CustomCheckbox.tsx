import { SendTemplateSelected } from "@/firebase/user";
import { Checkbox } from "@mui/material";
import RadioButtonUncheckedOutlinedIcon from "@mui/icons-material/RadioButtonUncheckedOutlined";
import RadioButtonCheckedOutlinedIcon from "@mui/icons-material/RadioButtonCheckedOutlined";
import React, { useRef } from "react";

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
    handleCloseModal,
    handleSelectBackground,
    selectedTemplate,
    getUserData,
    getCompanyData
}: {
    uid?: string;
    value: any;
    setTemplateSelect?: (e: any) => void;
    templates?: TemplateData[];
    checked: boolean;
    handleCloseModal?: () => void;
    handleSelectBackground?: any;
    selectedTemplate?: string;
    getUserData?: any;
    getCompanyData?: any;
}) => {
    const checkboxRef = useRef<any>(null);

    const handleSaveTemplate = async (background_id: string) => {
        const userId = uid;
        const templateData = templates;

        if (templateData && selectedTemplate && userId) {
            const newData = templateData?.map((val: any) => {
                val.id === selectedTemplate && (val.background_id = background_id);
                return val;
            });
            newData && (await SendTemplateSelected(userId, newData).then(() => {
                handleCloseModal && handleCloseModal();
            }));
        }
    };

    const handleSelectTemplate = async () => {
        const userId = uid;
        const newCheckedState = !checked;

        if (handleSelectBackground) {
            handleSaveTemplate(checkboxRef?.current?.id);
        } else {
            setTemplateSelect && setTemplateSelect(value.id);
            const fakeDataClone = templates ? [...templates] : [];
            const templateIndex = fakeDataClone[0]?.id === checkboxRef.current.id
            if (!templateIndex) {
                const dataSend = [{
                    id: checkboxRef.current.id,
                    checked: newCheckedState,
                    background_id: '',
                }]
                userId && (await SendTemplateSelected(userId, dataSend));
            }
            getUserData();
            getCompanyData();
        }
    }

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
                        color: handleSelectBackground ? '#5278a0' : '#ffffff ',
                    }}
                />
            }
            checkedIcon={
                <RadioButtonCheckedOutlinedIcon
                    style={{
                        fontSize: checked ? "1rem" : "1.1rem",
                        color: handleSelectBackground ? '#5278a0' : '#ffffff ',
                    }}
                />
            }
        />
    );
};

export default CustomCheckbox;
