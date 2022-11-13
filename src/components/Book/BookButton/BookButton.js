import React, {useState, useEffect} from 'react'
import { Box, Button } from '@mui/material'
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';

import axios from 'axios';

import './BookButton.scss'



/**
 * Set Button structure button to add a book
 * 
 * @param  Book all properties of the api book
 */
function BookButton(Book) {
  
  // Redux-toolkit state import
  const apiUrl = useSelector((state) => state.api.apiUrl);
  const token = useSelector((state) => state.kid.token);
  const kidId = useSelector((state) => state.kid.id);

  // Error states
  const [alertErrorSubmit, setAlertErrorSubmit] = useState(false);
  const [alertErrorLogin, setAlertErrorLogin] = useState(false);
  const [alertSuccesSubmit, setAlertSuccesSubmit] = useState(false);


  // Api EndPoint
  const apiEndpointCreateBook = `/api/v1/kids/${kidId}/books`

  // Redirect when connected
  const navigate = useNavigate();



  // Redirect when success
  //  TODO pour l'instant redirection vers "mes livres" car il faudrait récupérer l'isbn du nouveau livres avec la route "last-read" qui contiendra l'isbn du dernier livre enregistré
      //* TODO vérifier qu'en back il ne s'agit pas uniquement du dernier livre lu (sinon il faudra une nouvelle route ou un filtre sur "tous mes livres")
      //* ou plus simplement mettre en homepage le dernier livre enregistré (et non pas lu) et mettre un clique pour que l'enfant puisse le consulter
  useEffect(() => {
    if (alertSuccesSubmit) {
      setTimeout(() => {
        navigate("/profil/enfant")
      }, 2000);
    }
  });

 //---- call API for Submit form  -------

 const postApi = (routeApi ,data) => {
  axios.post(routeApi , data, {headers : {
    "Content-Type": "application/json",
    'Authorization': `Bearer ${token}`

  },
  })
  .catch(function (error) {
    console.log(error);
    setAlertErrorLogin(true)
  })
  .then(function (response) {
    console.log(response);
    setAlertSuccesSubmit(true);
  })
}
  

  const handleClickAddButton = (isRead, Book) => {

    console.log(isRead, "test isread on add Button");
   
    if (isRead === "" ) {
      setAlertErrorSubmit(true);
    } else {
      const loginFormData = {
        "is_read":     isRead,
        "book":{
        "isbn" :       Book.Book.isbn13,
        "cover":       Book.Book.image,
        "publisher":   Book.Book.publisher,
        "description": Book.Book.synopsis !=="" ? "Il n'y a pas de description pour ce livre" : Book.Book.synopsis,
        "title":       Book.Book.title,
        "authors":     [{"name": Book.Book.authors[0]}],
        
      }
    }
  
      // TODO il faudra mettre une pop up pour signalé si bien enregistré ou si erreur (ex doublon) + redirection
  postApi(apiUrl + apiEndpointCreateBook,loginFormData);
  }
};

// ----------
  

   

  return (
    
    <div>

<Snackbar
        open={alertSuccesSubmit}
        autoHideDuration={6000}
        onClose={() => setAlertSuccesSubmit(false)}
      >
        <MuiAlert
          elevation={6}
          variant="filled"
          severity="success"
          sx={{ width: "100%" }}
        >
          Le livre a été enregistré avec succès !
        </MuiAlert>
      </Snackbar>
      <Snackbar
        open={alertErrorSubmit}
        autoHideDuration={6000}
        onClose={() => setAlertErrorSubmit(false)}
      >
        <MuiAlert
          elevation={6}
          variant="filled"
          severity="error"
          sx={{ width: "100%" }}
        >
          Il y a eut un soucis lors de l'enregistrement du livre. Nous sommes désolés.
        </MuiAlert>
      </Snackbar>

          {console.log(Book, "info book dans bookbutton")}

       <Box sx={{ flexGrow: 1,
                  display:'flex',
                  flexDirection: 'row',
                  width:'60%',
                  margin: 'auto'
                }}>
          <Button className="buttonBookAdd"  onClick={(e) => handleClickAddButton(true,Book)}


            sx={{ my: 2,
                  color: 'white',
                  background:'#4462A5',
                  fontFamily:'Montserrat',
                  width:'100%',
                  margin:'20px'
                 
                }}
            >  Ajouter à mes livres lus

          </Button>
          <Button className="buttonBookAdd"  onClick={(e) => handleClickAddButton(false,Book)}

            sx={{ my: 2, color: 'white',fontFamily:'Montserrat', background:'#4462A5', width:'100%', margin:'20px' }}
          >
                Ajouter à ma liste d'envie

          </Button>
        </Box>
    </div>
  )
}

export default BookButton