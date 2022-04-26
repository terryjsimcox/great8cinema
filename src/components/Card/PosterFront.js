import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const PosterFront = ({ isLoaded, setIsLoaded, src, alt }) => {
  return (
    <Container loaded={isLoaded ? 1 : 0}>
      <img src={src} alt={alt} />
    </Container>
  );
};

PosterFront.propTypes = {
  isLoaded: PropTypes.bool,
  setIsLoaded: PropTypes.func,
  src: PropTypes.string,
  alt: PropTypes.string,
};

export default PosterFront;

const Container = styled.div`
  display: flex;
  align-items: center;
  justify-items: center;
  width: 18rem;
  height: 27rem;
  border-radius: 1rem;

  & img {
    width: 18rem;
    height: 27rem;
    border-radius: 1rem;
  }
`;
