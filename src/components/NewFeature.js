import React from 'react';
import styled from 'styled-components';
import { colors, fonts } from '../containts/styles.defaults';

const NewFeature = () => {
  return (
    <Container>
      <Section>
        <h1>Feature coming soon...</h1>
      </Section>
    </Container>
  );
};

export default NewFeature;

const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100vh;
`;

const Section = styled.section`
  display: flex;
  align-items: center;
  justify-content: center;
  & > h1 {
    color: ${colors.white[200]};
    font-size: 3rem;
    font-family: ${fonts.EncodeSans};
  }
`;
