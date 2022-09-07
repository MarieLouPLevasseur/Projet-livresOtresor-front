import React , { useEffect, useState } from 'react'
import ButtonList from '../HomeUser/ButtonList/ButtonList'
import HomeCarousel from '../Home/HomeCarousel/HomeCarousel'
import Card from '@mui/material/Card';
import axios from 'axios'
import { useDispatch, useSelector } from 'react-redux';


import './HomeUser.scss'
import { Button, Typography } from '@mui/material';
import Account from './Account/Account';



import Loading from '../Loading/Loading';
import { userFirstname, userLastname } from '../../features/login/userSlice';


function HomeUser() {
  // *************modif ML******************

  // Redux-toolkit state import
  const apiUrl = useSelector((state) => state.api.apiUrl);
  const token = useSelector((state) => state.user.token);
  const id = useSelector((state) => state.user.userId);
  const firstname = useSelector((state) => state.user.firstname);
  const lastname = useSelector((state) => state.user.lastname);

 // TODO a remplir au clique car vide 
    // TODO lorsqu'un clique est effectuer sur voir un compte enfant, on stocke les infos de cet enfant dans le state du parent
    // TODO à chaque clique les données doivent êtres remplacer par ceux de l'enfant cliqué
    // TODO celà permettrait de ne pas écraser le token ou les données parents, et de dynamiser automatiquement la page enfant avec les infos du kid sélectionner. 
    // TODO Si le parent sélectionne un autre compte, on écrase les anciennes infos avec celles du nouvel enfant 
    // TODO les infos kid devront etre mis sous condition de connexion utilisateur pour le nommage (et appel) conforme des données
	
	
	// const KidUsername = useSelector((state) => state.user.kidUsername);
  // const kidAvatar = useSelector((state) => state.user.kidAvatar);
  // const kidId = useSelector((state) => state.user.kidId)

    // Local States
    const [KidsValue, setKidsValue] = useState([]);
    const [loadinKidsValue, setLoadingKidsValue] = useState(true);

  // Api Calls
  const apiEndpointKids = `/api/v1/users/${id}/kids`

  console.log(id);

  useEffect(() => {
    if(id){
    axios.get(apiUrl + apiEndpointKids, {headers : {
      'Authorization': `Bearer ${token}`
    }
    })
    .then((response) => {
      console.log(response.data)
      setKidsValue(response.data);
       console.log(KidsValue);
       setLoadingKidsValue(false)
    })
    .catch((error) => {
      console.log('Erreur !', error);
    })

    
  }
  }, [id]);
  
  if (loadinKidsValue ) {
    return <Loading/>
  }
  // **************END modif ML****************
  return (
    <div>
      <HomeCarousel />
      <Card variant='outlined' sx={{border:'1px solid #4462A5', display: 'flex', justifyContent: 'space-between', alignItems: 'center', width:'70%', margin: 'auto', marginBottom:'30px', marginTop:'30px'}}>
        <Typography sx={{fontSize: '1.4rem', padding:'30px', fontFamily: 'montserrat'}}>Compte personnel de: {firstname} {lastname}</Typography>
        <Account />
      </Card>
      <Button className='button'sx={{marginBottom: '30px'}}>
        <Typography sx={{fontSize: '1.4rem', padding:'20px', background:'#4462A5', color:'white', letterSpacing:'1px', fontFamily: 'montserrat'}}>Ajouter un compte</Typography>
      </Button>

    
      {KidsValue.map((e) => (
      <Card className='card' variant='outlined' sx={{border:'1px solid #4462A5', display: 'flex', justifyContent: 'space-between', alignItems: 'center', width:'70%', margin: 'auto', marginBottom:'30px', background: '#'}}>
        <Typography sx={{fontSize: '1.4rem', padding:'30px', fontFamily: 'montserrat'}}> Compte enfant : {e.username}  </Typography>
        <ButtonList />
      </Card>
      ))} 
     
    </div>
  )
}

export default HomeUser