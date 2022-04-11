import React from 'react';

import PosterFront from './PosterFront';
import MovieTimesBack from './MovieTimesBack';

import styled from 'styled-components';
import { borderRadius } from '../../containts/styles.defaults';

export default function MoviePosterCard({ movie }) {
  return (
    <Container>
      <PosterFront src={movie.data.poster} alt={movie.data.title} />
      <MovieTimesBack movie={movie} />
    </Container>
  );
}

const Container = styled.div`
  position: relative;
  &:hover {
    & > div:last-child {
      transform: scale(1);
      transition: transform 0.6s ease-in-out;
    }
  }
`;
