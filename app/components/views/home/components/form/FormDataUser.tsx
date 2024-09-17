'use client';
import { Dictionary } from '@/types/dictionary';
import {
  DataFormValues,
  ProfessionalDataForm,
  SocialDataForm,
  handleDataProps,
} from '@/types/profile';
import { UserData } from '@/types/user';
import { FormGroup, Typography } from '@mui/material';
import { Box } from '@mui/system';
import ItemForm from '../profile/ItemForm';
import TextAreaForm from '../profile/TextAreaForm';

const FormDataUser = ({
  dictionary,
  handleDataSet,
  isProUser,
  dataForm,
  data,
  handleData,
  user,
  handleSwitch,
}: // dataForm left data form to profile,
  {
    dictionary: Dictionary;
    dataForm: SocialDataForm | ProfessionalDataForm;
    handleDataSet: (e: SocialDataForm | ProfessionalDataForm) => void;
    isProUser: boolean;
    data: [string, any][];
    handleData: ({
      name,
      text,
      subindex,
      key,
      currentDataRef,
    }: handleDataProps) => void;
    user: UserData;
    handleSwitch: (e: any) => void;
  }) => {

  return (
    <div className='tw-h-auto lg:tw-w-[50%] md:tw-w-[100%] tw-flex tw-flex-col tw-items-center tw-mt-6'>
      <div className='tw-h-[100%] tw-w-full tw-flex tw-flex-col'>
        <FormGroup sx={{ m: 1, mt: 1 }}>
          <Box className='tw-bg-[#e9e9e9] tw-rounded-xl tw-mt-3'>
            <Typography className='tw-text-white tw-bg-[#02af9b] tw-w-[150px] tw-text-center tw-rounded-md tw-text-base tw-mt-3 tw-ml-10'>
              {dictionary.homeView.labelPersonalData}
            </Typography>
            {data.map((value, key) => {
              const index = value[0] as keyof typeof dataForm;
              if (
                index == 'name' ||
                index == 'last_name' ||
                index == 'profession' ||
                index == 'occupation' ||
                index == 'address'
              ) {
                const myValue = (user && user.profile
                  ? isProUser
                    ? user.profile.professional?.[index]
                    : user.profile?.social?.[index]
                  : dataForm && dataForm[index]) as unknown as DataFormValues;
                return (
                  <ItemForm
                    label={value[1].label}
                    handleSwitch={(e: any) => handleSwitch(e)}
                    handleData={handleData}
                    name={index}
                    checked={value[1].checked}
                    key={key}
                    icon={value[1].icon}
                    myValue={myValue}
                    index={index}
                  />
                );
                // }
              }
            })}
          </Box>
          {isProUser && (
            <Box className='tw-bg-[#e9e9e9] tw-rounded-xl tw-mt-3 tw-mb-5 tw-pb-5'>
              <Typography className='tw-text-white tw-bg-[#02af9b] tw-w-[150px] tw-text-center tw-rounded-md tw-text-base tw-mt-3 tw-ml-10'>
                {dictionary.homeView.labelProfessionalData}
              </Typography>
              {data.map((value, key) => {
                if (
                  !Array.isArray(value[1]) &&
                  (value[0] == 'company' ||
                    value[0] == 'position')
                ) {
                  const index = value[0] as keyof typeof dataForm;
                  const myValue = (user && user.profile
                    ? isProUser
                      ? user.profile.professional?.[index]
                      : user.profile?.social?.[index]
                    : dataForm && dataForm[index]) as unknown as DataFormValues;

                  return (
                    <ItemForm
                      label={value[1].label}
                      handleSwitch={(e: any) => handleSwitch(e)}
                      handleData={handleData}
                      name={index}
                      checked={value[1].checked}
                      key={key}
                      icon={value[1].icon}
                      myValue={myValue}
                      index={index}
                    />
                  );
                } else if (
                  value[0] == 'professional_profile' ||
                  value[0] == 'other_competencies' ||
                  value[0] == 'skills' ||
                  value[0] == 'languages' ||
                  value[0] == 'achievements_recognitions'
                ) {
                  const index = value[0] as keyof typeof dataForm;
                  const myValue = (user && user.profile
                    ? isProUser
                      ? user.profile.professional?.[index]
                      : user.profile?.social?.[index]
                    : dataForm && dataForm[index]) as unknown as DataFormValues;

                  return (
                    <TextAreaForm
                      label={value[1].label}
                      handleSwitch={(e: any) => handleSwitch(e)}
                      handleData={handleData}
                      name={index}
                      checked={value[1].checked}
                      key={key}
                      icon={value[1].icon}
                      myValue={myValue}
                      index={index}
                    />
                  );
                }
              })}
            </Box>
          )}
        </FormGroup>
      </div>
    </div>
  );
};

export default FormDataUser;