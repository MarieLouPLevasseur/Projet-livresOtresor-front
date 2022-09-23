import React, {useState} from 'react'
import { Box, Button } from '@mui/material'
import { useSelector } from 'react-redux';

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

  // Api EndPoint
  const apiEndpointCreateBook = `/api/v1/kids/${kidId}/books`


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
  });
}
  

  const handleClickAddButton = (isRead, Book) => {

    console.log(Book, "test Book on add Button");
   
    if (isRead === "" ) {
      setAlertErrorSubmit(true);
    } else {
      const loginFormData = {
        "is_read":     isRead,
        "book":{
        "isbn" :       Book.Book.isbn13,
        "cover":       Book.Book.image,
        "publisher":   Book.Book.publisher,
        "description": Book.Book.synopsis,
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

          {console.log(Book, "info book dans bookbutton")}

       <Box sx={{ flexGrow: 1, display:'flex', flexDirection: 'column', width:'100%'}}>
          <Button className="buttonBookAdd"  onClick={(e) => handleClickAddButton(true,Book)}


            sx={{ my: 2, color: 'white', background:'#4462A5' , fontFamily:'Montserrat', width:'100%'}}
          >
                Ajouter à ma liste d'envie
          </Button>
          <Button className="buttonBookAdd"  onClick={(e) => handleClickAddButton(false,Book)}

            sx={{ my: 2, color: 'white',fontFamily:'Montserrat', background:'#4462A5', width:'100%' }}
          >
                Ajouter à mes livres lus
          </Button>
        </Box>
    </div>
  )
}

export default BookButton