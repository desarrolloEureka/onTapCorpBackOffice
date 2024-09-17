'use client';
import React from 'react';
import { Button, Typography } from '@mui/material';
import AddCircleOutlinedIcon from '@mui/icons-material/AddCircleOutlined';
import { Dictionary } from '@/types/dictionary';
import ItemForm from './ItemForm';

import {
  CareerDataFormValues,
  DataFormValues,
  EducationDataFormValues,
  IndexDataForm,
  ProfessionalDataForm,
  SocialDataForm,
  handleDataProps,
} from '@/types/profile';
import { UserData } from '@/types/user';
import ModalAlertLimit from './ModalAlertLimit';

const ItemFormBasicInfo = ({
  dictionary,
  dataForm,
  handleDataSet,
  handleSeeMore,
  index,
  label,
  labelArray,
  value,
  itemDetail,
  isDetailOpen,
  icon,
  social,
  handleModalAlert,
  isProUser,
  handleData,
  user,
  handleSwitch,
  handleAddData,
  handleModalAlertLimit,
  isModalAlertLimit,
  handleDeleteData,
}: {
  dictionary: Dictionary;
  dataForm: SocialDataForm | ProfessionalDataForm;
  handleDataSet: (e: SocialDataForm | ProfessionalDataForm) => void;
  handleSeeMore: (e: number) => void;
  index: IndexDataForm;
  label?: string;
  labelArray:
  | DataFormValues[]
  | EducationDataFormValues[]
  | CareerDataFormValues[];
  value: any;
  itemDetail: number;
  isDetailOpen: boolean;
  icon?: string;
  social: boolean;
  handleModalAlert: ({
    index,
    subindex,
  }: {
    index: string;
    subindex: string;
  }) => void;
  isProUser: boolean;
  handleData: ({
    name,
    text,
    subindex,
    key,
    currentDataRef,
  }: handleDataProps) => void;
  user: UserData;
  handleSwitch: (e: any) => void;
  handleAddData: (index: any) => void;
  handleModalAlertLimit: () => void;
  isModalAlertLimit: boolean;
  handleDeleteData: () => void;
}) => {
  // console.log('user ItemFormBasic', user);
  // console.log('dataForm', dataForm);

  // console.log('labelArray', labelArray);

  // console.log('isModalAlertLimit', isModalAlertLimit);

  return (
    <div
      className={`${value[0] === 'phones' && itemDetail === 1 && labelArray.length > 1
          ? 'tw-h-[300px]'
          : value[0] === 'emails' && itemDetail === 2 && labelArray.length > 1
            ? 'tw-h-[300px]'
            : 'tw-h-[200px]'
        } tw-overflow-y-auto tw-w-[100%] tw-bg-[#E9E9E9] tw-rounded-2xl tw-my-3 tw-py-5`}
    >
      <div
        className={`tw-h-[${labelArray.length * 20
          }px]tw-bg-blue-200 tw-flex tw-flex-col tw-justify-around`}
      >
        <div className='tw-w-[100%]  tw-flex tw-items-center tw-justify-around '>
          <Typography className='tw-text-white tw-bg-[#02af9b] tw-max-w-[250px] tw-min-w-[180px] tw-text-center tw-rounded-md tw-text-base tw-mr-6'>
            {value[0] === 'phones'
              ? dictionary?.profileView?.phones
              : dictionary?.profileView?.emails}
          </Typography>
          <div className='tw-h-[100%] tw-w-[45%] tw-flex tw-flex-col tw-items-end tw-justify-center '>
            <Button
              onClick={() => {
                if (value[0] === 'phones') {
                  handleAddData('phones');
                } else if (value[0] === 'emails') {
                  handleAddData('emails');
                }
              }}
              color='secondary'
              size='medium'
              startIcon={
                <AddCircleOutlinedIcon
                  style={{
                    color: '#02AF9B',
                    fontSize: '1.4em',
                    marginLeft: '0rem',
                  }}
                />
              }
            >
              <span
                style={{
                  color: '#030124 ',
                  fontSize: '0.6rem',
                  textTransform: 'none',
                }}
              >
                {value[0] === 'phones'
                  ? dictionary?.profileView?.addAnotherPhone
                  : dictionary?.profileView?.addAnotherEmail}{' '}
              </span>
            </Button>
          </div>
        </div>

        <div className='tw-min-h-[125px] tw-pb-3 '>
          {labelArray.map((val, key) => {
            if (index == 'phones' || index == 'emails') {
              const myValue = (user && user.profile
                ? isProUser
                  ? user.profile.professional
                    ? user.profile.professional?.[index]
                    : dataForm && dataForm[index]
                  : user.profile.social
                    ? user.profile?.social?.[index]
                    : dataForm && dataForm[index]
                : dataForm && dataForm[index]) as unknown as DataFormValues;

              // console.log('myVAlueBasic social', myValue);

              return (
                <div
                  key={key}
                  className={`tw-pb-3 ${key !== labelArray.length - 1
                      ? 'tw-border-b tw-border-gray-300 tw-border-t-0 tw-border-x-0 tw-border-solid'
                      : ''
                    }`}
                >
                  <ItemForm
                    label={val.label!}
                    handleSwitch={(e: any) => handleSwitch(e)}
                    handleData={handleData}
                    name={index}
                    checked={val.checked}
                    subindex={key}
                    icon={val.icon}
                    deleteAction={true}
                    handleDeleteData={handleDeleteData}
                    handleModalAlert={({ index, subindex }) =>
                      handleModalAlert({ index, subindex })
                    }
                    myValue={myValue}
                    index={index}
                  />
                </div>
              );
            }
          })}
        </div>

        {/*   <div className='tw-h-[30px] tw-w-[100%] tw-border-t-black tw-border-t-[1px] tw-border-x-0 tw-border-b-0 tw-border-solid tw-flex tw-items-center tw-justify-center '>
          <Button
            onClick={() => {
              if (value[0] === 'phones') {
                handleSeeMore(1);
              } else if (value[0] === 'emails') {
                handleSeeMore(2);
              }
            }}
            color='secondary'
            size='medium'
            endIcon={
              <KeyboardArrowDownOutlinedIcon
                style={{
                  color: '#396593',
                  fontSize: '2.5rem',
                  marginLeft: '-0.7rem',
                }}
              />
            }
          >
            <span
              style={{
                color: '#396593 ',
                fontSize: '0.8rem',
                textTransform: 'none',
              }}
            >
              {dictionary.profileView.buttonSeeMore} (2)
            </span>
          </Button>
        </div> */}
      </div>
      <ModalAlertLimit
        isModalAlertLimit={isModalAlertLimit}
        handleModalAlertLimit={handleModalAlertLimit}
        dictionary={dictionary}
      />
    </div>
  );
};

export default ItemFormBasicInfo;
