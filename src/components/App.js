import React, { useEffect, useState } from 'react';
import { HashRouter as Router, Route, Routes } from 'react-router-dom';
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

import styled from 'styled-components';

const App = () => {
  const { state, updateState } = useApp();
  const [isLoaded, setIsLoaded] = useState(false);

  const checkLoaded = () => {
    setIsLoaded(true);
  };

  const getFilms = async () => {
    const results = await axios.get(
      'https://us-central1-great8cinema-a8432.cloudfunctions.net/GetFilms'
    );
    updateState({ ...state, films: results.data });
  };

  useEffect(() => {
    getFilms();
  }, []);

  useEffect(() => {
    window.addEventListener('load', checkLoaded);
    return () => window.removeEventListener('load', checkLoaded);
  }, []);

  return (
    <Container isLoaded={isLoaded}>
      <Router>
        <ScrollToTop />
        <Navbar state={state} updateState={updateState} />
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/Gift%20Cards' element={<GiftCards />}></Route>
          <Route path='/Contact%20Us' element={<ContactUs />}></Route>
          <Route path='/About%20Us' element={<AboutUs />}></Route>
          <Route path='/film/:id' element={<FilmDetails />}></Route>
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
