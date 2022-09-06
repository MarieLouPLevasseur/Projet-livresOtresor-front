import React, { useState, useEffect } from 'react'
import { useSelector } from 'react-redux';
import axios from 'axios';
import { Box, Typography, Avatar } from '@mui/material'
import ImageList from "@mui/material/ImageList";
import ImageListItem from "@mui/material/ImageListItem";
import ImageListItemBar from "@mui/material/ImageListItemBar";

import HomeCarousel from '../Home/HomeCarousel/HomeCarousel'
import HomeKidButtons from '../HomeKid/HomeKidButtons/HomeKidButtons'
import HomeKidProgressBar from '../HomeKid/HomeKidProgressBar/HomeKidProgressBar'
import DiplomaList from './RewardsList/DiplomaList'
import Loading from '../Loading/Loading';

import './Rewards.scss'
import AvatarList from './RewardsList/AvatarList'

function Rewards() {

  // Redux-toolkit state import
  const apiUrl = useSelector((state) => state.api.apiUrl);
  const token = useSelector((state) => state.kid.token);
  const avatar = useSelector((state) => state.kid.avatar);
  const id = useSelector((state) => state.kid.id);
  const progress = useSelector((state) => state.kid.progress);

  // Local States
  const [avatarsList, setAvatarsList] = useState([]);
  const [diplomasList, setDiplomasList] = useState([]);
  const [loadingAvatarsList, setLoadingAvatarsList] = useState(true);
  const [loadingDiplomasList, setLoadingDiplomasList] = useState(true);

  // Api Calls
  const apiEndpointAvatars = `/api/v1/kids/${id}/avatars`
  const apiEndpointDiplomas = `/api/v1/kids/${id}/diplomas`

  useEffect(() => {
    if(id){
    axios.get(apiUrl + apiEndpointAvatars, {headers : {
      'Authorization': `Bearer ${token}`
    }
    })
    .then((response) => {
      console.log(response.data);
      setAvatarsList(response.data);
      setLoadingAvatarsList(false);
    })
    .catch((error) => {
      console.log('Erreur !', error);
    })

    axios.get(apiUrl + apiEndpointDiplomas, {headers : {
      'Authorization': `Bearer ${token}`
    }
    })
    .then((response) => {
      console.log(response.data)
      setDiplomasList(response.data);
      setLoadingDiplomasList(false)
    })
    .catch((error) => {
      console.log('Erreur !', error);
    })
  }
  }, [id]);

  if (loadingAvatarsList || loadingDiplomasList) {
    return <Loading/>
  }
  return (
    <div className='homeKid'>
      <HomeCarousel />
      <Typography sx={{ mt: 3, mb: 3, fontFamily: 'Montserrat', fontWeight: 700, fontSize: 40, letterSpacing: 2, color: '#4462A5' }}>
            Mes récompenses
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
      <Typography sx={{ mt: 5, mb: 3, fontFamily: 'Montserrat', textDecoration: 'underline', fontWeight: 500, fontSize: 30, letterSpacing: 2, color: '#4462A5' }}>
            Mes avatars
      </Typography>
      <Box sx={{ display: 'flex', width: '70%', m: 'auto' }} >
        <ImageList
          sx={{
            gridAutoFlow: "column",
            gridTemplateColumns: "repeat(auto-fit, minmax(150px,1fr)) !important",
            gridAutoColumns: "minmax(150px, 1fr)"
          }}
        >
          {avatarsList.map((image) => (
            <ImageListItem key={image.id}>
              <img src={image.url} alt='avatar' />
            </ImageListItem>
          ))}
        </ImageList>
      </Box>
      <Typography sx={{ mt: 3, mb: 3, fontFamily: 'Montserrat', textDecoration: 'underline', fontWeight: 500, fontSize: 30, letterSpacing: 2, color: '#4462A5' }}>
            Mes certificats
      </Typography>
      <Box sx={{ display: 'flex', width: '70%', m: 'auto', mb: 5 }} >
        <ImageList
          sx={{
            gridAutoFlow: "column",
            gridTemplateColumns: "repeat(auto-fit, minmax(300px,1fr)) !important",
            gridAutoColumns: "minmax(300px, 1fr)"
          }}
        >
          {diplomasList.map((image) => (
            <ImageListItem key={image.id}>
              <img src={image.url} alt='diplome' />
            </ImageListItem>
          ))}
        </ImageList>
      </Box>
    </div>
  )
}

export default Rewards