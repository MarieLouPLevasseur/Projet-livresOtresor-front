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
import Rewards from '../Rewards/Rewards'
import Book from '../Book/Book'
import Footer from '../Footer/Footer'

import UserLogin from '../UserLogin/UserLogin';
import { userLogin } from '../../features/login/userSlice';
import { kidLogin } from '../../features/login/kidSlice';
import { useDispatch, useSelector } from 'react-redux';

import './App.scss';

function App() {

  const dispatch = useDispatch();

  const isLogUser = useSelector((state) => state.user.isLogUser);
  const isLogKid = useSelector((state) => state.kid.isLogKid);

  useEffect(() => {
    const loggedUser = JSON.parse(localStorage.getItem('user'));
    const loggedKid = JSON.parse(localStorage.getItem('kid'));
    if (loggedUser) {
      dispatch(userLogin(loggedUser.token));
    } else if (loggedKid) {
      dispatch(kidLogin(loggedKid.token));
    }
  },[]);

  const notForKids = isLogUser || !isLogKid;
  const isLog = isLogUser || isLogKid;

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
        {notForKids && <Route path="/profil/utilisateur/compte" element={<AccountManagement />} />}
        {isLog && <Route path="/profil/enfant" element={<HomeKid />} />}
        {isLog && <Route path="/recherche" element={<Search />} />}
        {isLog && <Route path="/mes-livres" element={<MyBooks />} />}
        {isLog && <Route path="/recompenses" element={<Rewards />} />}
        {isLog && <Route path="/recherche/voir-livre" element={<Book />} />}
        <Route path="*" element={<h1>404</h1>} />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
