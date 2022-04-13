import React, { useEffect, useState } from 'react';
import { useApp } from '../../context/AppContext';
import { useParams } from 'react-router-dom';
import dayjs from 'dayjs';
import Hero from './Hero';
import Description from './Description';
import styled from 'styled-components';
import { colors, fonts, borderRadius } from '../../containts/styles.defaults';

const FilmDetails = () => {
  const { id } = useParams();
  const { state } = useApp();
  const movie = state.films.filter((query) => query.id === id)[0];

  const convertMinutes = (time) => {
    const hours = Math.floor(time / 60);
    const minutes = Math.floor(time % 60);
    return `${hours}h ${minutes}m`;
  };

  if (id) {
    return (
      <Container>
        <Hero movie={movie} />
        <Section>
          <Details>
            <MovieDetails>
              <Title>{movie.data.title}</Title>
              <Subtitle>
                <p>{movie.data.year}</p>
                <div></div>
                <p>{movie.data.rating}</p>
                <div></div>
                <p>{convertMinutes(movie.data.length)}</p>
              </Subtitle>
              <Description movie={movie} />
            </MovieDetails>
          </Details>
        </Section>
      </Container>
    );
  }
  return <></>;
};

export default FilmDetails;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 100vw;
`;

const Section = styled.section`
  position: relative;
  display: flex;
  justify-content: center;
  height: inherit;
  background-color: hsla(0, 0%, 9%, 1);
`;

const Title = styled.h3`
  z-index: 2;
  color: ${colors.white[200]};
  font-family: ${fonts.EncodeSans};
  font-size: 2.5rem;
  letter-spacing: 0.04rem;
`;
const Details = styled.div`
  position: relative;
  top: -18.75rem;
  z-index: 2;
  display: flex;
  width: 70%;
  margin-bottom: -16.75rem;
  padding: 2rem;
  background-color: hsla(0, 0%, 9%, 0.8);
  border: 2px solid ${colors.white[700]};
  border-radius: ${borderRadius.sm};
`;

const MovieDetails = styled.div`
  display: flex;
  flex-direction: column;
  z-index: 2;
`;

const Subtitle = styled.section`
  display: flex;
  align-items: center;
  margin-top: 0.5rem;
  color: ${colors.white[200]};
  & p {
    font-family: ${fonts.EncodeSans};
    letter-spacing: 0.04rem;
  }
  & div {
    position: relative;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    width: 5px;
    height: 5px;
    margin: 0 0.5rem;
    background-color: ${colors.white[200]};
    border-radius: 50%;
  }
`;
