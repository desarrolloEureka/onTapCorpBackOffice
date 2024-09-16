"use client";
import useAuth from "@/firebase/auth";
import {
    saveEditDataDocumentsQuery,
    saveIconFile,
} from "@/queries/documentsQueries";
import { MyStateType } from "@/types/company";
import _ from "lodash";
import { ChangeEvent, useCallback, useEffect, useState } from "react";
import Swal from "sweetalert2";

const CompanyHook = () => {
    const { companyData } = useAuth();

    const [data, setData] = useState<any>();
    const [allChecked, setAllChecked] = useState<string>("none");
    const [files, setFiles] = useState<any>();
    const [fileName, setFileName] = useState<any>();
    const [objToArrayItems, setObjToArrayItems] = useState<MyStateType>({});

    const companyName = companyData && companyData.tradename[0];

    const saveAlert = async (callbackFc: () => Promise<void>) => {
        Swal.fire({
            position: "center",
            title: `Guardando...`,
            text: "Por favor espera",
            allowOutsideClick: false,
            // background: "#404040",
            // color: "#e9a225",
            didOpen: () => {
                Swal.showLoading();
            },
        });

        try {
            await callbackFc();

            Swal.fire({
                icon: "success",
                title: "Éxito",
                text: "La información se guardó con éxito",
                // background: "#404040",
                // color: "#e9a225",
                showConfirmButton: false,
                timer: 1500,
            }).then(() => {
                setFileName(null);
            });
        } catch (error) {
            Swal.fire({
                icon: "error",
                title: "Error",
                text: `Ocurrió un error: ${error}`,
                // background: "#404040",
                // color: "#e9a225",
                // confirmButtonColor: "#1f2937",
                // confirmButtonText: "Regresar",
            }).then((err) => {
                console.log(err, error);
                setFileName(null);
            });
        }
    };

    const confirmSaveAlert = () => {
        Swal.fire({
            title: "¿Confirma el envío de la información?",
            text: "Verifique la información, que todo esté correcto",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#1f2937",
            // cancelButtonColor: "#d33",
            confirmButtonText: "¡Sí, enviar!",
            cancelButtonText: "¡No, verificar!",
            // background: "#404040",
            // color: "#e9a225",
        }).then(async (result) => {
            if (result.isConfirmed) {
                saveAlert(uploadHandle);
            }
        });
    };

    const uploadHandle = async () => {
        const reference = "companies";
        // await new Promise((resolve) => setTimeout(resolve, 3000));

        if (files && files.length > 0) {
            for (const record of files) {
                const urlName = record.name.split(".")[0];
                await saveIconFile({
                    urlName,
                    record,
                    uid: data.uid,
                    reference,
                })
                    .then((result: any) => {
                        data.icon[0] = result;
                        // error.push(...result);
                    })
                    .catch((err) => {
                        console.log(err);
                    });
            }
        }

        await saveEditDataDocumentsQuery({
            id: data.uid,
            data: data,
            reference,
        });
    };

    const handleSendForm = async () => {
        confirmSaveAlert();
    };

    const handleChangeIcon = (e: ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files.length > 0) {
            setFiles(e.target.files);
            setFileName(e.target.files[0].name);
        } else {
            setFiles(null);
            setFileName(null);
        }
    };

    const handleChange = (value: string, name: string, isChecked?: boolean) => {
        if (isChecked === undefined) {
            setData({ ...data, [name]: (value || "-") ?? "-" });
        } else {
            setData({ ...data, [name]: [(value || "") ?? "", !isChecked] });
        }
    };

    const handleAllChecked = (e: ChangeEvent<HTMLInputElement>) => {
        setAllChecked(e.target.checked ? "none" : "all");
        const dataChecked = _.forEach(_.cloneDeep(data), (value, key) => {
            if (_.isArray(value) && value.length > 1) {
                value[1] = !e.target.checked;
            }
        });
        setData(dataChecked);
    };

    const handleChangeMiuTel = (value: string, name: string) => {
        setData({ ...data, [name]: value });
    };

    const handleDeleteItem = (item: any) => {
        if (item[0].includes("url")) {
            const dataFiltered = _.omit(_.cloneDeep(data), [item[0], item[3]]);
            setData(dataFiltered);
        }
        if (item[0].includes("additionalDataName")) {
            const dataFiltered = _.omit(_.cloneDeep(data), [item[0], item[3]]);
            setData(dataFiltered);
        }
        if (item[0].includes("phone")) {
            const dataFiltered = _.omit(_.cloneDeep(data), [
                item[0],
                item[3],
                item[5],
            ]);
            setData(dataFiltered);
        }
        if (item[0].includes("address")) {
            const dataFiltered = _.omit(_.cloneDeep(data), item[0]);
            setData(dataFiltered);
        }
    };

    const handleNewItem = (type: string) => {
        if (type === "phone") {
            const listItemToChange: string[] | string = [
                "phone",
                "indicative",
                "ext",
            ];
            const newItemPhone: { [key: string]: any[] | string } = {};
            // const currentItems = objToArrayItems[type ?? "phone"].map(
            //     (item) => item[0],
            // );
            const itemIndex =
                objToArrayItems[type ?? "phone"].length > 0
                    ? objToArrayItems[type ?? "phone"].length
                    : 0;

            // const arrayFound = objToArrayItems[type ?? "phone"].map(
            //     (item) => item[0],
            // );

            listItemToChange.forEach((item) => {
                const currentIndex = `${item}${itemIndex + 1}`;
                // arrayFound.forEach((element) => {
                // if (element !== currentIndex) {
                newItemPhone[currentIndex] =
                    item === "phone"
                        ? ["", false]
                        : item === "indicative"
                        ? "57"
                        : item === "ext"
                        ? " "
                        : " ";
                // }
                // });
            });
            setData({ ...data, ...newItemPhone });
        }

        if (type === "address") {
            const newItem: string[] | string = type ?? "address";
            const newItemAddress: { [key: string]: any[] | string } = {};

            const itemIndex = objToArrayItems[type ?? "address"].length
                ? objToArrayItems[type ?? "address"].length
                : 0;

            newItemAddress[
                itemIndex === 0 ? newItem : `${newItem}${itemIndex + 1}`
            ] = ["", false];

            setData({ ...data, ...newItemAddress });
        }

        if (type === "additionalDataName") {
            const listNewItem: string[] = [
                "additionalDataName",
                "additionalData",
            ];
            const newItemDato: { [key: string]: any[] | string } = {};
            const itemIndex = objToArrayItems[type ?? "additionalDataName"]
                .length
                ? objToArrayItems[type ?? "additionalDataName"].length
                : 0;

            listNewItem.forEach((item) => {
                item === "additionalDataName"
                    ? (newItemDato[
                          itemIndex === 0 ? item : `${item}${itemIndex + 1}`
                      ] = ["", false])
                    : (newItemDato[
                          itemIndex === 0 ? item : `${item}${itemIndex + 1}`
                      ] = "");
            });
            setData({ ...data, ...newItemDato });
        }

        if (type === "urlName") {
            const listNewItem: string[] = ["urlName", "urlLink"];
            const newItemUrl: { [key: string]: any[] | string } = {};
            const itemIndex = objToArrayItems[type ?? "urlName"].length
                ? objToArrayItems[type ?? "urlName"].length
                : 0;

            listNewItem.forEach((item) => {
                item === "urlName"
                    ? (newItemUrl[
                          itemIndex === 0 ? item : `${item}${itemIndex + 1}`
                      ] = ["", false])
                    : (newItemUrl[
                          itemIndex === 0 ? item : `${item}${itemIndex + 1}`
                      ] = "");
            });
            setData({ ...data, ...newItemUrl });
        }
    };

    const createNewArray = useCallback(() => {
        const newObject: MyStateType = {};

        const keysNameSelected = [
            "phone",
            "address",
            "additionalDataName",
            "urlName",
        ];

        //Recorre las lista para validar
        keysNameSelected.forEach((element) => {
            //Verifica que en esa key coincida o este en la palabra
            const keysFiltered = Object.fromEntries(
                Object.entries(_.cloneDeep(data)).filter(([key, value]) =>
                    key.includes(element),
                ),
            );
            //Obtiene solo los valores de cada propiedad

            const arrayWithKey = _.sortBy(Object.entries(keysFiltered));
            //Agrega el elemento a ese array
            arrayWithKey.map(([key, value]: any, index: number) => {
                if (_.isArray(value)) {
                    value.unshift(key);

                    //Si es "phone" añade los nuevos elementos
                    if (element === "phone") {
                        const newElements = ["ext", "indicative"];
                        newElements.forEach((newItem) => {
                            if (
                                Object.keys(_.cloneDeep(data)).includes(newItem)
                            ) {
                                const itemsFiltered = Object.fromEntries(
                                    Object.entries(_.cloneDeep(data)).filter(
                                        ([subKey, value]) => {
                                            if (index === 0) {
                                                return subKey === newItem;
                                            } else {
                                                return (
                                                    subKey.includes(newItem) &&
                                                    subKey.at(-1) === key.at(-1)
                                                );
                                            }
                                        },
                                    ),
                                );
                                const newItems = Object.entries(itemsFiltered);
                                newItems.forEach((element) => {
                                    value.push(...element);
                                });
                            }
                        });
                    }
                    if (element === "additionalDataName") {
                        const newElements = ["additionalData"];
                        newElements.forEach((newItem) => {
                            if (
                                Object.keys(_.cloneDeep(data)).includes(newItem)
                            ) {
                                const itemsFiltered = Object.fromEntries(
                                    Object.entries(_.cloneDeep(data)).filter(
                                        ([key, value]) => {
                                            if (index === 0) {
                                                return key === newItem;
                                            } else {
                                                return (
                                                    key ===
                                                    `${newItem}${index + 1}`
                                                );
                                            }
                                        },
                                    ),
                                );
                                const newItems = Object.entries(itemsFiltered);
                                newItems.forEach((element) => {
                                    value.push(...element);
                                });
                            }
                        });
                    }
                    if (element === "urlName") {
                        const newElements = ["urlLink"];
                        newElements.forEach((newItem) => {
                            if (
                                Object.keys(_.cloneDeep(data)).includes(newItem)
                            ) {
                                const itemsFiltered = Object.fromEntries(
                                    Object.entries(_.cloneDeep(data)).filter(
                                        ([subKey, value]) => {
                                            if (index === 0) {
                                                return subKey === newItem;
                                            } else {
                                                return (
                                                    subKey.includes(newItem) &&
                                                    subKey.at(-1) === key.at(-1)
                                                );
                                            }
                                        },
                                    ),
                                );
                                const newItems = Object.entries(itemsFiltered);
                                newItems.forEach((element) => {
                                    value.push(...element);
                                });
                            }
                        });
                    }
                }
            });

            newObject[element] = arrayWithKey.map((item) =>
                _.uniq(item.flat()),
            );
        });

        return newObject;
    }, [data]);

    useEffect(() => {
        data && setObjToArrayItems(createNewArray());
    }, [createNewArray, data]);

    useEffect(() => {
        if (companyData) {
            setData(companyData);
        }
    }, [companyData]);

    return {
        data,
        handleChange,
        handleChangeMiuTel,
        companyName,
        allChecked,
        handleAllChecked,
        handleChangeIcon,
        fileName,
        objToArrayItems,
        handleNewItem,
        handleDeleteItem,
        handleSendForm,
    };
};

export default CompanyHook;
