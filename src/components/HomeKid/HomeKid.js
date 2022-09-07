import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { Box, Rating, Typography, Avatar } from '@mui/material'
import { useDispatch, useSelector } from 'react-redux';

import HomeCarousel from '../Home/HomeCarousel/HomeCarousel';
import HomeKidButtons from './HomeKidButtons/HomeKidButtons';
import HomeKidProgressBar from './HomeKidProgressBar/HomeKidProgressBar';
import Loading from '../Loading/Loading';

import './HomeKid.scss';

function HomeKid() {

  // TODO créer une condition: si le state.kid.token est vide 
    // TODO : alors il n'y a pas d'enfant c'est un utilisateur parent qui est connecté
    // TODO : utilisation de state.user.kidId / kidAvatar / kidUsername  dans le state adulte dans les variable

//     if (je suis un user){
//       const token = useSelector((state) => state.user.token);
//   const username = useSelector((state) => state.user.KidUsername);
//   const avatar = useSelector((state) => state.user.avatar);
//   const id = useSelector((state) => state.user.kidId)
//     }
// else{ je suis un kid
  // Redux-toolkit state import
  const apiUrl = useSelector((state) => state.api.apiUrl);
  const token = useSelector((state) => state.kid.token);
  const username = useSelector((state) => state.kid.username);
  const avatar = useSelector((state) => state.kid.avatar);
  const id = useSelector((state) => state.kid.id)
// }

  // Local States
  const [progressValue, setProgressValue] = useState("");
  const [lastBookValue, setLastBookValue] = useState("");
  const [loadingLastBookValue, setLoadingLastBookValue] = useState(true);
  const [loadingProgressValue, setLoadingProgressValue] = useState(true);

  // Api Calls
  const apiEndpointProgress = `/api/v1/kids/${id}/books/progress_bar`
  const apiEndpointLastBook = `/api/v1/kids/${id}/books/last_read`

  useEffect(() => {
    if(id){
    axios.get(apiUrl + apiEndpointProgress, {headers : {
      'Authorization': `Bearer ${token}`
    }
    })
    .then((response) => {
      console.log(response.data)
      setProgressValue(response.data);
      setLoadingProgressValue(false)
    })
    .catch((error) => {
      console.log('Erreur !', error);
    })

    axios.get(apiUrl + apiEndpointLastBook, {headers : {
      'Authorization': `Bearer ${token}`
    }
    })
    .then((response) => {
      console.log(response.data)
      setLastBookValue(response.data);
      setLoadingLastBookValue(false)
    })
    .catch((error) => {
      console.log('Erreur !', error);
    })
  }
  }, [id]);
  
if (loadingLastBookValue || loadingProgressValue) {
  return <Loading/>
}
  return (
    <div className='homeKid'>
      <HomeCarousel />
      <Typography sx={{ mt: 3, mb: 3, fontFamily: 'Montserrat', fontWeight: 700, fontSize: 40, letterSpacing: 2, color: '#4462A5' }}>
            Bonjour {username} !
      </Typography>
      <Box sx={{display: 'flex'}}>
        <HomeKidButtons />
        <Box sx={{display: 'flex', width: '70%', flexDirection: 'column', alignItems: 'center', mt: 2}}>
        <Avatar
        alt="avatar enfant"
        src={avatar}
        sx={{ width: 150, height: 150 }}
        />
          <Typography sx={{ mt: 3, mb: 1, fontFamily: 'Montserrat', fontWeight: 600 }}>
            Niveau {progressValue.currentLevel}
          </Typography>
          <HomeKidProgressBar bgcolor= '#4462A5' completed={progressValue.completion}/>
          <Typography sx={{ mt: 3, fontFamily: 'Montserrat', fontWeight: 500 }}>
            Plus que {progressValue.bookToReadToNewLevel} livres avant le niveau suivant !
          </Typography>
        </Box>
      </Box>
      <Box sx={{display: 'flex', width: '70%', m:'auto' }}>
        <Box 
          component="img"
          alt="Couverture d'un livre"
          src={lastBookValue.book.cover}
          sx={{
            height: 300,
            width: 300,
            maxHeight: { xs: 200, md: 300 },
            maxWidth: { xs: 200, md: 300 },
            marginLeft: 20,
            marginBottom: 15,
            marginTop: 8
          }}
        />
        <Box sx={{width: '50%', textAlign: 'center'}}>
          <Typography sx={{ mt: 8, fontFamily: 'Montserrat', fontWeight: 500, textDecoration: 'underline' }}>
            Livre le plus récent ajouté
          </Typography>
          <Typography sx={{ mt: 1, fontFamily: 'Montserrat', fontWeight: 500 }}>
            {lastBookValue.book.title}
          </Typography>
          <Typography sx={{ mt: 3,mb: 3, fontFamily: 'Montserrat', fontWeight: 500 }}>
            {lastBookValue.updated_at}
          </Typography>
          <Rating name="read-only" precision={0.5} value={lastBookValue.rating} readOnly />
          <Typography sx={{ m: 'auto', mt: 3, fontFamily: 'Montserrat', fontWeight: 300, width: '80%', fontStyle: 'italic' }}>
            "{lastBookValue.book.description}"
          </Typography>
        </Box>
      </Box>
    </div>
  )
}

export default HomeKid