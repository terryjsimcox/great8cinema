import React from 'react';

import styled from 'styled-components';

const PosterFront = ({ src, alt }) => {
  return (
    <Container>
      <Image src={src} alt={alt}></Image>
    </Container>
  );
};

export default PosterFront;

const Container = styled.div`
  display: flex;
  align-items: center;
  justify-items: center;
  img {
    width: 18rem;
    height: 27rem;
    border-radius: 1rem;
  }
`;
const Image = styled.img`
  width: 18rem;
  height: 27rem;
  border-radius: 1rem;
`;
