import React, { useEffect } from "react";
import axios from "axios";
import { HashRouter as Router, Route, Routes } from "react-router-dom";
import { useApp } from "../context/AppContext";
import Navbar from "./Navbar";
import Home from "./Home";
import GiftCards from "./GiftCards/GiftCards";
import Footer from "./Footer";

import styled from "styled-components";

export default function App() {
  const { updateState } = useApp();

  const getFilms = async () => {
    const results = await axios.get(
      "https://us-central1-great8cinema-a8432.cloudfunctions.net/GetFilms"
    );
    updateState("films", results.data);
  };

  useEffect(() => {
    getFilms();
  }, []);

  return (
    <Container>
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/Gift%20Cards" element={<GiftCards />}></Route>
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
