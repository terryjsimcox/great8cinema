import React, { useEffect, useState } from 'react';
import { v4 as uuid } from 'uuid';
import { useApp } from '../context/AppContext';
import { useLocation } from 'react-router-dom';
import Carousel from './Carousel';
import { MoviePosterCard } from './Card';
import styled from 'styled-components';
import { colors, fonts, borderRadius } from '../containts/styles.defaults';

const carouselSettings = {
  dots: true,
  pauseOnHover: true,
  duration: 20000,
  autoPlay: true,
};

export default function Home() {
  const { state, updateState } = useApp();
  const [movieFilter, setMovieFilter] = useState('Now Showing');
  const location = useLocation();

  useEffect(() => {
    if (!state.isLoading) {
      localStorage.setItem(
        'state',
        JSON.stringify({
          ...state,
        })
      );
    }
  }, [state, state.isLoading]);

  return (
    <Container>
      <Carousel films={state.films} {...carouselSettings} />
      <Section id={movieFilter}>
        <Filter>
          <Title>
            <h2>{movieFilter}</h2>
            <div>
              <ul>
                <ShowingLinks
                  active={movieFilter === 'Now Showing' ? true : false}
                  className={movieFilter === 'Now Showing' ? 'active' : ''}
                  onClick={() => setMovieFilter('Now Showing')}>
                  Now Showing
                </ShowingLinks>
                <ShowingLinks
                  active={movieFilter === 'Coming Soon' ? true : false}
                  className={movieFilter === 'Coming Soon' ? 'active' : ''}
                  onClick={() => setMovieFilter('Coming Soon')}>
                  Coming Soon
                </ShowingLinks>
              </ul>
            </div>
          </Title>

          <MovieListContainer>
            {state?.films
              ?.filter((movie) => movie.data.category === movieFilter)
              ?.map((movie) => (
                <MoviePosterCard
                  key={uuid()}
                  id={movie.id}
                  movie={movie.data}
                  state={state}
                  updateState={updateState}
                />
              ))}
            {state.films.filter((movie) => movie.data.category === movieFilter)
              .length === 0 && <h2>Currently No Coming Soon</h2>}
          </MovieListContainer>
        </Filter>
      </Section>
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
  border-bottom: 2px solid #817e7e;
  overflow: hidden;
  padding-bottom: 5rem;
`;

const Section = styled.section`
  position: relative;
  top: 5rem;
  display: flex;
  justify-content: center;
  height: 100%;
  background-image: url('images/prism.png');
  background-repeat: repeat;
`;

const Filter = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  background-color: hsla(0, 0%, 0%, 50%);
`;

const MovieListContainer = styled.div`
  position: relative;
  z-index: 2;
  top: 0;
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 10rem 10rem;
  width: calc(100% - 15rem);
  padding-top: 2rem;
  padding-bottom: 2rem;
  border-radius: ${borderRadius.sm};
  height: 100%;
  color: ${colors.white[200]};

  @media only screen and (max-width: 768px) {
    display: flex;
    flex-direction: column;
    align-items: center;
    border: none;
  }
  @media only screen and (min-width: 769px) and (max-width: 1100px) {
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

const ShowingLinks = styled.li`
  position: relative;
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  margin-right: 1.5rem;
  color: ${colors.white[200]};
  font-size: 1.2rem;
  cursor: pointer;
  user-select: none;

  &:last-child {
    margin-right: 0;
  }

  &:hover {
    color: ${colors.white[100]};
    &::after {
      transform: scale(1, 1);
    }
  }

  &::after {
    position: absolute;
    content: '';
    display: block;
    left: 0;
    right: 0;
    bottom: -0.5rem;
    height: 0.2rem;
    transform: scale(${({ active }) => (active ? 1 : 0)}, 1);
    transition: transform 800ms ease-in-out;
    background-color: ${colors.secondary[400]};
    border-radius: ${borderRadius.sm};
    cursor: default;
  }

  &.active {
    color: ${colors.white[100]};
    font-weight: 600;
  }
`;

const Title = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  width: 100%;
  margin: 2rem 0;
  padding: 0 7.5rem;
  & > h2 {
    grid-column: 1/4;
    display: flex;
    align-items: center;
    color: ${colors.white[100]};
    font-size: 3rem;
    font-weight: ${fonts.weight[400]};
    font-family: ${fonts.EncodeSans};
    letter-spacing: ${fonts.letterSpacing};
  }
  & > div {
    display: flex;
    align-items: center;
    justify-content: flex-end;
    & > ul {
      display: flex;
      @media only screen and (min-width: 360px) and (max-width: 526px) {
        flex-direction: column;
        & > li {
          margin-top: 2rem;
          margin-right: 0;
        }
      }
    }
  }
  @media only screen and (max-width: 768px) {
    flex-direction: column;
    align-items: center;
    gap: 2rem;
  }
`;
