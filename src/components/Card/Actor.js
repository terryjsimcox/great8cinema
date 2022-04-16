import React from 'react';

import styled from 'styled-components';
import { colors, fonts } from '../../containts/styles.defaults';
import { ImUser } from 'react-icons/im';
const Actor = ({ src, alt, name, character }) => {
  return (
    <Container>
      <Image>{src !== null ? <img src={src} alt={alt} /> : <ImUser />}</Image>
      <Content>
        <Title>{name}</Title>
        <Subtitle>
          {character?.map((char, index) => {
            if (index === 0) return char;
          })}
        </Subtitle>
      </Content>
    </Container>
  );
};

export default Actor;

const Container = styled.div`
  display: flex;
  align-items: center;
  @media only screen and (max-width: 1550px) {
    flex-direction: column;
  }
`;

const Image = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin-right: 1rem;
  width: 100px;
  aspect-ratio: 1 / 1;
  background-color: ${colors.dark[400]};
  border-radius: 50%;
  overflow: hidden;
  & svg {
    font-size: 5rem;
  }
  & img {
    width: 110px;
    aspect-ratio: 1 / 1;
    /* border-radius: 50%; */
  }
`;
const Content = styled.div``;
const Title = styled.h4`
  color: ${colors.white[200]};
  font-family: ${fonts.EncodeSans};
  margin-bottom: 0.5rem;
`;
const Subtitle = styled.p`
  border: none;
`;
