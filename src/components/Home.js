import React, { useEffect } from 'react';
import { v4 as uuid } from 'uuid';
import dayjs from 'dayjs';
import { useApp } from '../context/AppContext';
import { useLocation } from 'react-router-dom';
import Carousel from './Carousel';
import { MoviePosterCard } from './Card';
import styled from 'styled-components';
import { colors, fonts, borderRadius } from '../containts/styles.defaults';

export default function Home() {
  const { state, updateState } = useApp();
  const location = useLocation();

  const page =
    location?.hash === ''
      ? 'Now Showing'
      : location?.hash?.split('#')[1] === 'NowShowing'
      ? 'Now Showing'
      : 'Coming Soon';

  useEffect(() => {
    if (!state.isLoading) {
      if (state.current_page === '') {
        return updateState({
          ...state,
          current_page: page,
        });
      }
      if (state.current_page !== page) {
        updateState({ ...state, current_page: page });
      }
    }
  }, [state.current_page, state.site, state.isLoading]);

  useEffect(() => {
    if (!state.isLoading) {
      localStorage.setItem(
        'state',
        JSON.stringify({
          ...state,
          current_page: page,
        })
      );
    }
  }, [state, state.isLoading]);

  return (
    <Container>
      <Carousel films={state.films} />
      <Section>
        <MovieListContainer>
          <Title>{state?.current_page}</Title>
          {state?.films
            ?.filter((movie) => movie.data.category === state.current_page)
            ?.map((movie) => (
              <MoviePosterCard
                key={uuid()}
                id={movie.id}
                movie={movie.data}
                state={state}
                updateState={updateState}
              />
            ))}
          {state.films.filter(
            (movie) => movie.data.category === state.current_page
          ).length === 0 && <h2>Currently No Coming Soon</h2>}
        </MovieListContainer>
      </Section>
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
`;

const Section = styled.section`
  position: relative;
  top: -15rem;
  display: flex;
  justify-content: center;
  background: linear-gradient(to top, hsla(0, 0%, 5%, 1) 90%, transparent);
  @media only screen and (max-width: 960px) {
    top: 0;
    margin-bottom: 4rem;
  }
`;

const MovieListContainer = styled.div`
  position: relative;
  z-index: 2;
  top: 0;
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 4rem;
  margin-bottom: 0;
  padding: 2rem;
  border-radius: ${borderRadius.sm};
  min-height: 25rem;
  color: ${colors.white[200]};
  @media only screen and (max-width: 760px) {
    grid-template-columns: 1fr;
    top: 5rem;
    margin-bottom: 2rem;
    border: none;
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
