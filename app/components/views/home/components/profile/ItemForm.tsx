import CustomSwitchGeneral from '@/components/customSwitchGeneral/CustomSwitchGeneral';
import { ItemFormParams } from '@/types/profile';
import PersonOutlinedIcon from '@mui/icons-material/PersonOutlined';
import { Box, Button, InputAdornment, MenuItem, Select, TextField } from '@mui/material';
import FilePresentOutlinedIcon from '@mui/icons-material/FilePresentOutlined';
import WorkOutlineOutlinedIcon from '@mui/icons-material/WorkOutlineOutlined';
import ExploreOutlinedIcon from '@mui/icons-material/ExploreOutlined';
import AttachFileOutlinedIcon from '@mui/icons-material/AttachFileOutlined';
import AccessibilityOutlinedIcon from '@mui/icons-material/AccessibilityOutlined';
import TranslateIcon from '@mui/icons-material/Translate';
import LocalPhoneOutlinedIcon from '@mui/icons-material/LocalPhoneOutlined';
import EmailOutlinedIcon from '@mui/icons-material/EmailOutlined';
import DeleteForeverOutlinedIcon from '@mui/icons-material/DeleteForeverOutlined';
import { useEffect, useRef } from 'react';
import SchoolIcon from '@mui/icons-material/School';
import CreateIcon from '@mui/icons-material/Create';
import FactoryIcon from '@mui/icons-material/Factory';
import NoteAltIcon from '@mui/icons-material/NoteAlt';
import EngineeringIcon from '@mui/icons-material/Engineering';
import MilitaryTechIcon from '@mui/icons-material/MilitaryTech';
import AssignmentIndIcon from '@mui/icons-material/AssignmentInd';
import ReactCountryFlag from 'react-country-flag';
import { countries } from '@/globals/constants';

