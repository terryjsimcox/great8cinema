import React from 'react';
import { HashRouter as Router, Route, Routes } from 'react-router-dom';

import Navbar from './Navbar';
import Home from './Home';

import styled from 'styled-components';

export default function App() {
  return (
    <Container>
      <Router>
        <Navbar />
        <Routes>
          <Route path='/' element={<Home />} />
        </Routes>
      </Router>
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  justify-content: center;
`;
