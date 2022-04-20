import React from 'react';
import styled from 'styled-components';

const Poster = ({ movie }) => {
  return (
    <Container>
      <img src={movie?.data.poster} alt={movie?.data.title} />
    </Container>
  );
};

export default Poster;

const Container = styled.div`
  display: flex;
  align-items: center;
  width: 175px;
  height: 250px;
  margin: 0 auto;
  & img {
    width: 100%;
    height: 100%;
    border-radius: 5px;
  }
  /* @media only screen and (max-width: 1200px) {
    display: flex;
    align-items: center;
  } */
`;
