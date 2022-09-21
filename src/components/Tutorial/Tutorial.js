import React from 'react'
import { Box, Typography } from '@mui/material'
import HomeCarousel from '../Home/HomeCarousel/HomeCarousel'

import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';

import Rewards from '../../assets/img/Rewards.png'
import myLibrary from '../../assets/img/myLibrary.png'
import kids from '../../assets/img/kids.jpg'

import './Tutorial.scss';

function Tutorial() {
  return (
    <div>
      
      <HomeCarousel />
        <Box sx={{m:10,  width: {xs:"100%", lg: "70%"}, m:'auto'}}>
          <Typography sx={{ mt: 3, mb: 3, fontFamily: 'Montserrat', fontWeight: 700, fontSize: 40, letterSpacing: 2, color: '#4462A5' }}>
              Tutoriel
          </Typography>

    {/* Image à droite */}
      <Card sx={{display: 'flex',
                 flexDirection: {xs:'column', lg:'row'},
                 justifyContent:{lg:'space-between'},
                 AlignItems: {xs:'center'}, 
                 ml:'auto', mr:'auto', mb:{ lg:10}, height:{ lg:'auto'},
                 borderRadius: '16px', borderColor:  '#4462A5', border: 2,
                 width: {xs:'90%', lg:"80%"}
                 }}>

        <Box sx={{ display: 'flex', flexDirection: 'column', textAlign:'center', width:{xs:"100%", lg:'50%'}}}>
          <CardContent sx={{ flex: '1 0 auto', AlignItem:'center'}}>
            <Typography component="div" variant="h5" textAlign='center'>
            Ajouter un espace enfant
            </Typography>
            <Typography sx={{ mt: 3, mb: 3, fontFamily: 'Montserrat', fontWeight: 350, fontSize: 15, letterSpacing: 2 }}>
            Une fois inscrit, il suffit de vous connecter à votre espace personnel, puis sélectionner votre profil utilisateur. Une fois dans votre espace, cliquez sur le bouton « ajouter un espace enfant ». Vous devrez donner un nom (unique) et un mot de passe pour cet enfant.
            </Typography>

            <Typography sx={{ mt: 3, mb: 3, fontFamily: 'Montserrat', fontWeight: 350, fontSize: 15, letterSpacing: 2 }}>

            Et voilà le tour est joué. Votre enfant a déjà un espace qui l’attend.
            </Typography>

            <Typography sx={{ mt: 3, mb: 3, fontFamily: 'Montserrat', fontWeight: 350, fontSize: 15, letterSpacing: 2 }}>

            Bon à savoir : vous êtes le seul garant de son identifiant et de son mot de passe. Si vous souhaitez lui communiquer, il pourra se connecter en toute autonomie dans l’espace enfant depuis la page d’accueil, sinon vous serez le seul détenteur de son espace et il ne pourra le consulter qu’en votre présence. A vous de voir le choix le plus adapté à votre famille.

            </Typography>
          </CardContent>
        
      </Box>
        <Box sx={{ width:{xs:"100%", lg:'50%'}, height:{xs:"50%", lg:'100%'}, display:'flex',alignSelf:'center'  }}>
          <CardMedia
            component="img"
            sx={{ height: '100%', padding:"auto"}}
            image={kids}
            alt="tutoriel"
            />
        </Box>
      </Card>
  
    {/* Image à Gauche */}

      <Card sx={{display: 'flex',
                 flexDirection: {xs:'column', lg:'row-reverse'},
                 justifyContent:{lg:'space-between'},
                  AlignItems: {xs:'center'}, 
                  ml:'auto', mr:'auto', mb:{ lg:10}, height:{ lg:'auto'},
                  borderRadius: '16px', borderColor:  '#4462A5', border: 2,
                  width: {xs:'90%', lg:"80%"}
                  }}>
        <Box sx={{ display: 'flex', flexDirection: 'column', textAlign:'center', width:{xs:"100%", lg:'50%'}}}>
          <CardContent sx={{ flex: '1 0 auto', AlignItem:'center' }}>
            <Typography component="div" variant="h5" textAlign='center'>
            Consulter ses livres
            </Typography>
            <Typography sx={{ mt: 3, mb: 3, fontFamily: 'Montserrat', fontWeight: 350, fontSize: 15, letterSpacing: 2 }}>
            Il suffit d’aller dans l’espace enfant puis de cliquer sur “mes livres”. Vous aurez la possibilité de filtrer tous les livres ou d’en afficher qu’une partie avec les filtres proposés (livres lus, liste d’envie, par auteur, collection ou catégorie)

            </Typography>
          </CardContent>
        
      </Box>
      <Box sx={{ width:{xs:"100%", lg:'50%'}, height:{xs:"50%", lg:'100%'}, display:'flex',alignSelf:'center'}}>
          <CardMedia
            component="img"
            sx={{ height: '100%'}}
            image={myLibrary}
            alt="tutoriel"/>
        </Box>
      </Card>


      {/* Image à droite */}
      <Card sx={{display: 'flex',
                  flexDirection: {xs:'column', lg:'row'},
                  justifyContent:{lg:'space-between'},
                  AlignItems: {xs:'center'}, 
                  ml:'auto', mr:'auto', mb:{ lg:10}, height:{ lg:'auto'},
                  borderRadius: '16px', borderColor:  '#4462A5', border: 2,
                  width: {xs:'90%', lg:"80%"}
                  }}>

        <Box sx={{ display: 'flex', flexDirection: 'column', textAlign:'center', width:{xs:"100%", lg:'50%'}}}>
          <CardContent sx={{ flex: '1 0 auto', AlignItem:'center' }}>
            <Typography component="div" variant="h5" textAlign='center'>
            Comment gagner une récompense ?

            </Typography>
            <Typography sx={{ mt: 3, mb: 3, fontFamily: 'Montserrat', fontWeight: 350, fontSize: 15, letterSpacing: 2 }}>
            Il suffit de lire un livre ! Vous n’aurez plus qu'à aller dans l’espace ajouter un livre et le rechercher par son titre. Enfin sélectionnez celui qui correspond à la lecture et faites « ajouter à mes livres lus ». Si le prochain palier est atteint, une récompense sera ajoutée automatiquement dans la section récompenses de l’enfant.
            La barre de progression est visible dès la page d’accueil de l’espace enfant.
            </Typography>

          </CardContent>
        
      </Box>
        <Box sx={{ width:{xs:"100%", lg:'50%'}, height:{xs:"50%", lg:'100%'}, display:'flex',alignSelf:'center'  }}>
          <CardMedia
            component="img"
            sx={{ height: '100%', padding:"auto"}}
            image= {Rewards}
            alt="tutoriel"
            />
        </Box>
      </Card>


    
   </Box>
  </div>

  )
}

export default Tutorial