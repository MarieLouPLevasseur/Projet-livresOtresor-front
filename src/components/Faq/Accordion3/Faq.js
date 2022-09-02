import * as React from 'react';
import { styled } from '@mui/material/styles';
import ArrowForwardIosSharpIcon from '@mui/icons-material/ArrowForwardIosSharp';
import MuiAccordion from '@mui/material/Accordion';
import MuiAccordionSummary from '@mui/material/AccordionSummary';
import MuiAccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';

import './Faq.scss';

const Accordion = styled((props) => (
  <MuiAccordion disableGutters elevation={0} square {...props} />
))(({ theme }) => ({
  border: `1px solid ${theme.palette.divider}`,
  '&:not(:last-child)': {
    borderBottom: 0,
  },
  '&:before': {
    display: 'none',
  },
}));

const AccordionSummary = styled((props) => (
  <MuiAccordionSummary
    expandIcon={<ArrowForwardIosSharpIcon sx={{ fontSize: '0.9rem' }} />}
    {...props}
  />
))(({ theme }) => ({
  backgroundColor:
    theme.palette.mode === 'dark'
      ? 'rgba(255, 255, 255, .05)'
      : 'rgba(0, 0, 0, .03)',
  flexDirection: 'row-reverse',
  '& .MuiAccordionSummary-expandIconWrapper.Mui-expanded': {
    transform: 'rotate(90deg)',
  },
  '& .MuiAccordionSummary-content': {
    marginLeft: theme.spacing(1),
  },
}));

const AccordionDetails = styled(MuiAccordionDetails)(({ theme }) => ({
  padding: theme.spacing(2),
  borderTop: '1px solid rgba(0, 0, 0, .125)',
}));

export default function CustomizedAccordions() {
  const [expanded, setExpanded] = React.useState('');

  const handleChange = (panel) => (event, newExpanded) => {
    setExpanded(newExpanded ? panel : false);
  };

  return (
    <div className='faq'>
      <Accordion expanded={expanded === 'panel1'} onChange={handleChange('panel1')}>
        <AccordionSummary aria-controls="panel1d-content" id="panel1d-header">
          <Typography sx={{fontFamily: 'Montserrat'}}>Ou trouver mes récompenses ?</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography sx={{textAlign:'left',fontFamily: 'Montserrat'}}>
          Pour trouver mes récompenses c'est très simple, je vais dans mon espace enfant, je clique sur le bouton "mes récompenses" et hop la liste de mes récompenses va s'afficher !
          </Typography>
        </AccordionDetails>
      </Accordion>
      <Accordion expanded={expanded === 'panel2'} onChange={handleChange('panel2')}>
        <AccordionSummary aria-controls="panel2d-content" id="panel2d-header">
          <Typography sx={{fontFamily: 'Montserrat'}}>Comment fonctionne les récompenses ?</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography sx={{textAlign:'left',fontFamily: 'Montserrat'}}>
          Lorsque l'enfant enregistre un nouveau livre « lu », cela augmente son total de livres. En fonction des différents paliers de récompenses, votre enfant gagne une petite image lorsque le pallier supérieur est atteint. Il n'y a ni gain, ni achat. Il pourra toutefois changer les petits avatars gagnés sur son espace ou imprimer ses diplômes récompenses s'il le souhaite.
          </Typography>
        </AccordionDetails>
      </Accordion>
      <Accordion expanded={expanded === 'panel3'} onChange={handleChange('panel3')}>
        <AccordionSummary aria-controls="panel3d-content" id="panel3d-header">
          <Typography sx={{fontFamily: 'Montserrat'}}>Comment changer mon avatar ?</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography sx={{fontFamily: 'Montserrat', textAlign:'left'}}>
          Pour changer mon avatar, il suffit de me rendre sur mon profil puis de cliquer sur mes récompenses et de cliquer ensuite sur l'avatar qui me convient et hop l'image de mon profil se change comme par magie !
          </Typography>
        </AccordionDetails>
      </Accordion>
    </div>
  );
}
