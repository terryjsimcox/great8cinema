import React from 'react';
import { v4 as uuid } from 'uuid';
import styled from 'styled-components';
import { colors, fonts } from '../../containts/styles.defaults';

const Extras = ({ movie, title, keys }) => {
  return (
    <Container>
      <h4>{title}</h4>
      <ul>
        {movie.data[keys].map((value) => (
          <li key={uuid()}>{value}</li>
        ))}
      </ul>
    </Container>
  );
};

export default Extras;

const Container = styled.div`
  display: flex;
  align-items: center;
  margin: 1rem 0;
  padding-bottom: 1rem;
  border-bottom: 1px solid ${colors.white[600]};
  & h4 {
    margin-right: 1rem;
    color: ${colors.white[200]};
    font-family: ${fonts.EncodeSans};
    letter-spacing: 0.04rem;
    font-size: 1.2rem;
  }
  & ul {
    display: flex;
    flex-wrap: wrap;
    & li {
      margin-right: 1rem;
      color: ${colors.white[200]};
      font-family: ${fonts.EncodeSans};
      letter-spacing: 0.04rem;
      font-size: 1.2rem;
      letter-spacing: 0.04rem;
    }
  }
`;
