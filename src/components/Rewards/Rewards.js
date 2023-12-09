import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import { Box, Typography, Avatar } from '@mui/material'
import ImageList from "@mui/material/ImageList";
import ImageListItem from "@mui/material/ImageListItem";
import ImageListItemBar from "@mui/material/ImageListItemBar";
import Tooltip from '@mui/material/Tooltip';


import { kidAvatar } from '../../features/login/kidSlice';
import { userKidAvatar  } from '../../features/login/userSlice';

import HomeCarousel from '../Home/HomeCarousel/HomeCarousel'
import HomeKidButtons from '../HomeKid/HomeKidButtons/HomeKidButtons'
import HomeKidProgressBar from '../HomeKid/HomeKidProgressBar/HomeKidProgressBar'
import DiplomaList from './RewardsList/DiplomaList'
import Loading from '../Loading/Loading';

import './Rewards.scss'
import AvatarList from './RewardsList/AvatarList'
import BookIconeMenu from '../Book/BookIconeMenu/BookIconeMenu';
import BookMenu from '../Book/BookMenu/BookMenu';
import { handleErrors } from '../../Utils/handleErrors'

function Rewards() {

  // Redux-toolkit state import
  const apiUrl = useSelector((state) => state.api.apiUrl);
  const progress = useSelector((state) => state.kid.progress);

  // **********************
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
  // ************************

  // Local States
  const [avatarsList, setAvatarsList] = useState([]);
  const [diplomasList, setDiplomasList] = useState([]);
  const [loadingAvatarsList, setLoadingAvatarsList] = useState(true);
  const [loadingDiplomasList, setLoadingDiplomasList] = useState(true);

  // Api Calls
  const apiEndpointAvatars = `/api/v1/kids/${id}/avatars`
  const apiEndpointDiplomas = `/api/v1/kids/${id}/diplomas`
  const apiEndpointSetAvatar = `/api/v1/kids/${id}/avatar`
 

// *******************
// Controlled components
const [currentAvatarToSetValue, setCurrentAvatarToSetValue] = useState("");

// Error states
const [alertErrorSubmit, setAlertErrorSubmit] = useState(false);
const [alertErrorLogin, setAlertErrorLogin] = useState(false);


// ***********************

  // Call list of Avatars
  useEffect(() => {
    if(id){
    axios.get(apiUrl + apiEndpointAvatars, {headers : {
      'Authorization': `Bearer ${token}`
    }
    })
    .then((response) => {
      // console.log(response.data);
      setAvatarsList(response.data);
      setLoadingAvatarsList(false);
    })
    .catch((error) => {
      console.log('Erreur !', error);
      handleErrors(error)
    })

    // Call list of Diplomas
    axios.get(apiUrl + apiEndpointDiplomas, {headers : {
      'Authorization': `Bearer ${token}`
    }
    })
    .then((response) => {
      // console.log(response.data)
      setDiplomasList(response.data);
      setLoadingDiplomasList(false)
    })
    .catch((error) => {
      console.log('Erreur !', error);
      handleErrors(error)
    })
  }
  }, [id]);

  // ***************Set Datas for set new avatar for the Kid**************************

 // Api Call
 const patchApi = (routeApi ,data) => {
  axios.patch(routeApi , data, {headers : {
    'Authorization': `Bearer ${token}`
  },
  })
  .then(function (response) {
   
   
  })
  // })
  .catch(function (error) {
    console.log(error);
    setAlertErrorLogin(true)
    handleErrors(error)
  });
}

  const dispatch = useDispatch();

   const handleClickAvatar = (url) => {
     setCurrentAvatarToSetValue(url);
    //  console.log(url);



    // onChange={()=>{setCurrentAvatarToSetValue()}}
      const newAvatarToset = {
        profile_avatar: currentAvatarToSetValue,
      };


      // console.log(currentAvatarToSetValue);
       const newAvatarTosetJson = JSON.stringify(newAvatarToset);
     patchApi(apiUrl + apiEndpointSetAvatar,newAvatarTosetJson);


     if(isLogUser) {
        dispatch(userKidAvatar(url))
      }
      else{
        dispatch (kidAvatar(url))

      }

   };

   const handleClickDiploma = (url) => {
  
      // TODO Ouvrir la fenêtre d'impression avec l'image
    // const printWindow = window.open('', '_blank');
    // printWindow.document.write(`<html><head><title>Imprimer</title></head><body><img src="${url}" alt="diplome"></body></html>`);
    // printWindow.document.close();
    // printWindow.print();

   };
// **************************************************************

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
        {/* <BookMenu /> */}

        <BookIconeMenu/>
        <Box sx={{display: 'flex', width: '70%', flexDirection: 'column', alignItems: 'center', mt: 2 , margin:{xs:'auto'}}}>
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
     
            <Tooltip title="Choisis moi comme avatar" placement="top">

              <img className='avatarImage' src={image.url} alt='avatar'  onClick={(e)=> {handleClickAvatar(e.target.src)}}  />
            </Tooltip>
 
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
              <Tooltip title="Clique pour m'imprimer" placement="top">

                <img className="diplomaImage" src={image.url} alt='diplome'  onClick={(e)=> {handleClickDiploma(e.target.src)}}/>
              </Tooltip>

            </ImageListItem>
          ))}
        </ImageList>
      </Box>
    </div>
  )
}

export default Rewards