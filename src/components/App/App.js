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
import BookConfig from '../Book/BookConfig/BookConfig'
import Rewards from '../Rewards/Rewards'
import Book from '../Book/Book'
import Footer from '../Footer/Footer'
import PageNotFound from '../PageNotFound/PageNotFound';

import UserLogin from '../UserLogin/UserLogin';
import { userFirstname, userId, userKidAvatar, userKidId, userKidUsername, userLastname, userLogin } from '../../features/login/userSlice';
import { kidAvatar, kidId, kidLogin, kidUsername } from '../../features/login/kidSlice';
import { useDispatch, useSelector } from 'react-redux';

import './App.scss';

function App() {

  const dispatch = useDispatch();

  const isLogUser = useSelector((state) => state.user.isLogUser);
  const isLogKid = useSelector((state) => state.kid.isLogKid);

  useEffect(() => {
    const loggedUser = JSON.parse(localStorage.getItem('user'));
    const loggedUserKids = JSON.parse(localStorage.getItem('userKids'));
    const loggedKid = JSON.parse(localStorage.getItem('kid'));
    if (loggedUser) {
      dispatch(userLogin(loggedUser.token));

  // set user data only
      dispatch(userId(loggedUser.id));
      dispatch(userFirstname(loggedUser.firstname));
      dispatch(userLastname(loggedUser.lastname));

  // set kid user data only
      dispatch(userKidAvatar(loggedUserKids.avatar));
      dispatch(userKidUsername(loggedUserKids.username));
      dispatch(userKidId(loggedUserKids.kidId));

  // set kid data if connected directly only

    } else if (loggedKid) {
      dispatch(kidLogin(loggedKid.token));
      dispatch(kidId(loggedKid.kidId));
      dispatch(kidUsername(loggedKid.username));
      dispatch(kidAvatar(loggedKid.profile_avatar));
    }
  },[]);

  const notForKids = isLogUser || !isLogKid;

  return (
    <div className="App">
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        {!isLogKid && <Route path="/inscription" element={<Register />} />}
        <Route path="/connexion-enfant" element={<KidLogin />} />
        <Route path='/connexion-parent' element={<UserLogin />} />
        <Route path="/profil" element={<Profiles />} />
        <Route path="/mentions-legales" element={<Legal />} />
        <Route path="/tutoriel" element={<Tutorial />} />
        <Route path="/faq" element={<Faq />} />
        <Route path="/cookies" element={<Cookies />} />
        <Route path="/a-propos" element={<About />} />
        {notForKids && <Route path="/profil/utilisateur" element={<HomeUser />} />}
        <Route path="/profil/utilisateur/compte" element={<AccountManagement />} />
        <Route path="/profil/enfant" element={<HomeKid />} />
        <Route path="/recherche" element={<Search />} />
        <Route path="/mes-livres" element={<MyBooks />} />
        <Route path="/recompenses" element={<Rewards />} />
        <Route path="/recherche/voir-livre" element={<Book />} />
        <Route path="/mes-livres-voir-livre" element={<BookConfig />} />
        <Route path="*" element={<PageNotFound />} />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
