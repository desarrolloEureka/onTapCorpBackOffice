import { CampusScheduleValues } from "@/types/campus";
import { ModalParamsMainForm } from "@/types/modals";
import AttachFileOutlinedIcon from "@mui/icons-material/AttachFileOutlined";
import ExploreOutlinedIcon from "@mui/icons-material/ExploreOutlined";
import LocalPhoneOutlinedIcon from "@mui/icons-material/LocalPhoneOutlined";
import { InputAdornment, MenuItem, Select, Typography } from "@mui/material";
import { styled } from "@mui/system";
import { Col, Form, Modal } from "react-bootstrap";
import { BsBuildingAdd } from "react-icons/bs";
import { ImCancelCircle } from "react-icons/im";
import { IoMdClose } from "react-icons/io";
import { IoAddCircle } from "react-icons/io5";
import { RiSave2Fill } from "react-icons/ri";
import CustomMUITelInput from "../company/components/CustomMUITelInput";
import CustomTextField from "../company/components/CustomTextField";
import MeetingStatusesHook from "./hook/CampusHook";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import React from "react";

const CampusModal = ({
  handleShowMainForm,
  setHandleShowMainForm,
  handleShowMainFormEdit,
  setHandleShowMainFormEdit,
  editData,
  title,
  reference,
}: ModalParamsMainForm) => {
  const {
    dataForm,
    sortedSchedule,
    modeTheme,
    show,
    isLoading,
    isEdit,
    phones,
    campusNameError,
    campusNumError,
    campusAddressError,
    campusUrlError,
    daysInSpanish,
    hoursArray,
    handleSendForm,
    handleClose,
    handleReset,
    handleEditForm,
    handleChangeItem,
    handleChange,
    handleAddData,
    handleDeleteItem,
    handleScheduleDay,
  } = MeetingStatusesHook({
    handleShowMainForm,
    setHandleShowMainForm,
    handleShowMainFormEdit,
    setHandleShowMainFormEdit,
    editData,
    title,
    reference,
  });
  const [error, setError] = React.useState("");

  const CustomSelect = styled(Select)({
    backgroundColor: "#396593",
    width: 110,
    height: 44,
    color: "#fff",
    "& .MuiSelect-icon": {
      color: "#fff",
    },
    "& .MuiOutlinedInput-notchedOutline": {
      borderColor: "transparent",
    },
    "&:hover .MuiOutlinedInput-notchedOutline": {
      borderColor: "transparent",
    },
    "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
      borderColor: "transparent",
    },
  });

  return (
    <Modal
      size={reference === "companies" ? "xl" : "lg"}
      centered
      show={show}
      onHide={handleClose}
      aria-hidden="false"
      aria-modal="true"
      contentClassName={reference !== "companies" ? "modal-admin" : ""}
      backdrop="static"
    >
      <Form onReset={handleReset} onSubmit={handleSendForm}>
        <Modal.Title
          className="tw-pt-5 tw-px-8 tw-flex tw-flex-row tw-justify-between modal-title-admin"
          as="h6"
        >
          <span>Sede Nueva</span>
          <div className="tw-flex tw-w-[7%] tw-flex-col tw-justify-center tw-items-center -tw-mt-2">
            <button
              type="button"
              onClick={handleClose}
              className="tw-p-0 tw-bg-transparent tw-border-0 hover:tw-bg-transparent tw-flex tw-justify-center tw-items-center"
              style={{
                padding: 0,
                background: "transparent",
                border: "none",
              }}
            >
              <IoMdClose size={35} color={"white"} />
            </button>
          </div>
        </Modal.Title>

        <Modal.Body className="tw-px-8">
          <div className="tw-flex tw-flex-col lg:tw-flex-row tw-space-x-0 lg:tw-space-x-4 tw-space-y-4 lg:tw-space-y-0">
            <div className="tw-flex tw-w-full tw-flex-col tw-space-y-4">
              <div className="tw-flex tw-p-2 tw-rounded tw-flex-col tw-justify-center tw-items-start sub-card-admin-body">
                <h6 className="main-title-sub-card tw-m-0 tw-p-2 tw-rounded">
                  Datos Sede
                </h6>

                <div className="tw-px-3 tw-w-full">
                  <CustomTextField
                    data={dataForm.name}
                    onChange={(value: string, name: string, checked: boolean) =>
                      handleChange(value, name, checked)
                    }
                    name="name"
                    type="text"
                    switch="true"
                    theme={modeTheme}
                    id="name"
                    fullWidth
                    label="Nombre Sede"
                    helperText={campusNameError}
                    error={!!campusNameError}
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <BsBuildingAdd />
                        </InputAdornment>
                      ),
                    }}
                  />
                  <CustomTextField
                    data={dataForm.address}
                    onChange={(value: string, name: string, checked: boolean) =>
                      handleChange(value, name, checked)
                    }
                    name="address"
                    type="text"
                    switch="true"
                    theme={modeTheme}
                    id="address"
                    fullWidth
                    label="Dirección"
                    helperText={campusAddressError}
                    error={!!campusAddressError}
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <ExploreOutlinedIcon />
                        </InputAdornment>
                      ),
                    }}
                  />
                  {/* <CustomTextField
                                        data={dataForm.url}
                                        onChange={(
                                            value: string,
                                            name: string,
                                            checked: boolean,
                                        ) => handleChange(value, name, checked)}
                                        name="url"
                                        type="url"
                                        switch="true"
                                        theme={modeTheme}
                                        id="url"
                                        fullWidth
                                        label="Url Locación"
                                        helperText={
                                            campusUrlError ||
                                            "Ej: https://example.com"
                                        }
                                        error={!!campusUrlError}
                                        InputProps={{
                                            startAdornment: (
                                                <InputAdornment position="start">
                                                    <AttachFileOutlinedIcon />
                                                </InputAdornment>
                                            ),
                                            title: 'Ingrese una URL válida Ej: "https://example.com"',
                                        }}
                                    /> */}
                </div>
              </div>
              <div className="tw-flex tw-p-2 tw-rounded tw-flex-col tw-justify-center tw-items-start sub-card-admin-body">
                <div className="tw-flex tw-w-full tw-justify-between">
                  <h6 className="main-title-sub-card tw-m-0 tw-p-2 tw-rounded">
                    Teléfonos de Contacto
                  </h6>
                  {dataForm.phones && dataForm.phones.length < 3 && (
                    <div
                      onClick={() => handleAddData("phone")}
                      className="add-button-item tw-flex tw-justify-center tw-items-center tw-rounded tw-px-2 tw-text-md tw-cursor-pointer"
                    >
                      <IoAddCircle size={25} />
                      Agregar Otro Teléfono
                    </div>
                  )}
                </div>

                <div className="tw-flex tw-flex-col tw-w-full">
                  {dataForm.phones &&
                    dataForm.phones.map((item, index) => (
                      <div
                        key={index}
                        className="tw-flex tw-flex-col tw-px-3 tw-w-full"
                      >
                        <div className="tw-flex tw-flex-row tw-mt-4 tw-w-full">
                          {/* Contenedor para el input y el ícono */}
                          <div className="tw-relative tw-w-1/3 tw-mt-4">
                            {/* Ícono posicionado a la izquierda con color negro */}
                            <ArrowDropDownIcon
                              className="tw-absolute tw-top-1/2 tw-left-2 tw-transform tw--translate-y-1/2"
                              style={{ color: "black" }} // Usar `style` para el color
                            />
                            {/* Input del indicativo */}
                            <CustomMUITelInput
                              className="tw-pl-10" // Espacio para evitar solapamiento con el ícono
                              value={
                                item.indicative && item.indicative.includes("+")
                                  ? item.indicative
                                  : "+" + item.indicative
                              }
                              onChange={(value: string, name: string) =>
                                handleChangeItem("phones", index, name, value)
                              }
                              name="indicative"
                              theme={modeTheme}
                              id={`indicative-${index}`}
                              variant="standard"
                              size="medium"
                              label="Indicativo"
                              InputProps={{
                                readOnly: true,
                              }}
                            />
                          </div>

                          <CustomTextField
                          data={[item.text, item.checked]}
                          onChange={(value: string, name: string, checked: boolean) => {
                            // Elimina cualquier carácter no numérico
                            const numericValue = value.replace(/\D/g, '');

                            // Limita la longitud a 10 caracteres
                            if (numericValue.length <= 10) {
                              handleChangeItem("phones", index, name, numericValue, checked);
                            }
                          }}
                          name="text"
                          type="text"
                          switch="true"
                          theme={modeTheme}
                          id={`phone-${index}`}
                          fullWidth
                          label="Teléfono"
                          helperText={campusNumError}
                          error={!!campusNumError}
                          InputProps={{
                            startAdornment: (
                              <InputAdornment position="start">
                                <LocalPhoneOutlinedIcon />
                              </InputAdornment>
                            ),
                            maxLength: 10, 
                          }}
                          inputProps={{
                            maxLength: 10, 
                            pattern: '[0-9]*', 
                          }}
                        />

                        </div>

                        <CustomTextField
                          data={item.ext}
                          onChange={(value: string, name: string) =>
                            handleChangeItem("phones", index, name, value)
                          }
                          onClick={() => {
                            handleDeleteItem(index);
                          }}
                          name="ext"
                          type="text"
                          deleted={"true"}
                          theme={modeTheme}
                          id="ext"
                          fullWidth
                          InputProps={{
                            startAdornment: (
                              <InputAdornment position="start">
                                <Typography className="tw-font-bold">
                                  EXT
                                </Typography>
                              </InputAdornment>
                            ),
                          }}
                        />
                      </div>
                    ))}
                </div>
              </div>
            </div>
            <div className="tw-flex tw-w-full lg:tw-w-[85%] tw-flex-col tw-space-y-4">
              <div className="tw-flex tw-p-2 tw-rounded tw-flex-col tw-justify-center tw-items-start sub-card-admin-body tw-space-y-4">
                <div className="tw-flex tw-w-full tw-justify-start">
                  <h6 className="main-title-sub-card tw-m-0 tw-p-2 tw-rounded">
                    Horario Sede
                  </h6>
                </div>

                <div className="tw-flex tw-flex-col tw-w-full">
                  <div className="tw-flex flex-row tw-gap-4 tw-full label-textfield border-bottom">
                    <div className="tw-flex tw-w-[50%] tw-justify-center tw-items-center tw-py-2">
                      <span>Día</span>
                    </div>
                    <div className="tw-flex tw-w-full tw-justify-center tw-items-center tw-py-2">
                      <span>Hora Apertura</span>
                    </div>
                    <div className="tw-flex tw-w-full tw-justify-center tw-items-center tw-py-2">
                      <span>Hora Cierre</span>
                    </div>
                  </div>

                  {sortedSchedule.map(
                    (item: [string, CampusScheduleValues], index: number) => (
                      <div
                        key={index}
                        className="tw-flex flex-row tw-gap-4 tw-full modal-title"
                      >
                        <div className="tw-flex tw-w-[50%] tw-justify-center tw-items-center tw-py-2">
                          <span>{daysInSpanish[item[0]][0]}</span>
                        </div>
                        <div className="tw-flex tw-w-full tw-justify-center tw-items-center tw-py-2">
                          <CustomSelect
                            labelId="area-label"
                            value={item[1].openTime}
                            onChange={(e: any) => {
                              e.preventDefault();
                              handleScheduleDay(e, item[0], "openTime");
                            }}
                            label=""
                            MenuProps={{
                              PaperProps: {
                                style: {
                                  maxHeight: 200, // Ajusta la altura del menú
                                  width: 120, // Ajusta el ancho del menú
                                },
                              },
                            }}
                          >
                            {hoursArray &&
                              hoursArray.map((hour, index) => (
                                <MenuItem
                                  className="tw-flex tw-items-center tw-justify-center"
                                  key={index}
                                  value={hour.value}
                                >
                                  {hour.label}
                                  Hs
                                </MenuItem>
                              ))}
                          </CustomSelect>
                        </div>
                        <div className="tw-flex tw-w-full tw-justify-center tw-items-center tw-py-2">
                          <CustomSelect
                            labelId="area-label"
                            value={item[1].closeTime}
                            onChange={(e: any) => {
                              e.preventDefault();
                              handleScheduleDay(e, item[0], "closeTime");
                            }}
                            label=""
                            MenuProps={{
                              PaperProps: {
                                style: {
                                  maxHeight: 200, // Ajusta la altura del menú
                                  width: 120, // Ajusta el ancho del menú
                                },
                              },
                            }}
                          >
                            {hoursArray &&
                              hoursArray.map((hour, index) => (
                                <MenuItem
                                  className="tw-flex tw-items-center tw-justify-center"
                                  key={index}
                                  value={hour.value}
                                >
                                  {hour.label}
                                  Hs
                                </MenuItem>
                              ))}
                          </CustomSelect>
                        </div>
                      </div>
                    )
                  )}
                </div>
              </div>
            </div>
          </div>
        </Modal.Body>

        <Modal.Footer className="tw-flex tw-flex-row tw-justify-between">
          <Col className="tw-flex tw-flex-row tw-space-x-2 tw-items-center tw-justify-end">
            <button
              type="button"
              className="tw-flex tw-items-center tw-py-2 tw-px-3 tw-rounded-[3px] tw-border-none tw-bg-transparent hover:tw-bg-transparent tw-text-white"
              onClick={handleClose}
            >
              <ImCancelCircle size={28} />
              {/* Cancelar */}
            </button>

            {!isEdit && handleShowMainFormEdit ? (
              <button
                type="submit"
                className="tw-flex tw-items-center tw-py-2 tw-px-3 tw-rounded-[3px] tw-border-none tw-bg-transparent hover:tw-bg-transparent tw-text-white"
                onClick={handleEditForm}
              >
                <RiSave2Fill size={28} />
              </button>
            ) : (
              <button
                type="submit"
                className={`${
                  isLoading && "btn-loader"
                } tw-py-2 tw-px-3 tw-rounded-[3px] tw-border-none tw-bg-transparent hover:tw-bg-transparent tw-flex tw-justify-center tw-items-center`}
              >
                {isLoading ? (
                  <span className="ml-2 loading">
                    <i className="ri-loader-2-fill"></i>
                  </span>
                ) : (
                  <span className="tw-text-white">
                    <RiSave2Fill size={28} />
                  </span>
                )}
              </button>
            )}
          </Col>
        </Modal.Footer>
      </Form>
    </Modal>
  );
};

export default CampusModal;
