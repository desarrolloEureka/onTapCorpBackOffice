"use client";
import { getStateName } from "@/data/formConstant";
import useAuth from "@/firebase/auth";
import {
    getAllDocumentsQuery,
    saveDataDocumentsQueryById,
    saveIconFile,
    listenToDocumentsQuery
} from "@/queries/documentsQueries";
import { getCoordinates } from "@/queries/GeoMapsQueries";
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

    // Errores
    const [errors, setErrors] = useState<{ [key: string]: string }>({});

    const companyName = companyData && companyData.tradename[0];
    //Modal Iconos
    const [isOpenModalIcons, setIsOpenModalIcons] = useState<boolean>(false);
    const [itemUrlKey, setItemUrlKey] = useState(0);
    const [dataLogos, setDataLogos] = useState<any>(null);
    const [itemUrlSelected, setItemUrlSelected] = useState([]);

    useEffect(() => {
        const fetchDocuments = listenToDocumentsQuery("logos", setDataLogos, companyData?.uid);
        return () => fetchDocuments();
    }, [companyData?.uid]);

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
                //console.log(err, error);
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
        const formattedAddress: string = `${data.city}, ${getStateName(
            data.state,
        )},${data.country}`;

        const coords = await getCoordinates(formattedAddress);

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
                        //console.log(err);
                    });
            }
        }
        await saveDataDocumentsQueryById({
            id: data.uid,
            data: { ...data, geolocation: coords },
            reference,
        });
    };

    const validateFields = () => {
        const newErrors: { [key: string]: string } = {};
        if (!data.tradename[0]?.trim()) {
            newErrors.tradename = "El nombre es obligatorio";
        }
        if (!data.businessName[0]?.trim()) {
            newErrors.businessName = "La razón social es obligatorio";
        }
        if (!data.id[0]?.trim()) {
            newErrors.id = "El NIT es obligatorio";
        }

        if (data.webSite[0] && !/^https:\/\/.+\..+$/.test(data.webSite[0])) {
            newErrors.webSite = "Ej: https://example.com";
        }

        // Validación para URLs dinámicas que comienzan con 'urlLink'
        for (const key in data) {
            if (key.startsWith('urlLink') && data[key]) {
                if (!/^https:\/\/.+\..+$/.test(data[key])) {
                    newErrors.urlLink = `Ej: https://example.com`;
                }
            }
        }
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSendForm = async (e: any) => {
        e.preventDefault();
        // Validar los campos antes de continuar
        if (!validateFields()) return;
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
            const dataFiltered = _.omit(_.cloneDeep(data), [
                item[0],
                item[3],
                item[5],
            ]);
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

            const itemIndex =
                objToArrayItems[type ?? "phone"].length > 0
                    ? objToArrayItems[type ?? "phone"].length
                    : 0;

            listItemToChange.forEach((item) => {
                const currentIndex = `${item}${itemIndex + 1}`;

                newItemPhone[currentIndex] =
                    item === "phone"
                        ? ["", false]
                        : item === "indicative"
                        ? "57"
                        : item === "ext"
                        ? " "
                        : " ";
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
            const listNewItem: string[] = ["urlName", "urlLink", "iconName"];
            const newItemUrl: { [key: string]: any[] | string } = {};
            const itemIndex = objToArrayItems[type ?? "urlName"].length
                ? objToArrayItems[type ?? "urlName"].length
                : 0;

            listNewItem.forEach((item) => {
                const currentIndex = `${item}${itemIndex + 1}`;

                newItemUrl[currentIndex] =
                    item === "urlName"
                        ? ["", false]
                        : item === "urlLink"
                        ? " "
                        : item === "iconName"
                        ? " "
                        : " ";
            });

            setData({ ...data, ...newItemUrl });
        }
    };

    const handleDataNetworks = (text: any, index: any) => {
        setData({
            ...data,
            ["iconName" + "" + (index === 0 ? "" : index + 1)]: text,
        });
        setItemUrlSelected({
            ...objToArrayItems.urlName[index],
            iconName: text,
        });
        setTimeout(() => {
            setIsOpenModalIcons(false);
        }, 1000);
    };

    const handleOpenModalIcons = (item: any, index: any) => {
        setItemUrlKey(index);
        setItemUrlSelected(item);
        setIsOpenModalIcons(true);
    };

    const handleCloseModalIcons = () => {
        setItemUrlKey(0);
        setItemUrlSelected([]);
        setIsOpenModalIcons(false);
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
                        const newElements = ["urlLink", "iconName"];
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

            newObject[element] = arrayWithKey.map((item) => {
                const flatArray = item.flat();
                // Si el primer y segundo elemento son iguales, eliminamos el primero
                return flatArray[0] === flatArray[1] ? flatArray.slice(1) : flatArray;
            });
        });

        return newObject;
    }, [data]);

    useEffect(() => {
        data && setObjToArrayItems(createNewArray());
    }, [createNewArray, data]);

    useEffect(() => {
        if (companyData) {
            setData({
                ...companyData,
                urlName: companyData.urlName || ["", false],
                urlLink: companyData.urlLink || " ",
                iconName: companyData.iconName || " "
            });
        }
    }, [companyData]);

    return {
        errors,
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
        handleOpenModalIcons,
        handleCloseModalIcons,
        isOpenModalIcons,
        setIsOpenModalIcons,
        dataLogos,
        handleDataNetworks,
        itemUrlKey,
        setItemUrlKey,
        itemUrlSelected,
        setItemUrlSelected,
    };
};

export default CompanyHook;
