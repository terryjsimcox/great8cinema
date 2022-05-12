import React, { useEffect, useState, useRef } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import { useAxios } from '../hooks';

//***** Components *****/
import ScrollToTop from './ScrollToTop';
import Navbar from './Navbar';
import Home from './Home';
import AboutUs from './AboutUs';
import GiftCards from './GiftCards/GiftCards';
import ContactUs from './ContactUs';
import NewFeature from './NewFeature';
import { FilmDetails } from './FilmDetails';
import Footer from './Footer';
import { Employment, Loader } from '../components';

import styled from 'styled-components';

import Great8Favicon from '../assets/images/Great8Favicon.ico';
import SullivanFavicon from '../assets/images/SullivanFavicon.ico';

const App = () => {
  const { state, updateState } = useApp();
  const [site, setSite] = useState(null);
  const renders = useRef(0);
  renders.current++;
  const { data, fetchError, isLoading } = useAxios(
    `https://us-central1-great8cinema-a8432.cloudfunctions.net/GetFilms?site=${state.site.short}`
  );

  useEffect(() => {
    getSiteAndSet(window, setSite, state, updateState);
  }, []);

  useEffect(() => {
    if (!fetchError) {
      updateState({ ...state, films: data, isLoading });
    }
  }, [state.site, data, fetchError, isLoading]);

  if (isLoading) {
    return <Loader />;
  }

  return (
    <Container isLoading={isLoading}>
      <Router>
        <ScrollToTop />
        <Navbar state={state} updateState={updateState} />
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/GiftCards' element={<GiftCards site={site} />} />
          <Route path='/ContactUs' element={<ContactUs site={site} />} />
          <Route path='/AboutUs' element={<AboutUs />} />
          <Route path='/Employment' element={<NewFeature />} />
          <Route path='/film/:id' element={<FilmDetails site={site} />} />
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
  opacity: ${({ isLoading }) => (isLoading ? 0 : 1)};
`;

// HELPER FUNCTIONS

async function getSiteAndSet(window, setSite, state, updateState) {
  const tempSite =
    window.location.hostname === 'sullivan6cinema.terrysimcox.com'
      ? await import('../containts/Site').then(({ Sullivan }) => Sullivan)
      : await import('../containts/Site').then(({ Great8 }) => Great8);

  window.document.title = tempSite.title;
  const favicon = window.document.querySelector('#favicon');
  favicon.href =
    tempSite.short === 'sullivan' ? SullivanFavicon : Great8Favicon;
  updateState({
    ...state,
    site: tempSite,
  });
  setSite(tempSite);
}
