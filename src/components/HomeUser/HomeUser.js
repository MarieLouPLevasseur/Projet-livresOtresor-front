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
  const id = useSelector((state) => state.user.id);
  const firstname = useSelector((state) => state.user.firstname);
  const lastname = useSelector((state) => state.user.lastname);

  // TODO a remplir au clique car vide 
  // const KidUsername = useSelector((state) => state.kid.username);
  // const kidAvatar = useSelector((state) => state.kid.avatar);
  // const kidId = useSelector((state) => state.kid.id)

    // Local States
    const [KidsValue, setKidsValue] = useState("");
  
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
    })
    .catch((error) => {
      console.log('Erreur !', error);
    })

    
  }
  }, [id]);
  

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

      {/* {Users.map((e)=>{ */}
      {KidsValue.map((e) => (
      <Card className='card' variant='outlined' sx={{border:'1px solid #4462A5', display: 'flex', justifyContent: 'space-between', alignItems: 'center', width:'70%', margin: 'auto', marginBottom:'30px', background: '#'}}>
        <Typography sx={{fontSize: '1.4rem', padding:'30px', fontFamily: 'montserrat'}}> Compte enfant : {e.username}</Typography>
        <ButtonList />
      </Card>
      ))}
     
    </div>
  )
}

export default HomeUser