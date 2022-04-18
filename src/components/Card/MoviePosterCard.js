import React, { useState } from "react";
import PropTypes from "prop-types";
import PosterFront from "./PosterFront";
import MovieTimesBack from "./MovieTimesBack";

import styled from "styled-components";

const MoviePosterCard = ({
  id = null,
  movie = {},
  state = {},
  updateState = null,
  testing = false,
}) => {
  const [isLoaded, setIsLoaded] = useState(false);
  return (
    <Container>
      <PosterFront
        isLoaded={isLoaded || testing}
        setIsLoaded={setIsLoaded}
        src={movie.poster}
        alt={movie.title}
      />
      <MovieTimesBack
        isLoaded={isLoaded}
        id={id}
        shows={movie.shows}
        state={state}
        updateState={updateState}
      />
    </Container>
  );
};

MoviePosterCard.propTypes = {
  movie: PropTypes.object,
  state: PropTypes.object,
  updateState: PropTypes.func,
};

export default MoviePosterCard;

const Container = styled.div`
  position: relative;
  width: 18rem;
  height: 27rem;
  border-radius: 1rem;
  background-color: white;
  animation: skeletion-loading 2s linear infinite alternate;

  @keyframes skeletion-loading {
    0% {
      background-color: hsl(0, 0%, 25%);
    }
    100% {
      background-color: hsl(0, 0%, 50%);
    }
  }
  &:hover {
    & > div:last-child {
      transform: scale(1);
      transition: transform 0.6s ease-in-out;
    }
  }
`;