const ItemForm = ({
  label,
  name,
  handleSwitch,
  handleData,
  checked,
  deleteAction,
  icon,
  handleModalAlert,
  myValue,
  index,
  subindex,
}: ItemFormParams) => {
  const dataRef = useRef<any>(null);
  const value = () => {
    if (
      index !== 'phones' &&
      index !== 'education' &&
      index !== 'emails' &&
      index !== 'urls' &&
      index !== 'professional_career'
    ) {
      return dataRef?.current?.text ?? myValue?.text;
    } else {
      if (dataRef.current && dataRef.current.length) {
        if (index === 'phones') {
          const res = dataRef.current[subindex as any];
          return res ?? undefined;
        } else {
          const res = dataRef.current[subindex as any].text;
          return res ?? undefined;
        }
      }
    }
  };

  const isChecked = () => {
    const i = subindex as any;
    if (index == 'phones' || index == 'emails') {
      if (dataRef.current && dataRef.current.length > 0) {
        return dataRef.current[i].checked;
      }
    }
  };

  useEffect(() => {
    if (dataRef && myValue) {
      dataRef.current = myValue;
    }
  }, [dataRef, myValue]);

  return (
    <Box className='tw-flex tw-flex-row'>
      <Box className='tw-flex tw-items-center tw-justify-center tw-w-[65%]'>
        {(label === 'phones' || label === 'Telefono' || label === 'Teléfono') && (
          <div className='tw-w-[45%] tw-h-[100%] tw-flex tw-items-end tw-justify-end'>
            <div className='tw-w-[75%] tw-h-[100%] tw-flex tw-items-center tw-justify-end tw-pr-2'>
              <Select
                value={value()?.indicative ? value()?.indicative : ''}
                MenuProps={{
                  PaperProps: {
                    style: {
                      maxHeight: 180,
                    },
                  },
                }}
                onChange={(event) => {
                  dataRef &&
                    handleData({
                      name: name,
                      text: event.target.value as string,
                      currentDataRef: dataRef,
                      key: subindex,
                      type: false
                    });
                }
                }
                style={{ height: '48px', width: '120px' }}

                displayEmpty
                inputProps={{ 'aria-label': 'country code' }}
              >
                {countries.map((country) => (
                  <MenuItem key={country.id} value={country.id}>
                    <ReactCountryFlag countryCode={country.flag} svg style={{ marginRight: '8px' }} />
                    {country.code}
                    {/*  {country.name} ({country.code}) */}
                  </MenuItem>
                ))}
              </Select>
            </div>
          </div>
        )}
        <TextField
          ref={dataRef}
          id={`${name}-input`}
          label={label === 'name' ? 'Nombres' :
            label === 'last_name' ? 'Apellidos' :
              label === 'profession' ? 'Profesión' :
                label === 'occupation' ? 'Ocupación' :
                  label === 'address' ? 'Dirección' :
                    label === 'company' ? 'Empresa' :
                      label === 'position' ? 'Cargo' :
                        label === 'professional_profile' ? 'Perfil Profesional' :
                          label === 'other_competencies' ? 'Otras Competencias' :
                            label === 'skills' ? 'Habilidades' :
                              label === 'languages' ? 'Idiomas' :
                                label === 'achievements_recognitions' ? 'Logros y reconocimientos' :
                                  label === 'phones' ? 'Telefono' :
                                    label === 'emails' ? 'Correo' :
                                      label === 'urls' ? 'urls' :
                                        label}
          variant='standard'
          InputProps={{
            startAdornment: (
              <InputAdornment position='start'>
                {icon === 'PersonOutlinedIcon' ? (
                  <PersonOutlinedIcon
                    style={{
                      color: '#02AF9B',
                      fontSize: '1.8rem',
                      marginRight: '1rem',
                    }}
                  />
                ) : icon === 'FilePresentOutlinedIcon' ? (
                  <FilePresentOutlinedIcon
                    style={{
                      color: '#02AF9B',
                      fontSize: '1.8rem',
                      marginRight: '1rem',
                    }}
                  />
                ) : icon === 'WorkOutlineOutlinedIcon' ? (
                  <WorkOutlineOutlinedIcon
                    style={{
                      color: '#02AF9B',
                      fontSize: '1.8rem',
                      marginRight: '1rem',
                    }}
                  />
                ) : icon === 'ExploreOutlinedIcon' ? (
                  <ExploreOutlinedIcon
                    style={{
                      color: '#02AF9B',
                      fontSize: '1.8rem',
                      marginRight: '1rem',
                    }}
                  />
                ) : icon === 'AttachFileOutlinedIcon' ? (
                  <AttachFileOutlinedIcon
                    style={{
                      color: '#02AF9B',
                      fontSize: '1.8rem',
                      marginRight: '1rem',
                    }}
                  />
                ) : icon === 'AccessibilityOutlinedIcon' ? (
                  <AccessibilityOutlinedIcon
                    style={{
                      color: '#02AF9B',
                      fontSize: '1.8rem',
                      marginRight: '1rem',
                    }}
                  />
                ) : icon === 'TranslateIcon' ? (
                  <TranslateIcon
                    style={{
                      color: '#02AF9B',
                      fontSize: '1.8rem',
                      marginRight: '1rem',
                    }}
                  />
                ) : icon === 'LocalPhoneOutlinedIcon' ? (
                  <LocalPhoneOutlinedIcon
                    style={{
                      color: '#02AF9B',
                      fontSize: '1.8rem',
                      marginRight: '1rem',
                    }}
                  />
                ) : icon === 'EmailOutlinedIcon' ? (
                  <EmailOutlinedIcon
                    style={{
                      color: '#02AF9B',
                      fontSize: '1.8rem',
                      marginRight: '1rem',
                    }}
                  />
                ) : icon === 'SchoolIcon' ? (
                  <SchoolIcon
                    style={{
                      color: '#02AF9B',
                      fontSize: '1.8rem',
                      marginRight: '1rem',
                    }}
                  />
                ) : icon === 'CreateIcon' ? (
                  <CreateIcon
                    style={{
                      color: '#02AF9B',
                      fontSize: '1.8rem',
                      marginRight: '1rem',
                    }}
                  />
                ) : icon === 'FactoryIcon' ? (
                  <FactoryIcon
                    style={{
                      color: '#02AF9B',
                      fontSize: '1.8rem',
                      marginRight: '1rem',
                    }}
                  />
                ) : icon === 'NoteAltIcon' ? (
                  <NoteAltIcon
                    style={{
                      color: '#02AF9B',
                      fontSize: '1.8rem',
                      marginRight: '1rem',
                    }}
                  />
                ) : icon === 'EngineeringIcon' ? (
                  <EngineeringIcon
                    style={{
                      color: '#02AF9B',
                      fontSize: '1.8rem',
                      marginRight: '1rem',
                    }}
                  />
                ) : icon === 'MilitaryTechIcon' ? (
                  <MilitaryTechIcon
                    style={{
                      color: '#02AF9B',
                      fontSize: '1.8rem',
                      marginRight: '1rem',
                    }}
                  />
                ) : icon === 'AssignmentIndIcon' ? (
                  <AssignmentIndIcon
                    style={{
                      color: '#02AF9B',
                      fontSize: '1.8rem',
                      marginRight: '1rem',
                    }}
                  />
                ) : null}
              </InputAdornment>
            ),
          }}
          onChange={(text: any) => {
            dataRef &&
              handleData({
                name: name,
                text: text.target.value,
                currentDataRef: dataRef,
                key: subindex,
              });
          }}
          type={label === 'phones' || label === 'Telefono' || label === 'Teléfono' ? 'tel' : name === 'emails' ? 'email' : 'text'}
          value={label === 'phones' || label === 'Telefono' || label === 'Teléfono' ? value()?.text : value()}
        />
      </Box>
      {deleteAction === true && handleModalAlert ? (
        <>
          <Box className='tw-flex tw-items-center tw-justify-center tw-w-[10%] tw-mt-10'>
            <Button
              className='tw-w-[100%] tw-h-[100%]'
              onClick={() =>
                handleModalAlert({ index: index, subindex: '' + subindex })
              }
            >
              <DeleteForeverOutlinedIcon
                style={{
                  color: '#02AF9B',
                  fontSize: '1.7rem',
                }}
              />
            </Button>
          </Box>
          <Box className='tw-flex tw-items-center tw-justify-center tw-w-[25%] tw-mt-10'>
            <CustomSwitchGeneral
              name={name}
              handleSwitch={(e: any) => {
                handleSwitch({
                  value: e,
                  currentDataRef: dataRef,
                  key: subindex,
                });
              }}
              checked={isChecked() ?? false}
            />
          </Box>
        </>
      ) : (
        <Box className='tw-flex tw-items-center tw-justify-center tw-w-[35%] tw-mt-10'>
          <CustomSwitchGeneral
            name={name}
            handleSwitch={(e: any) => handleSwitch({ value: e })}
            checked={checked}
          />
        </Box>
      )}
    </Box>
  );
};

export default ItemForm;
