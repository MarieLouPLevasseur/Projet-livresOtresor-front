import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { Box, Rating, Typography, Avatar } from '@mui/material'
import { useSelector, useDispatch } from 'react-redux';
import { kidProgress } from '../../features/login/kidSlice';
import { Link } from "react-router-dom";


import HomeCarousel from '../Home/HomeCarousel/HomeCarousel';
import HomeKidButtons from './HomeKidButtons/HomeKidButtons';
import HomeKidProgressBar from './HomeKidProgressBar/HomeKidProgressBar';
import Loading from '../Loading/Loading';
import defaultCover from '../../assets/img/defaultCover.jpg'
import './HomeKid.scss';

function HomeKid() {
 
    // Redux-toolkit state import
      const apiUrl = useSelector((state) => state.api.apiUrl);


    // Set datas if User or Kid
    const isLogUser = useSelector((state) => state.user.isLogUser);
    const isLogKid = useSelector((state) => state.kid.isLogKid);
  
    console.log(isLogUser);
    console.log(isLogKid);

  // set token
    const token = useSelector(state => {
      if(isLogUser) {
          return state.user.token
      }
      return state.kid.token;
     })

  // set username
    const username = useSelector(state => {
      if(isLogUser) {
          return state.user.kidUsername
      }
      return state.kid.username;
     })

  // set avatar
    const avatar = useSelector(state => {
      if(isLogUser) {
          return state.user.kidAvatar
      }
      return state.kid.avatar;
     })
  
  // set id
    const id = useSelector(state => {
      if(isLogUser) {
          return state.user.kidId
      }
      return state.kid.id;
     })

  const progress = useSelector((state) => state.kid.progress)
  const dispatch = useDispatch();


  // Local States
  const [lastBookValue, setLastBookValue] = useState("");
  const [loadingLastBookValue, setLoadingLastBookValue] = useState(true);
  const [loadingProgressValue, setLoadingProgressValue] = useState(true);
  const [lastBookValueBookkidId, setLastBookValueBookkidId] = useState("");

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
      console.log(response.data);
      const progress = response.data;
      localStorage.setItem('kidProgress', JSON.stringify({
        progress
      }));
      dispatch(kidProgress(response.data));
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
      setLoadingLastBookValue(false);
      setLastBookValueBookkidId(response.data.book.id)
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
            Niveau {progress.currentLevel}
          </Typography>
          <HomeKidProgressBar bgcolor= '#4462A5' completed={progress.completion}/>
          <Typography sx={{ mt: 3, fontFamily: 'Montserrat', fontWeight: 500 }}>
            Plus que {progress.bookToReadToNewLevel} livres avant le niveau suivant !
          </Typography>
        </Box>
      </Box>
      <Box sx={{display: 'flex', width: '70%', m:'auto' }}>
      <Link to= {`/mes-livres/voir-livre/${lastBookValueBookkidId}`} >
          <Box 
            component="img"
            alt="Couverture d'un livre"
            src={lastBookValue ? lastBookValue.book.cover : defaultCover }
            sx={{
              height: 300,
              width: 250,
              maxHeight: { xs: 200, md: 300 },
              maxWidth: { xs: 200, md: 300 },
              marginLeft: 20,
              marginBottom: 15,
              marginTop: 8,
            }}
          />
        </Link>
        <Box sx={{width: '50%', textAlign: 'center'}}>
          <Link to= {`/mes-livres/voir-livre/${lastBookValueBookkidId}`} >

              <Typography sx={{ mt: 8, fontFamily: 'Montserrat', fontWeight: 500, textDecoration: 'underline',  }} >
                Livre le plus récent ajouté
              </Typography>
          </Link>

          <Typography sx={{ mt: 1, fontFamily: 'Montserrat', fontWeight: 500 }}>
            {lastBookValue ? lastBookValue.book.title : 'Titre à venir'}
          </Typography>
          <Typography sx={{ mt: 3,mb: 3, fontFamily: 'Montserrat', fontWeight: 500 }}>
            {lastBookValue ? lastBookValue.updated_at : '01-01-2022'}
          </Typography>
          <Rating name="read-only" precision={0.5} value={lastBookValue.rating} readOnly />
          <Typography sx={{ m: 'auto', mt: 3, fontFamily: 'Montserrat', fontWeight: 300, width: '80%', fontStyle: 'italic' }}>
            "{lastBookValue ? lastBookValue.book.description : " Le dernier enregistré apparaitra ici"}"
          </Typography>
        </Box>
      </Box>
    </div>
  )
}

export default HomeKid