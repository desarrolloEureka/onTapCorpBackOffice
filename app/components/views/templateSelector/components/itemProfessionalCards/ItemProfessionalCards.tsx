import { CareerDataFormValues, DataFormValues } from '@/types/profile';
import { Box, Typography } from '@mui/material';
import Carousel from 'react-material-ui-carousel';
import { EducationDataFormValues } from '../../../../types/profile';
import EmailOutlinedIcon from '@mui/icons-material/EmailOutlined';
import ExploreOutlinedIcon from '@mui/icons-material/ExploreOutlined';
import FilePresentOutlinedIcon from '@mui/icons-material/FilePresentOutlined';
import LocalPhoneOutlinedIcon from '@mui/icons-material/LocalPhoneOutlined';
import WorkOutlineOutlinedIcon from '@mui/icons-material/WorkOutlineOutlined';
import SchoolOutlinedIcon from '@mui/icons-material/SchoolOutlined';
import PersonOutlinedIcon from '@mui/icons-material/PersonOutlined';
import AccessibilityOutlinedIcon from '@mui/icons-material/AccessibilityOutlined';
import AttachFileOutlinedIcon from '@mui/icons-material/AttachFileOutlined';

const ItemProfessionalCards = ({
  item,
  colorText
}: {
  item: DataFormValues[] | EducationDataFormValues[] | CareerDataFormValues[]; colorText: string
}) => {
  return item[0].order == 11 || item[0].order == 12 ? (
    <Carousel height={80} autoPlay={false} navButtonsAlwaysInvisible>
      {item.map((value, key) => {
        const valEducation = (value.order == 11 &&
          value) as EducationDataFormValues;
        const valProfession = (value.order == 12 &&
          value) as CareerDataFormValues;

        return (
          <div key={key}>
            <Box sx={{ display: 'flex', color: 'white' }}>
              {value.order == 11 ? (
                <SchoolOutlinedIcon className='tw-text-base -tw-ml-[2px] tw-mr-1' />
              ) : (
                value.order == 12 && (
                  <WorkOutlineOutlinedIcon className='tw-text-base -tw-ml-[2px] tw-mr-1' />
                )
              )}
              <Typography
                className='tw-text-xs tw-truncate tw-mb-3 tw-font-bold tw-capitalize truncate'
                color={'white'}
                textAlign={'left'}
              >
                {value.label === 'education' ? 'Educación' : value.label === 'professional_career' ? 'Carrera Profesional' : value.label}
              </Typography>
            </Box>
            {value.order == 11 && (
              <>
                <Typography
                  className='tw-text-xs tw-font-bold truncate'
                  textAlign={'left'}
                  color={'black'}
                >
                  Titulo: {valEducation.title}
                </Typography>
                <Typography
                  className='tw-text-xs tw-font-bold truncate'
                  textAlign={'left'}
                  color={'black'}
                >
                  Institución: {valEducation.institution}
                </Typography>
                <Typography
                  className='tw-text-xs tw-font-bold truncate'
                  textAlign={'left'}
                  color={'black'}
                >
                  Año: {valEducation.year}
                </Typography>
              </>
            )}
            {value.order == 12 && (
              <>
                <Typography
                  className='tw-text-xs tw-font-bold truncate'
                  textAlign={'left'}
                  color={'black'}
                >
                  Empresa: {valProfession.company}
                </Typography>
                <Typography
                  className='tw-text-xs tw-font-bold truncate'
                  textAlign={'left'}
                  color={'black'}
                >
                  Cargo: {valProfession.position}
                </Typography>
                <Typography
                  className='tw-text-xs tw-font-bold truncate'
                  textAlign={'left'}
                  color={'black'}
                >
                  Inicio: {valProfession.data_init}
                </Typography>
                <Typography
                  className='tw-text-xs tw-font-bold truncate'
                  textAlign={'left'}
                  color={'black'}
                >
                  Fin: {valProfession.data_end}
                </Typography>
              </>
            )}
          </div>
        );
      })}
    </Carousel>
  ) : (
    item.map((value, key) => {
      const text = value as DataFormValues;
      return (
        <div key={key}>
          <Box sx={{ display: 'flex', color: colorText }}>{/* white */}
            {value.order == 6 || value.order == 16 ? (
              <WorkOutlineOutlinedIcon className='tw-text-base -tw-ml-[2px] tw-mr-1' />
            ) : value.order == 15 || value.order == 8 ? (
              <PersonOutlinedIcon className='tw-text-base -tw-ml-[2px] tw-mr-1' />
            ) : value.order == 14 || value.order == 17 ? (
              <AccessibilityOutlinedIcon className='tw-text-base -tw-ml-[2px] tw-mr-1' />
            ) : value.order == 1 ? (
              <SchoolOutlinedIcon className='tw-text-base -tw-ml-[2px] tw-mr-1' />
            ) : (
              value.order == 7 && (
                <AttachFileOutlinedIcon className='tw-text-base -tw-ml-[2px] tw-mr-1' />
              )
            )}
            <Typography
              className='tw-w-[170px] tw-text-xs tw-mb-3 tw-font-bold tw-capitalize tw-truncate'
              color={colorText}//white
              textAlign={'left'}
            >
              {text.label === 'name' ? 'Nombres' :
                text.label === 'last_name' ? 'Apellidos' :
                  text.label === 'profession' ? 'Profesión' :
                    text.label === 'occupation' ? 'Ocupación' :
                      text.label === 'address' ? 'Dirección' :
                        text.label === 'company' ? 'Empresa' :
                          text.label === 'position' ? 'Cargo' :
                            text.label === 'professional_profile' ? 'Perfil Profesional' :
                              text.label === 'other_competencies' ? 'Otras Competencias' :
                                text.label === 'skills' ? 'Habilidades' :
                                  text.label === 'languages' ? 'Idiomas' :
                                    text.label === 'achievements_recognitions' ? 'Logros y reconocimientos' :
                                      text.label === 'phones' ? 'Telefono' :
                                        text.label === 'emails' ? 'Correo' :
                                          text.label === 'urls' ? 'urls' :
                                            text.label}
            </Typography>
          </Box>
          <Typography
            className='tw-text-xs tw-font-bold truncate'
            textAlign={'left'}
            color={'black'}
          >
            {text.text}
          </Typography>
        </div>
      );
    })
  );
};

export default ItemProfessionalCards;
