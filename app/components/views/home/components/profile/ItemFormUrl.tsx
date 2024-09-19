'use client';
import React, { useState } from 'react';
import { Button, Avatar, Box, Typography } from '@mui/material';
import AddCircleOutlinedIcon from '@mui/icons-material/AddCircleOutlined';
import LinkIcon from '@mui/icons-material/Link';
import { Dictionary } from '@/types/dictionary';
import {
  CareerDataFormValues,
  DataFormValues,
  EducationDataFormValues,
  IndexDataForm,
  NetworksSubIndexDataForm,
  ProfessionalDataForm,
  SocialDataForm,
  handleDataNetworksProps,
  handleDataProps,
} from '@/types/profile';
import Image from 'next/image';
import FormUrl from './FormUrl';
import ModalAlertLimit from './ModalAlertLimit';
import { UserData } from '@/types/user';
import ModalIcons from './ModalIcons';
import LockIcon from '@mui/icons-material/Lock';
import { GetAllLogosImages } from '@/reactQuery/home';

const ItemFormUrl = ({
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
  handleDataNetworks,
  setModalIcons,
  itemUrlKey,
  itemUrlSelected,
  handleModalIcons,
  isModalIcons,
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
  handleDataNetworks: ({
    name,
    text,
    subindex,
    key,
  }: handleDataNetworksProps) => void;
  setModalIcons: (e: any) => void;
  itemUrlKey: number;
  itemUrlSelected: any;
  handleModalIcons: (item: any, key: any) => void;
  isModalIcons: boolean;
  handleDeleteData: () => void;
}) => {

  const { data } = GetAllLogosImages();

  return (
    <div
      className={`${value[0] === 'urls' && itemDetail === 4 && labelArray.length > 1
        ? 'tw-h-[350px]'
        : 'tw-h-[250px]'
        } tw-overflow-y-auto tw-w-[100%] tw-bg-[#E9E9E9] tw-rounded-2xl tw-my-3 tw-py-5`}
    >
      <div
        className={`tw-h-[${labelArray.length * 20
          }px]tw-bg-blue-200 tw-flex tw-flex-col tw-justify-around`}
      >
        <div className='tw-w-[100%]  tw-flex tw-items-center tw-justify-around'>
          <Typography className='tw-text-white tw-bg-[#02af9b] tw-max-w-[250px] tw-min-w-[150px] tw-text-center tw-rounded-md tw-text-base tw-mr-6'>
            {dictionary?.profileView?.url}
          </Typography>
          <div className='tw-h-[100%] tw-w-[45%] tw-flex tw-flex-col tw-items-end tw-justify-center '>
            <Button
              onClick={() => {
                handleAddData('urls');
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
                {dictionary.profileView.addAnotherURL}{' '}
              </span>
            </Button>
          </div>
        </div>

        <div className='tw-min-h-[125px] tw-pb-3 tw-flex tw-flex-col tw-items-end tw-justify-center'>
          <div className='tw-w-[100%] tw-flex tw-flex-col '>
            {labelArray.map((val, key) => {
              const datafilter = data?.find(item => item.name === val.icon);

              if (index == 'urls') {
                const myValue = (user && user.profile
                  ? isProUser
                    ? user.profile.professional
                      ? user.profile.professional?.[index]
                      : dataForm && dataForm[index]
                    : user.profile.social
                      ? user.profile?.social?.[index]
                      : dataForm && dataForm[index]
                  : dataForm && dataForm[index]) as unknown as DataFormValues;

                return (
                  <div
                    key={key}
                    className={`tw-pb-3 ${key !== labelArray.length - 1
                      ? 'tw-border-b-8 tw-border-gray-300 tw-border-t-0 tw-border-x-0 tw-border-solid'
                      : ''
                      }`}
                  >
                    <div
                      className={`tw-h-[100%] tw-w-[100%] tw-flex tw-items-center tw-justify-end `}
                    >
                      <div className='tw-h-[100%] tw-w-[91%] tw-flex tw-flex-col'>
                        <FormUrl
                          label={dictionary.profileView.labelDataName + ': '}
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
                          withCheck={true}
                          subLabel={'name' as NetworksSubIndexDataForm}
                        />
                        <Box
                          sx={{ mb: 1 }}
                          className='tw-w-[90%] tw-flex tw-mt-2 tw-justify-start '
                        >
                          <div className='tw-w-[480px]'>
                            <FormUrl
                              label={
                                dictionary.profileView.labelOptionalUrl + ': '
                              }
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
                              withCheck={false}
                              subLabel={'url' as NetworksSubIndexDataForm}
                            />
                          </div>
                          <div className='tw-h-[20%] tw-w-0 tw-flex tw-flex-col tw-mr-4'>
                            <div className='tw-h-[40%]  tw-w-[100%] tw-flex tw-mt-4 tw-mb-2'>
                              <div className='tw-h-[100%] tw-w-[15%] tw-flex tw-flex-col tw-justify-center tw-items-center '>
                                <div className='tw-h-[100%] tw-w-[15%] tw-flex tw-justify-center tw-items-center '>
                                  <Button
                                    onClick={() => handleModalIcons(val, key)}
                                  >
                                    <Avatar
                                      sx={{
                                        backgroundColor: 'transparent',
                                        width: 38,
                                        height: 38,
                                      }}
                                    >
                                      {datafilter ?
                                        <Image src={datafilter.image} alt={datafilter.name} width={38} height={38} />
                                        :
                                        /* <LockIcon className='tw-text-gray-400' /> */
                                        <LinkIcon style={{ fontSize: 34 }} className='tw-text-gray-400' />
                                      }
                                    </Avatar>
                                  </Button>
                                </div>
                                <div>
                                  <Typography className='tw-text-xs tw-text-center tw-text-gray-500 tw-mt-1 tw-w-[100px]'>
                                    {dictionary.profileView.selectURL}
                                  </Typography>
                                </div>
                              </div>
                            </div>
                          </div>
                        </Box>
                      </div>
                    </div>
                  </div>
                );
              }
            })}
          </div>
        </div>
      </div>

      <ModalAlertLimit
        isModalAlertLimit={isModalAlertLimit}
        handleModalAlertLimit={handleModalAlertLimit}
        dictionary={dictionary}
      />

      <ModalIcons
        isModalIcons={isModalIcons}
        setModalIcons={setModalIcons}
        dictionary={dictionary}
        value={value}
        val={itemUrlSelected}
        keyItem={itemUrlKey}
        handleDataNetworks={handleDataNetworks}
        dataLogos={data}
      />
    </div>
  );
};

export default ItemFormUrl;
