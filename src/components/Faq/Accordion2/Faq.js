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
          <Typography sx={{fontFamily: 'Montserrat'}}>Comment ajouter un nouveau livre ?</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography sx={{textAlign:'left',fontFamily: 'Montserrat'}}>
          Pour ajouter un livre, il faut que je me rende dans mon espace enfant, puis je dois cliquer sur la page "recherche", je cherche mon futur livre en tapant son titre dans la barre de recherche et la soit je l'ajoute directement dans la recherche avec le bouton à droite, soit je clique pour voir le livre en detail et je l'ajoute avec les boutons à droite du livre.
          </Typography>
        </AccordionDetails>
      </Accordion>
      <Accordion expanded={expanded === 'panel2'} onChange={handleChange('panel2')}>
        <AccordionSummary aria-controls="panel2d-content" id="panel2d-header">
          <Typography sx={{fontFamily: 'Montserrat'}}>Comment voir mes livres ?</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography sx={{textAlign:'left',fontFamily: 'Montserrat'}}>
          Pour voir un de mes livres, il faut que je me rende dans mon espace enfant, puis je dois cliquer sur la page mes livres. De là je peux trier mes livres soit par auteur ou soit par catégorie.
          Je peux aussi modifier mon livre en cliquant sur le bouton, afin de modifier la catégorie, si j'ai lu le livre ou non et je peux aussi noter le livre.
          </Typography>
        </AccordionDetails>
      </Accordion>
    </div>
  );
}
