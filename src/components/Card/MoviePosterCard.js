import React, { useState } from 'react';

import PosterFront from './PosterFront';
import MovieTimesBack from './MovieTimesBack';

import styled from 'styled-components';

const MoviePosterCard = ({ movie }) => {
  const [isLoaded, setIsLoaded] = useState(false);
  return (
    <Container>
      <PosterFront
        isLoaded={isLoaded}
        setIsLoaded={setIsLoaded}
        src={movie.data.poster}
        alt={movie.data.title}
      />
      <MovieTimesBack isLoaded={isLoaded} movie={movie} />
    </Container>
  );
};

export default MoviePosterCard;

const Container = styled.div`
  position: relative;
  width: 18rem;
  height: 27rem;
  border-radius: 1rem;
  background-color: white;
  animation: skeletion-loading 1s linear infinite alternate;

  @keyframes skeletion-loading {
    0% {
      background-color: hsl(0, 0%, 15%);
    }
    100% {
      background-color: hsl(0, 0%, 25%);
    }
  }
  &:hover {
    & > div:last-child {
      transform: scale(1);
      transition: transform 0.6s ease-in-out;
    }
  }
`;
