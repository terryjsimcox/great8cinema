import React from 'react';
import styled from 'styled-components';
import { colors, fonts } from '../../containts/styles.defaults';

const Plot = ({ plot }) => {
  return (
    <Container>
      <p>{plot}</p>
    </Container>
  );
};

export default Plot;

const Container = styled.div`
  & p {
    padding-bottom: 1rem;
    color: ${colors.white[200]};
    font-family: ${fonts.EncodeSans};
    font-size: 1.2rem;
    letter-spacing: 0.04rem;
    border-bottom: 1px solid ${colors.white[600]};
  }
`;
