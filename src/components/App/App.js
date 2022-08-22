import React from 'react';
import { Route, Routes } from 'react-router-dom';

import Navbar from '../Navbar/Navbar'
import Home from '../Home/Home'
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

import './App.scss';
import UserLogin from '../UserLogin/UserLogin';

function App() {
  return (
    <div className="App">
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/inscription" element={<Register />} />
        <Route path='/connexion-parent' element={<UserLogin />} />
        <Route path="/profil" element={<Profiles />} />
        <Route path="/mentions-legales" element={<Legal />} />
        <Route path="/tutoriel" element={<Tutorial />} />
        <Route path="/faq" element={<Faq />} />
        <Route path="/cookies" element={<Cookies />} />
        <Route path="/a-propos" element={<About />} />
        <Route path="/profil/utilisateur" element={<HomeUser />} />
        <Route path="/profil/utilisateur/compte" element={<AccountManagement />} />
        <Route path="/profil/enfant" element={<HomeKid />} />
        <Route path="/recherche" element={<Search />} />
        <Route path="/mes-livres" element={<MyBooks />} />
        <Route path="/recompenses" element={<Rewards />} />
        <Route path="/recherche/voir-livre" element={<Book />} />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
