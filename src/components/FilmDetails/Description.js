import React from 'react';

//***** Components *****/
import Poster from './Poster';
import Plot from './Plot';
import Genres from './Genres';
import Extra from './Extras';
import Showtimes from './Showtimes';
import Cast from './Cast';

import styled from 'styled-components';
import { colors, fonts } from '../../containts/styles.defaults';

const Description = ({ movie, site }) => {
  return (
    <Container>
      <Poster movie={movie} />
      <Section>
        <Genres genres={movie?.data.genres} />
        <Plot plot={movie?.data.plot} />
        <Extra movie={movie} title='Directors' keys='director' />
        <Extra movie={movie} title='Writers' keys='writer' />
        <Cast cast={movie.data.actors} />
      </Section>
      <Showtimes shows={movie?.data.shows} site={site} />
    </Container>
  );
};

export default Description;

const Container = styled.div`
  display: grid;
  grid-template-columns: 0.5fr 2fr 1fr;
  gap: 1rem;
  margin-top: 2rem;
  @media only screen and (max-width: 400px) {
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 100%;
  }
  @media only screen and (min-width: 401px) and (max-width: 1200px) {
    display: flex;
    flex-direction: column;
  }
`;

const Section = styled.div`
  & p {
    padding-bottom: 1rem;
    color: ${colors.white[200]};
    font-family: ${fonts.EncodeSans};
    font-size: 1.2rem;
    letter-spacing: 0.04rem;
    border-bottom: 1px solid ${colors.white[600]};
    &:last-child {
      border: none;
    }
  }
`;
