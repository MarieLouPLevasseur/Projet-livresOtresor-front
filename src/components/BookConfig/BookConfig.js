import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import axios from 'axios';

import { Typography, Box, Button, Card, Rating, TextField, Grid, TextareaAutosize } from '@mui/material';
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import ThumbDownIcon from '@mui/icons-material/ThumbDown';
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Radio from '@mui/material/Radio';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';


import BookMenu from '../Book/BookMenu/BookMenu';
import BookIconeMenu from '../Book/BookIconeMenu/BookIconeMenu';
import Loading from '../Loading/Loading';

import './BookConfig.scss'

function BookConfig() {

  // UseParams
  const { id } = useParams();
  console.log(id, 'id');

  // Redux-toolkit state import
  const apiUrl = useSelector((state) => state.api.apiUrl);
  const token = useSelector((state) => state.kid.token);
  const kidId = useSelector((state) => state.kid.id);

  // Local States
  const [Book, setBook] = useState([]);
  const [loadingBook, setLoadingBook] = useState(true);
  const [LoadingCategories, setLoadingCategories] = useState(true);
  const [LoadingCollections, setLoadingCollections] = useState(true);
  const [CardsFilter, setCardsFilter] = useState([]);
  const [LoadingCards, setLoadingCards] = useState(true);
  const [Cards, setCards] = useState([]);


  // Local Select State
  const [category, setCategory] = useState("");
  const [collection, setCollection] = useState("");
  const [categoriesList, setCategoriesList] = useState([]);
  const [collectionsList, setCollectionsList] = useState([]);
  const [selected, setSelected] = useState(true);
  const [bookkidId, setBookkidId] = useState(true);

  // Local Form State
  const [collectionIdValue, setCollectionId] = useState("");
  const [collectionNameValue, setCollectionName] = useState("");
  const [commentValue, setComment] = useState("");
  const [isReadValue, setIsRead] = useState("");
  const [categoryIdValue, setCategoryId] = useState(0);
  const [ratingValue, setRating] = useState("");

  // Error states
  const [alertErrorSubmit, setAlertErrorSubmit] = useState(false);
  const [alertErrorLogin, setAlertErrorLogin] = useState(false);
  const [alertSuccesSubmit, setAlertSuccesSubmit] = useState(false);
  const [alertErrorSubmitIsRead, setAlertErrorSubmitIsRead] = useState(false);


  // Api Calls
  const apiEndpointBook = `/api/v1/kids/${kidId}/books/${id}`
  const apiEndpointCategories = `/api/v1/categories`
  const apiEndpointCollections = `/api/v1/kids/${kidId}/bookkids/series`

  // Refresh when update is good
  // const navigate = useNavigate();

  console.log(Book, "valeur de Book");

  useEffect(() => {
    if (kidId) {
      axios.get(apiUrl + apiEndpointBook, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      })
        .then((response) => {
          console.log(response.data, " Book datas");
          setBook(response.data);
          setCardsFilter(response.data);
          setCards(response.data);
          setLoadingCards(false);
          setBookkidId(response.data[0].id)
          console.log(bookkidId, "value current bookkid id")
          setLoadingBook(false)
          setIsRead(response.data[0].is_read)
          console.log(response.data[0].is_read, "is read Data on book")

        })
        .catch((error) => {
          console.log('Erreur !', error);
        });

      // call API for Categories 
      axios.get(apiUrl + apiEndpointCategories, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      })
        .then((response) => {
          console.log(response.data)
          setCategoriesList(response.data)
          setLoadingCategories(false);


        })
        .catch((error) => {
          console.log('Erreur !', error);
        });
      // call API for Collections 
      axios.get(apiUrl + apiEndpointCollections, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      })
        .then((response) => {
          console.log(response.data)
          setCollectionsList(response.data)
          setLoadingCollections(false);


        })
        .catch((error) => {
          console.log('Erreur !', error);
        });
    }
  }, [kidId]);


  // TODO Redirect when success or Refresh  page
  // useEffect(() => {
  //   if (alertSuccesSubmit) {
  //     setTimeout(() => {
  //       navigate(`/mes-livres/voir-livre/${id}` )
  //     }, 2000);
  //   }
  // });

  // call API for Submit form 

  const patchApi = (routeApi, data) => {
    axios.patch(routeApi, data, {
      headers: {
        "Content-Type": "application/json",
        'Authorization': `Bearer ${token}`

      },
    })
      .then(function (response) {
        console.log(response);
        setAlertSuccesSubmit(true);
      })
      .catch(function (error) {
        console.log(error);
        setAlertErrorLogin(true)
      });
  }



  // -----HANDLE CHANGE on form fields ----------
  const handleChangeCategory = (event) => {
    setCategory(event.target.value);
    setCategoryId(event.target.value);
    if (category) {
      setCardsFilter(Cards.filter((data) => data.name === category));
    }
  };

  const handleChangeCollection = (event) => {
    setCollection(event.target.value);
    setCollectionId(event.target.value.id);

    if (collection) {
      setCardsFilter(Cards.filter((data) => data.name === collection));
    }
  };

  const handleChangeRadioButton = event => {

    setSelected(event.target.value);

    if (event.target.value == "true") {
      setIsRead(true);
    }
    if (event.target.value == "false") {
      setIsRead(false);
    }
  };



  // ---------------------------
  if (loadingBook || LoadingCategories || LoadingCards || LoadingCollections) {
    return <Loading />
  }


  // ------  HANDLE SUBMIT FORM ------------------
  const handleSubmitForm = (event) => {
    event.preventDefault();
    if (isReadValue === "") {
      setAlertErrorSubmitIsRead(true);
console.log(categoryIdValue, "category id value in handlesubmit form")
console.log(isReadValue, "is read value in handlesubmit form")
console.log(commentValue, "comment value in handlesubmit form")
    } else {
      // ?  TEST Si la valeur est nulle on la remplace par la valeur déjà connu en BDD Sinon on met la nouvelle
      const loginFormData = {
        "is_read": isReadValue,
        "comment": commentValue !== "" ? commentValue : Book.comment,
        // "rating": 1.5 ,
        "category": { "id": + categoryIdValue !== "" ? categoryIdValue : Book.category.id },

        // "series": collectionIdValue   !== "" ? "id:"+collectionIdValue : ""
        // collectionNameValue !== "" ? "name"+collectionNameValue : ""

      }
      // ? Les valeurs isRead, category et comment, sont transmis correctement 
      // TODO Trouver le passage de la valeur rating pour la transmettre
      // TODO Remettre les valeurs par issu de la base par défaut dans les champs is_read par défaut (fait précédemment mais impossible de changer la valeur ensuite...)
      //* TODO Trouver le moyen de combiner les éléments entre eux: si un champs n'est pas rempli, sa valeur de clé ne soit pas être transmise, autrement le back l'interpère comme un champs vide et rejette la valeur
      //* Voir éventuellement si le back peut y changer quelque chose
      //* sinon le plus simple serait de fragmenter avec des boutons différents, les soumissions (mais lourd pour l'enfant)
      //* systeme de if peut etre?


      // API Call to send data
      const apiEndpointSubmitBookChange = `/api/v1/kids/${kidId}/bookkids/${bookkidId}`

      // const loginFormDataJson = JSON.stringify(loginFormData);
      patchApi(apiUrl + apiEndpointSubmitBookChange, loginFormData);
    }
  };
  return (
    <div>
      <Box sx={{ display: 'flex', justifyContent: 'center', alignSelf: 'center', alignItems:{xs:'center'}, padding: '20px', flexDirection: { xs: 'column', sd: 'column', md: 'column' }, width: '80%', margin: 'auto' }}>
        <Box class= "icone-menu" sx={{ position: 'relative'}} > 

        <BookIconeMenu sx={{ marginLeft: {xs:'5px', sm: '5px'}, display: { xs: 'block', sm: 'none' } , position: {xs:'fixed', md:'fixed'}} } />
        </Box>

        <BookMenu sx={{ display: { xs: 'none', sm: 'block' } }} />
        <Typography component="h1" variant="h3" sx={{ fontFamily: 'montserrat', color: '#4462A5', mt: '20px', marginBottom: '20px', marginLeft: { md: '-70px' } }}>
          {Book[0].book.title}
        </Typography>

        <Box sx={{ display: 'flex', justifyContent: 'end', width: '100%', flexDirection: {xs:'column', sm: 'column'} , margin:'auto'}}>

          <Box
            component="img"
            alt="Couverture d'un livre"
            src={Book[0].book.cover}
            sx={{
              height: 300,
              width: 250,
              maxHeight: { xs: 200, md: 300 },
              maxWidth: { xs: 200, md: 300 },
              margin:{sx:'auto', sd:'auto', md:'auto'},
              alignItems: {sd: 'row'},
              alignSelf: 'center'
            }}
          />

          <Box sx={{ width: { xs: '100%', md: '50%', sd: '30%'}, textAlign: 'center' , margin: 'auto'}}>
            <Typography sx={{ mt: 3, mb: 1, fontFamily: 'Montserrat', fontWeight: 500 }}>
              Ecrit par
            </Typography>
            <Typography sx={{ mt: 1, mb: 3, fontFamily: 'Montserrat', fontWeight: 400 }}>
              {Book[0].book.authors[0].name}
            </Typography>
            <Typography sx={{ mt: 3, mb: 1, fontFamily: 'Montserrat', fontWeight: 500 }}>
              Aux éditions
            </Typography>
            <Typography sx={{ mt: 1, mb: 3, fontFamily: 'Montserrat', fontWeight: 400 }}>
              {Book[0].book.publisher}
            </Typography>
            {/* <Rating name="read-only" precision={0.5} value={4.5} readOnly /> */}
            <Typography sx={{ m: 'auto', mt: 3, fontFamily: 'Montserrat', fontWeight: 300, width: '80%', fontStyle: 'italic', marginBottom: '30px' }}>
              "{Book[0].book.description}"
            </Typography>
          </Box>

          {/* ************** Personnal information on book from the kid **************************/}

          <Box sx={{ width: { xs: '100%', md: '50%' }, textAlign: 'center' , margin: 'auto'}}>

            <Rating name="read-only" precision={0.5} value={Book[0].rating} readOnly />

            <Typography sx={{ mt: 3, mb: 1, fontFamily: 'Montserrat', fontWeight: 500 }}>
              Mes commentaires:
            </Typography>
            <Typography sx={{ mt: 1, mb: 3, fontFamily: 'Montserrat', fontWeight: 400 }}>
              {Book[0].comment}
            </Typography>
            <Typography sx={{ mt: 3, mb: 1, fontFamily: 'Montserrat', fontWeight: 500 }}>
              Est-ce que j'ai lu ce livre: {Book[0].is_read == true ? "oui" : "non, pas encore"}
            </Typography>
            <Typography sx={{ mt: 3, mb: 1, fontFamily: 'Montserrat', fontWeight: 500 }}>
              Catégorie: {Book[0].category.name ? Book[0].category.name : "je n'ai pas encore choisi de catégorie"}
            </Typography>
            <Typography sx={{ mt: 3, mb: 1, fontFamily: 'Montserrat', fontWeight: 500 }}>
              Collection: {Book[0].series ? Book[0].series.name : "je n'ai pas encore choisi de collection"}
            </Typography>

          </Box>
        </Box>

      </Box>

      {/* ******************************************espace formulaire******************************* */}
      {/* ------- Alert if Errors------------ */}
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
          Une erreur s'est produit lors de l'envoi du formulaire : Merci de remplir de recommencer
        </MuiAlert>
      </Snackbar>
      <Snackbar
        open={alertErrorSubmitIsRead}
        autoHideDuration={6000}
        onClose={() => setAlertErrorSubmit(false)}
      >
        <MuiAlert
          elevation={6}
          variant="filled"
          severity="error"
          sx={{ width: "100%" }}
        >
          Tu dois indiquer si le livre a été lu
        </MuiAlert>
      </Snackbar>
      {/* Validation ok */}
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
          Les informations ont bien été modifiées !
        </MuiAlert>
      </Snackbar>
      {/* ------------------------ */}
      <Box sx={{ marginBottom: '30px'}} >

        <Card variant='outlined' sx={{ border: '1px solid #4462A5', marginBottom: '30px', marginTop: '30px', marginLeft: '20px', width: '85%', margin: 'auto' }}>
          <Typography sx={{ fontSize: '1.4rem', padding: '15px', fontFamily: 'montserrat', margin: 'auto', color: '#4462A5' }}>Je peux choisir d'ajouter ou modifier des informations</Typography>

          {/* ------------- RATING ----------------------------- */}

          <Box sx={{ display: {xs: 'flex', sd:'flex'} , flexDirection: { xs: 'column', md: 'column'}, justifyContent: 'space-around', alignItems: 'center'  }}>
            <Typography sx={{ fontSize: '1.4rem', padding: '15px', fontFamily: 'montserrat', margin:{sx:'auto', sd:'auto', md:'none'} , color: '#4462A5', marginRight: { md: '50px' } }}>J'ajoute une note :</Typography>
            <Box sx={{ flexDirection: { xs: 'column', md: 'row' }, margin:{ md:'auto'}}}>
              <ThumbDownIcon />
              <Rating />
              <ThumbUpIcon />
            </Box>
          </Box>
          <hr className='barre' />
          {/* -----------COLLECTION SECTION --------------------------- */}
          {/* select collection by list */}
          {console.log(collectionIdValue, "current collection Id value")};

          <Typography sx={{ fontSize: '1.4rem', padding: '15px', fontFamily: 'montserrat', margin: 'auto', color: '#4462A5' }}>Si ce livre fait partie d'une série de livres, je peux l'ajouter à la collection</Typography>

          <Box sx={{ display: 'flex', flexDirection: { xs: 'column', md: 'column' }, justifyContent: 'center', alignItems: 'center', marginTop: '20px', width: '100%' }}>
            <Typography sx={{ fontSize: '1.4rem', padding: '15px', fontFamily: 'montserrat', margin:{sx:'auto', sd:'auto', md:'none'}, color: '#4462A5', width: 'auto' }}>Je choisis une collection :</Typography>
            {/* <Grid item xs={12} sm={6}> */}
            <FormControl>
              <InputLabel id="demo-simple-select-collection">Choisi une collection</InputLabel>
              <Select
                sx={{ width: { xs: '225px', md: '228px' } }}
                labelId="demo-simple-select-collection"
                id="demo-simple-collection"
                name="collectionId"
                label="collection"
                value={collection}
                onChange={handleChangeCollection}
              // TODO rajouter une valeur de champ Vide valeur à 0 pour ne pas cumuler un champs rempli et un champ sélectionné
              >
                {/* <MenuItem value=""> </MenuItem> */}
                {collectionsList.map((data) => (
                  <MenuItem key={data.id} value={data.name}>{data.name}</MenuItem>
                ))}
              </Select>
            </FormControl>
          </Box>

          {/* Create a new collection name */}
          {console.log(collectionNameValue, "current collection Name")}

          <Box sx={{ display: 'flex', flexDirection: { xs: 'column', md: 'column' }, justifyContent: 'space-around', textAlign: 'center', Width: '100%', padding: '10px', gap: '10px' }}>
            <Typography sx={{ fontSize: '1.4rem', padding: '30px', fontFamily: 'montserrat', color: '#4462A5' }}> ou je crée une nouvelle collection</Typography>
            <Box sx={{ display: 'flex', Width: '100%', justifyContent: 'space-around', mt: '18px' }}>
              <Grid item xs={12} sm={6}>
                <TextField
                  autoComplete="given-name"
                  name="collectionId"
                  fullWidth
                  id="collectionName"
                  label="Nouvelle collection du livre"
                  autoFocus
                  onChange={(e) => setCollectionName(e.target.value)}

                />
              </Grid>
            </Box>

            {/* ------------- CATEGORY ----------------------------- */}
            {console.log(categoryIdValue, "id current category")}

          </Box>
          <hr className='barre' />
          {/* <FormControl sx={{ width: '20%' }}> */}
          <Box sx={{ display: 'flex', flexDirection: { xs: 'column', md: 'column' }, justifyContent: 'center', alignItems: 'center', marginTop: '20px', width: '100%' }}>
            <Typography sx={{ fontSize: '1.4rem', padding: '15px', fontFamily: 'montserrat',margin:{sx:'auto', sd:'auto', md:'none'}, color: '#4462A5', width: 'auto' }}>J'ajoute une catégorie :</Typography>
            {/* <Grid item xs={12} sm={6}> */}
            <FormControl>
              <InputLabel id="demo-simple-select-category">Choisi une catégorie</InputLabel>
              <Select
                sx={{ width: { xs: '225px', md: '228px' } }}
                labelId="demo-simple-select-category"
                id="demo-simple-category"
                value={category}
                label="category"
                name='categoryId'
                onChange={handleChangeCategory}


              >
                <MenuItem key={0} value={0}> Pas de catégorie </MenuItem>

                {categoriesList.map((data) => (
                  <MenuItem key={data.id} value={data.id}>{data.name}</MenuItem>
                ))}
              </Select>
            </FormControl>
          </Box>
          {/* ------------- COMMENTS ----------------------------- */}
          {console.log(commentValue, "current comment Value")}

          <Box sx={{ display: 'flex', flexDirection: { xs: 'column', md: 'row', md: 'column' }, justifyContent: 'center', alignItems: 'center' }}>
            <Typography sx={{ fontSize: '1.4rem', padding: '15px', fontFamily: 'montserrat', margin: 'auto', color: '#4462A5' }}>J'ajoute un commentaire :</Typography>
            <Box sx={{ display: 'flex', flexDirection: { xs: 'column', md: 'row' }, Width: '100%', justifyContent: 'space-around', mt: '18px', margin: 'auto' }}>
              <Grid item xs={12} sm={12}>
                <TextareaAutosize
                  minRows={7}
                  autoComplete="current-comment"
                  name="comment"
                  id="comment"
                  label="Les petites notes personnelles"
                  autoFocus
                  style={{ width: 450 }}
                  onChange={(e) => setComment(e.target.value)}
                />
              </Grid>
            </Box>
          </Box>
          
          {/* ------------- READ OR WISHED ----------------------------- */}
          {console.log(isReadValue, "current isRead Value")};

          <Box sx={{ display: 'flex', flexDirection: { xs: 'column', md: 'row', md: 'column' }, justifyContent: 'center', alignItems: 'center' }}>
            <Typography sx={{ fontSize: '1.4rem', padding: '15px', fontFamily: 'montserrat', margin: 'auto', color: '#4462A5' }}>C'est un livre :</Typography>
            <FormControl>
              {/* <FormLabel id="demo-controlled-radio-buttons-group">Gender</FormLabel> */}
              <RadioGroup
                aria-labelledby="demo-controlled-radio-buttons-group"
                name="controlled-radio-buttons-group"
                sx={{ display: 'flex', flexDirection: { xs: 'column', md: 'row' } }}
              >
                <FormControlLabel
                  value="true"
                  name="is_read"
                  control={<Radio />}
                  label="Que j'ai lu"
                  // checked={Book[0].is_read === true ? selected : false}
                  // checked={selected === "read"}
                  onChange={handleChangeRadioButton}
                //TODO ne correspond pas à la valeur par défaut du bouton is_read pour l'instant, sinon impossible de faire un choix différent apres)
                />
                <FormControlLabel
                  value="false"
                  name="is_read"
                  control={<Radio />}
                  label="Dont j'ai envie"
                  // checked={Book[0].is_read === false ? selected : false}
                  // checked={ selected === "wish"}
                  onChange={handleChangeRadioButton}
                //TODO ne correspond pas à la valeur par défaut du bouton is_read pour l'instant, sinon impossible de faire un choix différent apres)

                />
              </RadioGroup>
            </FormControl>
          </Box>
          {/* ------------- SEND datas ----------------------------- */}

          <Box sx={{ margin: '30px' }} onClick={handleSubmitForm}>
            <Button
              type='submit'
              className='button'
              sx={{ my: 2, color: 'red', fontFamily: 'Montserrat', display: 'block', ml: 5, minWidth: '200px', margin: 'auto' }}
            >
              Enregistrer les modifications
            </Button>
          </Box>
        </Card>
      </Box>


    </div>
  )
}

export default BookConfig