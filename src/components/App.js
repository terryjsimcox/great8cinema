import React, { useEffect } from 'react';
import axios from 'axios';
import { HashRouter as Router, Route, Routes } from 'react-router-dom';
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

export default function App() {
  const { state, updateState } = useApp();

  const getFilms = async () => {
    const results = await axios.get(
      'https://us-central1-great8cinema-a8432.cloudfunctions.net/GetFilms'
    );
    updateState({ ...state, films: results.data });
  };

  useEffect(() => {
    getFilms();
  }, []);

  return (
    <Container>
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
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  min-height: 100vh;
`;
