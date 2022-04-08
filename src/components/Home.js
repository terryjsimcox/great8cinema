import React from 'react';
import { v4 as uuid } from 'uuid';
import { Link } from 'react-router-dom';
import { useApp } from '../context/AppContext';

import Carousel from './Carousel';
import { MoviePosterCard } from './Card';

import styled from 'styled-components';
import { colors, fonts, borderRadius } from '../containts/styles.defaults';

export default function Home() {
  const movieList = [
    {
      title: 'Father Stu',
      poster: '/images/FatherStu.jpg',
    },
    {
      title: 'Fantastic Beasts',
      poster: '/images/FantasticBeasts.jpg',
    },
    {
      title: 'Ambulance',
      poster: '/images/Ambulance.jpg',
    },
    {
      title: 'Sonic the Hedgehog 2',
      poster: '/images/SonictheHedgehog2.jpg',
    },
    {
      title: 'The Lost City',
      poster: '/images/TheLostCity.jpg',
    },
    {
      title: 'Uncharted',
      poster: '/images/Uncharted.jpg',
    },
    {
      title: 'Spider-Man',
      poster: '/images/Spider-Man.jpg',
    },
    {
      title: 'Dog',
      poster: '/images/Dog.jpg',
    },
  ];

  return (
    <Container>
      <Carousel />
      <Section>
        <MovieListContainer>
          <Title>Now Showing</Title>
          {movieList.map((movie) => (
            <MoviePosterCard
              key={uuid()}
              src={movie.poster}
              alt={movie.title}
            />
          ))}
        </MovieListContainer>
      </Section>
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  overflow: hidden;
`;

const Section = styled.section`
  display: flex;
  justify-content: center;
  margin-bottom: 4rem;
`;

const MovieListContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 4rem;
  width: fit-content;
  margin-top: 4rem;
  @media only screen and (max-width: 760px) {
    grid-template-columns: 1fr;
    & h2 {
      grid-column: 1/2;
    }
  }
  @media only screen and (min-width: 761px) and (max-width: 1100px) {
    grid-template-columns: repeat(2, 1fr);
    & h2 {
      grid-column: 1/3;
    }
  }
  @media only screen and (min-width: 1101px) and (max-width: 1400px) {
    grid-template-columns: repeat(3, 1fr);
    & h2 {
      grid-column: 1/4;
    }
  }
`;

const Title = styled.h2`
  grid-column: 1/5;
  margin-bottom: 2rem;
  color: ${colors.white[100]};
  font-size: 3rem;
  font-weight: ${fonts.weight[400]};
  font-family: ${fonts.EncodeSans};
  letter-spacing: ${fonts.letterSpacing};
`;
