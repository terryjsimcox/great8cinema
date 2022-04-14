import React, { useEffect, useRef } from 'react';

import styled from 'styled-components';

const PosterFront = ({ isLoaded, setIsLoaded, src, alt }) => {
  const imgRef = useRef();

  const imgLoaded = (e) => {
    console.log(e, e.type);
    if (e.type === 'load') setIsLoaded(true);
  };

  useEffect(() => {
    imgRef.current.addEventListener('load', (e) => imgLoaded(e));
  }, []);

  return (
    <Container loaded={isLoaded ? 1 : 0}>
      <img ref={imgRef} src={src} alt={alt} />
    </Container>
  );
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
    background-color: white;
    animation: skeletion-loading 1s linear infinite alternate;
  }
`;
