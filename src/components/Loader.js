import React from 'react';
import styled from 'styled-components';
import { colors, fonts, borderRadius } from '../containts/styles.defaults';
import { ReactComponent as Popcorn } from '../assets/images/Popcorn.svg';

const Loader = () => {
  return (
    <Container>
      <Section>
        <Popcorn />
        <h2>Loading...</h2>
      </Section>
    </Container>
  );
};

export default Loader;

const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100vh;
`;
const Section = styled.section`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 500px;
  height: 300px;

  border-radius: ${borderRadius.sm};
  & > #spinner {
    margin-bottom: 2rem;
    stroke-dasharray: 639px;
    stroke-dashoffset: 639px;
    animation: line-animate 8s ease infinite;
  }
  h2 {
    margin-top: 1rem;
    color: ${colors.white[200]};
    font-family: ${fonts.EncodeSans};
  }

  @keyframes line-animate {
    to {
      stroke-dashoffset: 0;
    }
  }
  @keyframes spin {
    to {
      transform: rotateZ(360deg);
    }
  }
`;
