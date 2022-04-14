import React, { useEffect, useState } from 'react';
import { v4 as uuid } from 'uuid';
import { useApp } from '../context/AppContext';
import { useParams, useLocation } from 'react-router-dom';
import Carousel from './Carousel';
import { MoviePosterCard } from './Card';
import styled from 'styled-components';
import { colors, fonts, borderRadius } from '../containts/styles.defaults';

export default function Home() {
  const { state, updateState } = useApp();
  const location = useLocation();
  const [isLoading, setIsLoading] = useState(state.isLoading);

  const stateCheck = () => {
    if (document.readyState === 'complete') {
      console.log('Document is ready...');
      setIsLoading(false);
      document.removeEventListener('readystatechange', stateCheck);
    }
  };

  useEffect(() => {
    const data = window.localStorage.getItem('state');
    updateState(JSON.parse(data));
  }, []);

  useEffect(() => {
    if (state.current_page === '')
      updateState({ ...state, current_page: 'Now Showing' });
  }, [state.current_page]);

  useEffect(() => {
    if (!state.isLoading)
      localStorage.setItem(
        'state',
        JSON.stringify({
          ...state,
          current_page: 'Now Showing',
          isLoading: false,
        })
      );
  }, [state]);

  useEffect(() => {
    document.addEventListener('readystatechange', stateCheck);
  }, [state.isLoading]);

  useEffect(() => {
    const hash = location?.hash?.split('#')[1]?.split('%20');
    const page = hash?.length > 0 ? `${hash[0]} ${hash[1]}` : 'Now Showing';
    console.log(hash);
    updateState({
      ...state,
      isLoading: false,
      current_page: page || 'Now Showing',
    });
  }, [isLoading]);

  if (!state.isLoading)
    return (
      <Container>
        <Carousel />
        <Section>
          <MovieListContainer>
            <Title>{state?.current_page}</Title>
            {state.films
              ?.filter((movie) => movie.data.category === state.current_page)
              ?.map((movie) => (
                <MoviePosterCard key={uuid()} movie={movie} />
              ))}
          </MovieListContainer>
        </Section>
      </Container>
    );

  return <div>Loading...</div>;
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
  margin-bottom: 4rem;
  background: linear-gradient(to top, hsla(0, 0%, 5%, 1) 90%, transparent);
`;

const MovieListContainer = styled.div`
  position: relative;
  z-index: 2;
  top: 0;
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 4rem;
  width: fit-content;
  margin-bottom: 0;
  padding: 2rem;
  background: hsla(0, 0%, 5%, 0.5);
  border: 2px solid ${colors.white[700]};
  border-radius: ${borderRadius.sm};
  @media only screen and (max-width: 760px) {
    grid-template-columns: 1fr;
    top: 7rem;
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
