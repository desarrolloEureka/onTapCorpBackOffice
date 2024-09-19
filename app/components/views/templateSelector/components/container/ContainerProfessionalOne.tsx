import {
  getPrincipalDataSlide,
  getPrincipalProfileOrderedByObject,
} from '@/globals/functionsTemplateProfessionalOne';
import {
  DataForm,
  DataFormValues,
  ProfessionalDataForm,
} from '@/types/profile';
import { Box, Grid, Paper, styled } from '@mui/material';
import Container from '@mui/material/Container';
import SaveContactButton from '../saveContactButton/SaveContactButton';
import ItemSlideProfessional from '../itemSlideProfessional/ItemSlideProfessional';
import ItemProfessionalCards from '../itemProfessionalCards/ItemProfessionalCards';

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: theme.palette.text.secondary,
}));

const CustomContainer = styled(Container)`
  &::-webkit-scrollbar {
    width: 5px;
  }

  &::-webkit-scrollbar-track {
    background: transparent;
  }

  &::-webkit-scrollbar-thumb {
    background: #888;
    border-radius: 10px;
    border: 3px solid #6c6c6c;
  }

  &::-webkit-scrollbar-thumb:hover {
    background: #555;
  }
`;

const CustomHorizontalContainer = styled(Container)`
  &::-webkit-scrollbar {
    height: 5px;
  }

  &::-webkit-scrollbar-track {
    background: transparent;
  }

  &::-webkit-scrollbar-thumb {
    background: #888;
    border-radius: 10px;
    border: 3px solid #7a7a7a;
  }

  &::-webkit-scrollbar-thumb:hover {
    background: #555;
  }
`;


const TemplateContainerProfessionalOne = ({
  profile,
}: {
  profile: DataForm;
}) => {
  const principalData = getPrincipalDataSlide(
    profile.professional as ProfessionalDataForm,
    'professional'
  );
  const professionalData = getPrincipalProfileOrderedByObject(
    profile.professional as ProfessionalDataForm,
    'professional'
  );
  return (
    profile.professional && (
      <Container className='tw-z-10 tw-flex tw-flex-col tw-content-center tw-items-center tw-mt-1 tw-h-[55%]'>

        <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '15%', width: '100%', position: 'relative' }}>
          <SaveContactButton profile={profile.professional} />
        </Box>

        <Container className='tw-flex tw-p-0 tw-overflow-scroll tw-z-10 no-scrollbar' style={{ height: '15%' }}>
          <div style={{ height: '60%', width: '100%' }}>
            <CustomHorizontalContainer className="tw-flex tw-p-0 tw-overflow-scroll tw-z-10 tw-overflow-y-hidden tw-py-1 " style={{ transform: 'rotateX(180deg)' }}>
              <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'start' }} style={{ transform: 'rotateX(180deg)' }}>
                {principalData.map((item, key) => {
                  return (
                    <ItemSlideProfessional
                      item={item as DataFormValues[]}
                      index={key}
                      key={key}
                    />
                  );
                })}
              </Box>
            </CustomHorizontalContainer>
          </div>
        </Container>

        <CustomContainer className="tw-z-10 tw-rounded-md tw-p-0 tw-h-[70%] tw-overflow-y-auto tw-pb-3">
          <Box flexGrow={1}>
            <Grid container spacing={1}>
              {professionalData.finalArray.map((item, key) => (
                <Grid item xs={12} key={key} className='tw-pr-1 tw-pt-3 tw-shadow-[0_0px_05px_05px_rgba(0,0,0,0.1)]'>
                  <Item sx={{ backgroundColor: '#679a88', p: 2 }}>
                    <ItemProfessionalCards colorText='#ffffff' item={item} key={key} />
                  </Item>
                </Grid>
              ))}
            </Grid>
          </Box>
        </CustomContainer>
      </Container >
    )
  );
};

export default TemplateContainerProfessionalOne;
