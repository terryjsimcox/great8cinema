import React, { useEffect } from 'react';
import axios from 'axios';
import { HashRouter as Router, Route, Routes } from 'react-router-dom';
import { useApp } from '../context/AppContext';

//***** Components *****/
import ScrollToTop from './ScrollToTop';
import Navbar from './Navbar';
import Home from './Home';
import GiftCards from './GiftCards/GiftCards';
import ContactUs from './ContactUs';
import { FilmDetails } from './FilmDetails';
import Footer from './Footer';

import styled from 'styled-components';

export default function App() {
  const { updateState } = useApp();

  const getFilms = async () => {
    const results = await axios.get(
      'https://us-central1-great8cinema-a8432.cloudfunctions.net/GetFilms'
    );
    updateState('films', results.data);
  };

  useEffect(() => {
    getFilms();
  }, []);

  return (
    <Container>
      <Router>
        <ScrollToTop />
        <Navbar />
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/Gift%20Cards' element={<GiftCards />}></Route>
          <Route path='/Contact%20Us' element={<ContactUs />}></Route>
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
