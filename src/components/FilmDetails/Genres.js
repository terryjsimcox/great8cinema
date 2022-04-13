import React from 'react';
import { v4 as uuid } from 'uuid';
import styled from 'styled-components';
import { colors, fonts } from '../../containts/styles.defaults';

const Genres = ({ genres }) => {
  return (
    <Container>
      {genres?.map((genre) => (
        <li key={uuid()}>{genre}</li>
      ))}
    </Container>
  );
};

export default Genres;

const Container = styled.ul`
  display: flex;
  margin-bottom: 2rem;
  & > li {
    margin-right: 1rem;
    padding: 0.5rem 1rem;
    color: ${colors.white[200]};
    font-family: ${fonts.EncodeSans};
    letter-spacing: 0.04rem;
    border: 2px solid ${colors.white[200]};
    border-radius: 1.5rem;
  }
`;
