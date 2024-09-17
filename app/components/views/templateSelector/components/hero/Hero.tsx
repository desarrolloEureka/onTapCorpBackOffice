import Container from '@mui/material/Container';
import CustomAvatar from '../avatar/CustomAvatar';
import CustomLogo from '../logoCompany/CustomLogo'
import VerticalColButtons from '../floatingButtons/verticalColButtons/VerticalColButons';

const Hero = ({
  socialNetworks,
  photo,
  photoCompany,
}: {
  socialNetworks: any[];
  photo: string;
  photoCompany: string;
}) => {
  return (
      <Container className='tw-flex tw-flex-col tw-relative tw-w-[100%] tw-h-[30%]'>
        <div style={{ display: 'flex', height: '100%', width: '100%', justifyContent: 'center', alignItems: 'center' }}>
          <div style={{ display: 'flex', height: '100%', width: '50%', justifyContent: 'center', alignItems: 'center', flexDirection: 'column' }}>
            <div style={{ height: '25%', width: '100%' }}>
              <CustomLogo
                image={photoCompany}
              />
            </div>
            <div style={{ height: '65%', width: '100%' }}>
              <CustomAvatar
                image={photo}
                size={150}
              />
            </div>
          </div>
          <div style={{ display: 'flex', height: '100%', width: '50%', justifyContent: 'center', alignItems: 'center' }}>
            <div style={{ display: 'flex', height: '75%', width: '100%', justifyContent: 'center', alignItems: 'center' }}>
              <VerticalColButtons socialNetworks={socialNetworks} />
            </div>
          </div>
        </div>
      </Container>
  );
};

export default Hero;
