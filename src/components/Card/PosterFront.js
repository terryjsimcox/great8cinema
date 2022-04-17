import React, { useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const PosterFront = ({
  isLoaded = false,
  setIsLoaded = null,
  src = '',
  alt = '',
}) => {
  const imgRef = useRef();

  const imgLoaded = (e) => {
    if (e.type === 'load') setIsLoaded(true);
  };

  useEffect(() => {
    imgRef?.current?.addEventListener('load', (e) => imgLoaded(e));
  }, [imgRef]);

  return (
    <Container loaded={isLoaded ? 1 : 0}>
      <img ref={imgRef} src={src} alt={alt} />
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
  opacity: ${({ loaded }) => loaded};

  & img {
    width: 18rem;
    height: 27rem;
    border-radius: 1rem;
  }
`;
