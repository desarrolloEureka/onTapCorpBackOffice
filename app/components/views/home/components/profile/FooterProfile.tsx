'use client';
import CustomSwitchGeneral from '@/components/customSwitchGeneral/CustomSwitchGeneral';
import { Dictionary } from '@/types/dictionary';
import { ProfessionalDataForm, SocialDataForm } from '@/types/profile';
import SaveOutlinedIcon from '@mui/icons-material/SaveOutlined';
import { Button, Container } from '@mui/material';

const FooterProfile = ({
  dictionary,
  isProUser,
  handleSendProfile,
  handleSwitchAll,
}: {
  dictionary: Dictionary;
  isProUser: boolean;
  handleSendProfile: (isProUser: boolean) => Promise<void>;
  handleSwitchAll: (val: React.ChangeEvent<HTMLInputElement>) => void;
}) => {
  return (
    <div className='tw-h-[110px] tw-flex tw-items-center tw-justify-center'>
      <Container className='tw-h-[90%] tw-w-[90%] tw-flex tw-items-center tw-justify-center'>
        <div className=' tw-h-[100%] tw-w-[50%] tw-flex tw-flex-col tw-items-start tw-justify-center'>
          <div className=' tw-h-[100%] tw-w-[80%] tw-flex tw-flex-row tw-items-center tw-justify-center'>
            <div className=' tw-h-[100%] max-sm:tw-w-[50%] tw-w-[20%] tw-flex tw-items-center tw-justify-center tw-pt-3 max-md:tw-mr-2'>
              <CustomSwitchGeneral
                name='all_true'
                handleSwitch={(e: any) => handleSwitchAll(e)}
              />
            </div>

            <div className=' tw-h-[100%] max-sm:tw-w-[70%] tw-w-[80%] tw-flex tw-items-center tw-justify-start'>
              <span
                style={{
                  color: '#030124',
                  fontSize: '1rem',
                  textTransform: 'none',
                }}
              >
                {dictionary.profileView.labelSwitchMain}
              </span>
            </div>
          </div>
        </div>
        <div className=' tw-h-[80%] tw-w-[50%] tw-flex  tw-items-end tw-justify-end '>
          <div className='tw-h-[100%] tw-w-[30%] tw-flex tw-flex-col tw-items-center tw-justify-center'>
            <Button
              className='tw-w-[90%] tw-h-[45px]'
              onClick={() => handleSendProfile(isProUser)}
              color='secondary'
              size='medium'
              startIcon={
                <SaveOutlinedIcon
                  style={{
                    color: '#02AF9B',
                    fontSize: '1.8rem',
                    marginLeft: '0rem',
                  }}
                />
              }
            >
              <span
                style={{
                  color: '#030124 ',
                  fontSize: '1.2rem',
                  textTransform: 'none',
                }}
              >
                {dictionary.homeView.saveButtonLabel}
              </span>
            </Button>
          </div>
        </div>
      </Container>
    </div>
  );
};

export default FooterProfile;
