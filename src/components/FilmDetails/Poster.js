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
  width: 175px;
  height: 250px;
  & img {
    width: 100%;
    height: 100%;
    border-radius: 5px;
  }
`;
