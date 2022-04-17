import React from 'react';
import PropTypes from 'prop-types';

import styled from 'styled-components';
import { colors, fonts } from '../../containts/styles.defaults';
import { ImUser } from 'react-icons/im';

const Actor = ({ src = '', alt = '', name = '', character = [] }) => {
  return (
    <Container>
      <Image className={name === null && 'loading'}>
        {src !== null ? <img src={src} alt={alt} /> : <ImUser />}
      </Image>
      <Content>
        <Title className={name === null && 'loading'}>{name}</Title>
        <Subtitle className={name === null && 'loading'}>
          {character?.map((char, index) => {
            if (index === 0) return char;
          })}
        </Subtitle>
      </Content>
    </Container>
  );
};

Actor.propTypes = {
  src: PropTypes.string,
  alt: PropTypes.string,
  name: PropTypes.string,
  character: PropTypes.array,
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
  height: 100px;
  background-color: ${colors.dark[400]};
  border-radius: 50%;
  overflow: hidden;
  & svg {
    font-size: 5rem;
  }
  & img {
    width: 100px;
    height: 140px;
  }
  &.loading {
    animation: skeletion-loading 2s linear infinite alternate;
    & svg {
      display: none;
    }
  }
`;

const Content = styled.div``;

const Title = styled.h4`
  color: ${colors.white[200]};
  font-family: ${fonts.EncodeSans}, EncodeSans, sans-serif;
  letter-spacing: 0.04rem;
  margin-bottom: 0.5rem;

  &.loading {
    width: 200px;
    height: 20px;
    border-radius: 2px;
    animation: skeletion-loading 2s linear infinite alternate;
  }

  @keyframes skeletion-loading {
    0% {
      background-color: hsl(0, 0%, 25%);
    }
    100% {
      background-color: hsl(0, 0%, 50%);
    }
  }
`;
const Subtitle = styled.p`
  color: ${colors.white[200]};
  font-family: ${fonts.EncodeSans}, EncodeSans, sans-serif;
  letter-spacing: 0.04rem;
  border: none;
  &.loading {
    width: 200px;
    height: 15px;
    border-radius: 2px;
    animation: skeletion-loading 2s linear infinite alternate;
  }
`;
