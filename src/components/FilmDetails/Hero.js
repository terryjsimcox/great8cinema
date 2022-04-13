import React from 'react';

import styled from 'styled-components';

const Hero = ({ movie }) => {
  return (
    <Container>
      <HeroImage src={movie?.data.backdrop} alt={movie?.data.title} />
      <div />
    </Container>
  );
};

export default Hero;

const Container = styled.div`
  position: relative;
  display: flex;
  width: 100vw;
  height: 100vh;
  & > div {
    content: '';
    position: absolute;
    z-index: 1;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    background: linear-gradient(to top, hsla(0, 0%, 9%, 1) 5%, transparent);
  }
`;

const HeroImage = styled.img`
  position: abolute;
  z-index: -1;
  top: 0;
  left: 0;
  width: 100%;
  height: 900px;
`;
