import React from 'react';

//***** Components *****/
import Poster from './Poster';
import Plot from './Plot';
import Genres from './Genres';
import Extra from './Extras';
import Showtimes from './Showtimes';

import styled from 'styled-components';
import { colors, fonts } from '../../containts/styles.defaults';

const Description = ({ movie }) => {
  return (
    <Container>
      <Poster movie={movie} />
      <Section>
        <Genres genres={movie.data.genres} />
        <Plot plot={movie.data.plot} />
        <Extra movie={movie} title='Dricetors' keys='director' />
        <Extra movie={movie} title='Writers' keys='writer' />
        <Extra movie={movie} title='Cast' keys='actors' />
      </Section>
      <Showtimes shows={movie.data.shows} />
    </Container>
  );
};

export default Description;

const Container = styled.div`
  display: grid;
  grid-template-columns: 0.5fr 2fr 1fr;
  gap: 1rem;
  margin-top: 2rem;
`;

const Section = styled.div`
  & p {
    padding-bottom: 1rem;
    color: ${colors.white[200]};
    font-family: ${fonts.EncodeSans};
    font-size: 1.2rem;
    letter-spacing: 0.04rem;
    border-bottom: 1px solid ${colors.white[600]};
  }
`;
