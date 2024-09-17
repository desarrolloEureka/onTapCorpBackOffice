import CustomSwitchGeneral from '@/components/customSwitchGeneral/CustomSwitchGeneral';
import { EducationSubIndexDataForm, ItemFormParams } from '@/types/profile';
import CircleOutlinedIcon from '@mui/icons-material/CircleOutlined';
import DeleteForeverOutlinedIcon from '@mui/icons-material/DeleteForeverOutlined';
import SchoolOutlinedIcon from '@mui/icons-material/SchoolOutlined';
import { Box, Button, TextField } from '@mui/material';
import { useEffect, useRef } from 'react';

const FormEducation = ({
  label,
  name,
  handleSwitch,
  handleData,
  checked,
  deleteAction,
  icon,
  handleDeleteData,
  handleModalAlert,
  myValue,
  index,
  subindex,
  withCheck,
  subLabel,
}: ItemFormParams) => {
  const dataRef = useRef<any>(null);

  const value = () => {
    if (dataRef.current && dataRef.current.length) {
      const res = subLabel
        ? dataRef.current[subindex as any][subLabel]
        : undefined;
      return res ?? undefined;
    }
  };

  const isChecked = () => {
    const i = subindex as any;
    if (index == 'education') {
      if (dataRef.current && dataRef.current.length > 0) {
        return dataRef.current[i].checked;
      }
    }
  };

  useEffect(() => {
    if (dataRef && myValue) {
      dataRef.current = myValue;
    }
  }, [myValue, dataRef]);
  // console.log('value', value());

  return (
    <Box className='tw-flex tw-flex-row'>
      <Box className='tw-flex tw-items-center tw-justify-left tw-w-[65%]'>
        <TextField
          className='tw-w-full'
          ref={dataRef}
          id={`${name}-input`}
          variant='standard'
          InputProps={{
            startAdornment: (
              <>
                {withCheck && (
                  <SchoolOutlinedIcon
                    style={{
                      color: '#02AF9B',
                      fontSize: '1.8rem',
                      marginRight: '0.5rem',
                    }}
                  />
                )}
                <CircleOutlinedIcon
                  style={{
                    color: '#000000',
                    fontSize: '0.5rem',
                    marginRight: '0.3rem',
                  }}
                />
                <span
                  style={{
                    fontSize: '0.8rem',
                    marginRight: '0.5rem',
                  }}
                >
                  {label}
                </span>
              </>
            ),
          }}
          onChange={(text: any) => {
            dataRef &&
              handleData({
                name: name,
                text: text.target.value,
                currentDataRef: dataRef,
                key: subindex,
                subindex: subLabel as EducationSubIndexDataForm,
              });
          }}
          value={value()}
        />
      </Box>
      {withCheck && deleteAction === true && handleModalAlert ? (
        <>
          <Box className='tw-flex tw-items-center tw-justify-center tw-w-[10%] tw-mt-4'>
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
          <Box className='tw-flex tw-items-center tw-justify-center tw-w-[25%] tw-mt-4'>
            <CustomSwitchGeneral
              name={name}
              handleSwitch={(e: any) =>
                handleSwitch({
                  value: e,
                  currentDataRef: dataRef,
                  key: subindex,
                })
              }
              checked={isChecked() ?? false}
            />
          </Box>
        </>
      ) : (
        withCheck && (
          <Box className='tw-flex tw-items-center tw-justify-center tw-w-[35%] tw-mt-4'>
            <CustomSwitchGeneral
              name={name}
              handleSwitch={(e: any) => handleSwitch({ value: e })}
              checked={checked}
            />
          </Box>
        )
      )}
    </Box>
  );
};

export default FormEducation;
