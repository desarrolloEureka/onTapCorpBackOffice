import Container from '@mui/material/Container';
import CustomAvatar from '../avatar/CustomAvatar';
import CustomLogo from '../logoCompany/CustomLogo'
import VerticalColButtons from '../floatingButtons/verticalColButtons/VerticalColButons';

const Hero = ({
  userData,
  socialNetworks,
  photo,
  photoCompany,
}: {
  userData: any;
  socialNetworks: any[];
  photo: string;
  photoCompany: string;
}) => {
  return (
    <Container className='tw-flex tw-flex-col tw-relative tw-w-[100%] tw-h-[27%]'>
      <div style={{ display: 'flex', height: '100%', width: '100%', justifyContent: 'center', alignItems: 'center' }}>
        <div style={{ display: 'flex', height: '100%', width: '50%', justifyContent: 'space-around', alignItems: 'center', flexDirection: 'column' }}>
          <CustomLogo
            image={photoCompany}
          />
          <CustomAvatar
            image={photo}
          />
        </div>
        <div style={{ display: 'flex', height: '100%', width: '50%', justifyContent: 'center', alignItems: 'center' }}>
            <VerticalColButtons socialNetworks={socialNetworks} userData={userData} />
        </div>
      </div>
    </Container>
  );
};

export default Hero;
