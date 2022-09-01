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
          <Typography sx={{fontFamily: 'Montserrat'}}>Comment voir le profil d'un enfant ?</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography sx={{fontFamily: 'Montserrat', textAlign:'left'}}>
          Pour voir le profil d'un enfant, il suffit de se rendre sur l'espace parent, de choisir le profil que vous voulez regarder et de cliquez sur le premier bouton sur le droite.
          </Typography>
        </AccordionDetails>
      </Accordion>
      <Accordion expanded={expanded === 'panel2'} onChange={handleChange('panel2')}>
        <AccordionSummary aria-controls="panel2d-content" id="panel2d-header">
          <Typography sx={{fontFamily: 'Montserrat'}}>Comment modifier mes informations ?</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography sx={{textAlign:'left',fontFamily: 'Montserrat'}}>
          Pour modifier ses informations , il suffit d'aller dans l'espace parent puis d'aller dans votre profil et dans la gestion des comptes d'entrer les nouvelles informations dans les champs que vous voulez modifier puis cliquez sur le bouton valider à droite.
          </Typography>
        </AccordionDetails>
      </Accordion>
      <Accordion expanded={expanded === 'panel3'} onChange={handleChange('panel3')}>
        <AccordionSummary aria-controls="panel3d-content" id="panel3d-header">
          <Typography sx={{fontFamily: 'Montserrat'}}>Comment modifier les informations d'un enfant ?</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography sx={{textAlign:'left',fontFamily: 'Montserrat'}}>
          Pour modifier ses informations , il suffit d'aller dans l'espace parent puis d'aller dans votre profil et dans la gestion des comptes de descendre jusqu'au niveau du profil enfant que vous voulez modifier, entrez les nouvelles informations dans les champs que vous voulez modifier puis cliquez sur le bouton valider à droite.
          </Typography>
        </AccordionDetails>
      </Accordion>
      <Accordion expanded={expanded === 'panel4'} onChange={handleChange('panel4')}>
        <AccordionSummary aria-controls="panel4d-content" id="panel4d-header">
          <Typography sx={{fontFamily: 'Montserrat'}}>Comment créer un compte pour un enfant ?</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography sx={{textAlign:'left',fontFamily: 'Montserrat'}}>
          Pour cela, allez dans l'espace parent puis d'aller dans votre profil et dans la gestion des comptes, decendez jusqu'au compartiment "créer un enfant". Rentrez les informations de l'enfant, puis cliquez sur le bouton à droite pour valider.
          </Typography>
        </AccordionDetails>
      </Accordion>
      <Accordion expanded={expanded === 'panel5'} onChange={handleChange('panel5')}>
        <AccordionSummary aria-controls="panel5d-content" id="panel5d-header">
          <Typography sx={{fontFamily: 'Montserrat'}}>Comment supprimer un compte ?</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography sx={{fontFamily: 'Montserrat', textAlign:'left'}}>
          Pour supprimer un compte enfant, il vous suffit de vous connecter à votre espace parent puis d'aller dans votre profil et dans la gestion des comptes. Sélectionner le profil enfant à détruire en cliquant sur le bouton de suppression associé. Attention, la suppression est définitive et entraînera la suppression des livres associés à l'enfant. 
          Si vous supprimez le compte parent tous les espaces enfants seront automatiquement detruit.
          </Typography>
        </AccordionDetails>
      </Accordion>
    </div>
  );
}
