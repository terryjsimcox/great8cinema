import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import axios from 'axios';
import { useApp } from '../context/AppContext';

//***** Components *****/
import ScrollToTop from './ScrollToTop';
import Navbar from './Navbar';
import Home from './Home';
import AboutUs from './AboutUs';
import GiftCards from './GiftCards/GiftCards';
import ContactUs from './ContactUs';
import { FilmDetails } from './FilmDetails';
import Footer from './Footer';

import Great8Favicon from '../assets/images/Great8Favicon.ico';
import SullivanFavicon from '../assets/images/SullivanFavicon.ico';

import styled from 'styled-components';

const App = () => {
  const { state, updateState } = useApp();
  const [isLoaded, setIsLoaded] = useState(false);
  const [site, setSite] = useState('');
  const checkLoaded = () => {
    setIsLoaded(true);
  };

  const getFilms = async () => {
    const site =
      window.location.hostname === 'sullivan6cinema.terrysimcox.com'
        ? 'sullivan'
        : 'great8';
    setSite(site);
    const results = await axios.get(
      `https://us-central1-great8cinema-a8432.cloudfunctions.net/GetFilms?site=${site}`
    );
    updateState({ ...state, films: results.data, hostname: site });
  };

  useEffect(() => {
    getFilms();
  }, []);

  useEffect(() => {
    window.addEventListener('load', checkLoaded);
    return () => window.removeEventListener('load', checkLoaded);
  }, [isLoaded]);

  useEffect(() => {
    document.title =
      site === 'sullivan' ? 'Sullivan 6 Cinema' : 'Great 8 Cinema';
    const favicon = document.querySelector('#favicon');
    console.log(site, window.location.hostname);
    favicon.href = site === 'sullivan' ? SullivanFavicon : Great8Favicon;
  }, [site]);
  return (
    <Container isLoaded={isLoaded}>
      <Router>
        <ScrollToTop />
        <Navbar state={state} updateState={updateState} />
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/GiftCards' element={<GiftCards site={site} />} />
          <Route path='/ContactUs' element={<ContactUs site={site} />} />
          <Route path='/AboutUs' element={<AboutUs />} />
          <Route path='/film/:id' element={<FilmDetails />} />
        </Routes>
        <Footer />
      </Router>
    </Container>
  );
};
export default App;
const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  min-height: 100vh;
  opacity: ${({ isLoaded }) => (isLoaded ? 1 : 0)};
`;
