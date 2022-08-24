import * as React from 'react';
import { styled } from '@mui/material/styles';
import ArrowForwardIosSharpIcon from '@mui/icons-material/ArrowForwardIosSharp';
import MuiAccordion from '@mui/material/Accordion';
import MuiAccordionSummary from '@mui/material/AccordionSummary';
import MuiAccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';

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
  const [expanded, setExpanded] = React.useState('panel1');

  const handleChange = (panel) => (event, newExpanded) => {
    setExpanded(newExpanded ? panel : false);
  };

  return (
    <div>
      <Accordion expanded={expanded === 'panel1'} onChange={handleChange('panel1')}>
        <AccordionSummary aria-controls="panel1d-content" id="panel1d-header">
          <Typography>Comment m’inscrire ?</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography sx={{textAlign:'left'}}>
          C’est très simple il suffit de cliquer sur le lien « s’inscrire » dans la barre de navigation sur le haut du site. Vous devrez indiquer avec un email valide et un mot de passe. L’enfant n’est pas autorisé à se créer un compte directement en son nom, l’inscription ne se fait qu’un par un adulte. Et voilà vous êtes connecté.
          </Typography>
        </AccordionDetails>
      </Accordion>
      <Accordion expanded={expanded === 'panel2'} onChange={handleChange('panel2')}>
        <AccordionSummary aria-controls="panel2d-content" id="panel2d-header">
          <Typography>L’enfant peut-il se connecter directement sur le site ?</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography sx={{textAlign:'left'}}>
          L’enfant peut se connecter via le lien « enfant » dans la barre de navigation sur le haut du site avec l’autorisation de son parent qui lui aura fourni son « nom » et son « mot de passe ». Ces informations sont créer lors de la création de son espace enfant dans le compte adulte.
          </Typography>
        </AccordionDetails>
      </Accordion>
      <Accordion expanded={expanded === 'panel3'} onChange={handleChange('panel3')}>
        <AccordionSummary aria-controls="panel3d-content" id="panel3d-header">
          <Typography>Comment supprimer un compte ?</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography sx={{textAlign:'left'}}>
          Pour supprimer un compte, il vous suffit de vous connecter à votre espace puis d'aller dans votre profil et la gestion des comptes. Sélectionner le profil à détruire en cliquant sur le bouton de suppression associé. Attention, la suppression est définitive et entraînera la suppression des livres associés. Il en va de même pour votre espace adulte qui supprimera automatiquement les espaces enfants.
          </Typography>
        </AccordionDetails>
      </Accordion>
    </div>
  );
}
