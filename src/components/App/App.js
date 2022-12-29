import React from 'react';
import { Route, Routes } from 'react-router-dom';
import { useEffect } from 'react';

import Navbar from '../Navbar/Navbar'
import Home from '../Home/Home'
import KidLogin from '../KidLogin/KidLogin'
import Register from '../Register/Register'
import Profiles from '../Profiles/Profiles'
import Legal from '../Legal/Legal'
import Tutorial from '../Tutorial/Tutorial'
import Faq from '../Faq/Faq'
import Cookies from '../Cookies/Cookies'
import About from '../About/About'
import HomeUser from '../HomeUser/HomeUser'
import AccountManagement from '../AccountManagement/AccountManagement'
import HomeKid from '../HomeKid/HomeKid'
import Search from '../Search/Search'
import MyBooks from '../MyBooks/MyBooks'
import BookConfig from '../BookConfig/BookConfig'
import Rewards from '../Rewards/Rewards'
import Book from '../Book/Book'
import Footer from '../Footer/Footer'
import PageNotFound from '../PageNotFound/PageNotFound';

import UserLogin from '../UserLogin/UserLogin';
import { userFirstname, userId, userKidAvatar, userKidId, userKidUsername,userKidFirstname, userLastname, userLogin , userEmail} from '../../features/login/userSlice';
import { kidAvatar, kidId, kidLogin, kidUsername, kidProgress, kidFirstname } from '../../features/login/kidSlice';

import SessionTimeout from '../SessionTimeout';
import { useDispatch, useSelector } from 'react-redux';

import './App.scss';
import NotAllowed from '../NotAllowed/NotAllowed';

function App() {
// TODO : change NotAllowed Pages

  const dispatch = useDispatch();

  const isLogUser = useSelector((state) => state.user.isLogUser);
  console.log(isLogUser, "test is LogUser")
  const isLogKid = useSelector((state) => state.kid.isLogKid);
  console.log(isLogKid, "test is LogKid")

  useEffect(() => {
    const loggedUser = JSON.parse(localStorage.getItem('user'));
    const loggedUserKids = JSON.parse(localStorage.getItem('userKids'));
    const loggedKid = JSON.parse(localStorage.getItem('kid'));
    const progressKid = JSON.parse(localStorage.getItem('kidProgress'));
    console.log(isLogUser, "user logged dans useeffect")
    if (loggedUser) {
      dispatch(userLogin(loggedUser.token));

  // set user data only
      dispatch(userId(loggedUser.id));
      dispatch(userFirstname(loggedUser.firstname));
      dispatch(userLastname(loggedUser.lastname));
      dispatch(userEmail(loggedUser.email));

  // set kid user data only
      dispatch(userKidAvatar(loggedUserKids.avatar));
      dispatch(userKidUsername(loggedUserKids.username));
      dispatch(userKidFirstname(loggedUserKids.firstname));
      dispatch(userKidId(loggedUserKids.kidId));

  // set kid data if connected directly only

    } else if (loggedKid) {
      dispatch(kidLogin(loggedKid.token));
      dispatch(kidId(loggedKid.id));
      dispatch(kidUsername(loggedKid.username));
      dispatch(kidFirstname(loggedKid.firstname));
      dispatch(kidAvatar(loggedKid.profil_avatar));
      dispatch(kidProgress(progressKid.progress));

    }
  },[]);

  const notForKids = isLogUser || !isLogKid;

  return (
    <div className="App">
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/mentions-legales" element={<Legal />} />
        <Route path="/tutoriel" element={<Tutorial />} />
        <Route path="/faq" element={<Faq />} />
        <Route path="/cookies" element={<Cookies />} />
        <Route path="/a-propos" element={<About />} />
        
        {/* {isLogKid && <Route path="/inscription" element={<NotAllowed />} />} */}
        {!isLogKid && <Route path="/inscription" element={<Register />} />}
        <Route path="/connexion-enfant" element={<KidLogin />} />
        <Route path='/connexion-parent' element={<UserLogin />} />
        <Route path="/profil" element={<Profiles />} />
        {isLogUser && <Route path="/profil/utilisateur" element={<HomeUser />} />}
        {isLogKid && <Route path="/profil/utilisateur" element={<NotAllowed />} />}
        <Route path="/profil/utilisateur/compte" element={<AccountManagement />} />
        <Route path="/profil/enfant" element={<HomeKid />} />
        <Route path="/recherche" element={<Search />} />
        <Route path="/mes-livres" element={<MyBooks />} />
        <Route path="/recompenses" element={<Rewards />} />
        {/* <Route path="/recherche/voir-livre/:identifier" element={<Book />} /> */}
        <Route path="/recherche/voir-livre" element={<Book />} />
        <Route path="/mes-livres/voir-livre/:id" element={<BookConfig />} />
        <Route path="*" element={<PageNotFound />} />
      </Routes>
      
      <SessionTimeout />
      <Footer />
    </div>
  );
}

export default App;
