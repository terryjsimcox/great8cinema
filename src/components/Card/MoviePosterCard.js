import React from 'react';
import styled from 'styled-components';
import { borderRadius } from '../../containts/styles.defaults';

export default function MoviePosterCard({ src, alt }) {
  return (
    <Container>
      <Front>
        <img src={src} alt={alt} />
      </Front>
      <Back></Back>
    </Container>
  );
}

const Container = styled.div`
  position: relative;
  cursor: pointer;
  &:hover {
    & > div:last-child {
      transform: scale(1);
      transition: transform 0.6s ease-in-out;
    }
  }
`;
const Front = styled.div`
  display: flex;
  align-items: center;
  justify-items: center;
  img {
    width: 18rem;
    height: 27rem;
    border-radius: 1rem;
  }
`;
const Back = styled.div`
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  z-index: 2;
  background-color: rgba(0, 0, 0, 0.8);
  border-radius: ${borderRadius.md};
  transform: scale(0);
  transform-origin: center;
  transition: transform 0.4s ease-in-out;
  cursor: pointer;
`;
