import React from 'react';
import { v4 as uuid } from 'uuid';
import { useApp } from '../context/AppContext';
import { useFirebase } from '../context/FirebaseContext';
import Carousel from './Carousel';
import { MoviePosterCard } from './Card';
import styled from 'styled-components';
import { colors, fonts } from '../containts/styles.defaults';

export default function Home() {
  const { state } = useApp();
  const { getUrl } = useFirebase();

  const url = async () => {
    const result = await getUrl('images', 'fb-button-icon.png');
    console.log(result);
  };

  url();
  return (
    <Container>
      <Carousel />
      <Section>
        <MovieListContainer>
          <Title>{state.current_page}</Title>
          {state.films.map((movie) => (
            <MoviePosterCard
              key={uuid()}
              src={movie.data.poster}
              alt={movie.data.title}
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
