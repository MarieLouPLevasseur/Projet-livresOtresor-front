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
          <Typography sx={{fontFamily: 'Montserrat'}}>Comment me rendre sur mon profil enfant ?</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography sx={{textAlign:'left',fontFamily: 'Montserrat'}}>
          Pour cela, il suffit de cliquez "Enfant", me connecter avec les identifiants que mon parent m'a donné et hop nous sommes sur notre profil !
          </Typography>
        </AccordionDetails>
      </Accordion>
      <Accordion expanded={expanded === 'panel2'} onChange={handleChange('panel2')}>
        <AccordionSummary aria-controls="panel2d-content" id="panel2d-header">
          <Typography sx={{fontFamily: 'Montserrat'}}>Que me montre ma page de profil ?</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography sx={{textAlign:'left',fontFamily: 'Montserrat'}}>
          Dans ma page de profil, je peux trouver mon dernier livre ajouté avec ses détails et ma barre de progression pour avoir la prochaine récompense.
          </Typography>
        </AccordionDetails>
      </Accordion>
      <Accordion expanded={expanded === 'panel3'} onChange={handleChange('panel3')}>
        <AccordionSummary aria-controls="panel3d-content" id="panel3d-header">
          <Typography sx={{fontFamily: 'Montserrat'}}>Comment me deplacer une fois arriver dans sur mon profil ?</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography sx={{fontFamily: 'Montserrat', textAlign:'left'}}>
          Pour me déplacer dans mon espace, il y a à ma disposition diffèrents boutons qui me permette de me deplacer dans l'espece. Je peux aller soit dans mes livres que j'ai deja ajouté, soit sur la page avec les récompenses que j'ai débloqué ou soit dans la page de recherche que j'utiliserai pour ajouter un nouveau livre dans mon espace.
          </Typography>
        </AccordionDetails>
      </Accordion>
      <Accordion expanded={expanded === 'panel4'} onChange={handleChange('panel4')}>
        <AccordionSummary aria-controls="panel4d-content" id="panel4d-header">
          <Typography sx={{fontFamily: 'Montserrat'}}>Y-a-t-il un espace d’échange entre enfant ?</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography sx={{fontFamily: 'Montserrat', textAlign:'left'}}>
          Non. Tout ce qui est dans votre compte est strictement personnel et ne regarde que vous et vos enfants. Nous ne partageons pas les données recueillies. Il n'y a aucun espace de chat ou de forum.
          </Typography>
        </AccordionDetails>
      </Accordion>
    </div>
  );
}
