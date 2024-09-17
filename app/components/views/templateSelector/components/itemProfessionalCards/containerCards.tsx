import {
  getPrincipalProfileOrderedByObject,
} from '@/globals/functionsTemplateProfessionalOne';
import {
  DataForm,
  ProfessionalDataForm,
} from '@/types/profile';
import { Box, Grid, Paper, styled } from '@mui/material';
import Container from '@mui/material/Container';
import ItemProfessionalCards from './ItemProfessionalCards';

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

const ContainerCards = ({
  profile,
}: {
  profile: DataForm;
}) => {
  const professionalData = getPrincipalProfileOrderedByObject(
    profile.professional as ProfessionalDataForm,
    'professional'
  );
  return (
    profile.professional && (
      <div className='tw-z-10 tw-flex tw-flex-col tw-content-center tw-items-center tw-mt-1 tw-h-[95%] tw-w-[100%]'>
        <CustomContainer className="tw-z-10 tw-p-0 tw-h-[100%] tw-w-[95%] tw-overflow-y-auto tw-pb-3">
          <Box flexGrow={1}>
            <Grid container spacing={1}>
              {professionalData.finalArray.map((item, key) => (
                <Grid item xs={12} key={key} className='tw-pr-2 tw-pt-3 tw-shadow-[0_0px_05px_05px_rgba(0,0,0,0.1)]'>
                  <Item sx={{ backgroundColor: '#ffffff', p: 2 }}>
                    <ItemProfessionalCards colorText='#396593' item={item} key={key} />
                  </Item>
                </Grid>
              ))}
            </Grid>
          </Box>
        </CustomContainer>
      </div >
    )
  );
};

export default ContainerCards;
