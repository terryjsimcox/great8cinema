import React, { useCallback, useEffect, useRef, useState } from 'react';
import { FaArrowAltCircleRight, FaArrowAltCircleLeft } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import { v4 as uuid } from 'uuid';
import styled from 'styled-components';
import { colors, fonts } from '../containts/styles.defaults';

export default function Carousel({
  films,
  dots = false,
  duration = 10000,
  pauseOnHover = false,
  autoPlay = false,
}) {
  const [current, setCurrent] = useState(0);

  const carouselRef = useRef();
  const timerID = useRef();

  const length = films.filter(
    (filter) => filter.data.category !== 'Archived'
  ).length;

  const nextSlide = () => {
    setCurrent(current === length - 1 ? 0 : current + 1);
  };

  const prevSlide = () => {
    setCurrent(current === 0 ? length - 1 : current - 1);
  };

  const startTimer = useCallback(() => {
    timerID.current = setInterval(() => {
      setCurrent((prevCurrent) =>
        prevCurrent === length - 1 ? 0 : prevCurrent + 1
      );
    }, duration);
  }, [length, duration]);

  const stopTimer = (intervalId) => {
    clearInterval(intervalId);
  };

  useEffect(() => {
    if (autoPlay) {
      startTimer(duration);
    }
    return () => {
      if (autoPlay) {
        stopTimer(timerID.current);
      }
    };
  }, [autoPlay]);

  useEffect(() => {
    const listners = carouselRef.current;
    if (pauseOnHover) {
      listners.addEventListener('mouseenter', () => stopTimer(timerID.current));
      listners.addEventListener('mouseleave', () => startTimer(duration));
    }

    return () => {
      if (pauseOnHover) {
        listners.removeEventListener('mouseenter', () =>
          stopTimer(timerID.current)
        );
        listners.removeEventListener('mouseleave', () => startTimer(duration));
      }
    };
  }, [pauseOnHover]);
  return (
    <Container>
      <StyledCarousel ref={carouselRef} className='carousel'>
        <FaArrowAltCircleLeft className='left-arrow' onClick={prevSlide} />
        <FaArrowAltCircleRight className='right-arrow' onClick={nextSlide} />
        {films
          ?.filter((query) => query.data.category !== 'Archived')
          ?.map((film, index) => {
            return (
              <ImgContainer
                key={`${film.data.title}${index}`}
                className={current === index ? 'slide active' : 'slide'}>
                <img src={film.data.backdrop} alt={film.data.title} />
                <FilmLogo
                  className={current === index ? 'slide active' : 'slide'}
                  filmlogo={film.data?.filmLogo}>
                  {film.data?.filmLogo && film.data?.filmLogo?.path !== '' ? (
                    <img
                      src={film.data?.filmLogo?.path}
                      alt={film.data.title}
                      filmlogo={film.data?.filmLogo}
                    />
                  ) : (
                    <h2>{film.data.title}</h2>
                  )}
                  <div>
                    {film.data?.filmLogo?.caption && (
                      <h3>{film.data?.filmLogo?.caption}</h3>
                    )}
                    <Link
                      className={
                        current === index ? 'link slide active' : 'link slide'
                      }
                      to={`film/${film.id}`}
                      filmlogo={film.data?.filmLogo}>
                      Get Tickets Now
                    </Link>
                  </div>
                </FilmLogo>
              </ImgContainer>
            );
          })}
      </StyledCarousel>
      {dots && (
        <DotContainer className='dots'>
          {[...Array(length)].map((e, index) => (
            <Dot
              key={uuid()}
              className={index === current ? 'active' : ''}
              onClick={() => setCurrent(index)}></Dot>
          ))}
        </DotContainer>
      )}
    </Container>
  );
}

const ContainerWidth = `1200px`;
const ContainerHeight = '600px';

const Container = styled.div`
  position: relative;
  top: 5rem;
  display: block;
  width: 100%;
  height: ${ContainerHeight};
  margin: 0 auto;
  border-bottom: 2px solid #817e7e;
  overflow: hidden;
  &:hover {
    & > .dots {
      opacity: 1;
    }
    & > div > .left-arrow,
    & > div > .right-arrow {
      opacity: 1;
    }
  }
  @media only screen and (max-width: 768px) {
    display: none;
  }

  @media only screen and (min-width: 769px) and (max-width: 1024px) {
    height: 426px;
  }

  @media only screen and (min-width: 1025px) and (max-width: 1200px) {
    height: 525px;
  }
  @media only screen and (min-width: 1201px) {
    height: ${ContainerHeight};
  }
`;

const StyledCarousel = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
  background-color: hsl(0, 0%, 0%);
  &:hover {
  }

  & > .left-arrow,
  & > .right-arrow {
    position: absolute;
    top: 50%;
    z-index: 5;
    font-size: 2.5rem;
    color: ${colors.white[200]};
    cursor: pointer;
    user-select: none;
    opacity: 0;
    transition: opacity 2s ease;
    &:hover {
      color: ${colors.white[100]};
    }
  }

  & > .left-arrow {
    left: 2rem;
  }

  & > .right-arrow {
    right: 2rem;
  }

  & > .slide {
    opacity: 0;
    /* transition: opacity 2s ease; */
  }

  & > .slide.active {
    opacity: 1;
  }

  @media only screen and (min-width: 769px) and (max-width: 1024px) {
    height: 426px;
  }

  @media only screen and (min-width: 1025px) and (max-width: 1200px) {
    height: 525px;
  }
  @media only screen and (min-width: 1201px) {
    height: ${ContainerHeight};
  }
`;

const ImgContainer = styled.div`
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 100%;
  & img {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 800px;
    @media only screen and (min-width: 769px) and (max-width: 1024px) {
      height: 426px;
    }

    @media only screen and (min-width: 1025px) and (max-width: 1200px) {
      height: 525px;
    }
  }
  @media only screen and (min-width: 769px) and (max-width: 1024px) {
    height: 426px;
  }

  @media only screen and (min-width: 1025px) and (max-width: 1200px) {
    height: 525px;
  }
`;

const FilmLogo = styled.div`
  position: absolute;
  left: 0;
  z-index: 2;
  display: flex;
  align-items: center;
  width: 100%;
  height: 100%;

  & > h2 {
    position: absolute;
    top: 2rem;
    left: 7.5rem;
    font-size: 3rem;
    font-family: ${fonts.Poppins};
    color: ${colors.white[100]};
  }

  & > img {
    position: absolute;
    z-index: 3;
    top: 2rem;
    left: 7.5rem;
    width: 250px;
    height: ${({ filmlogo }) => (filmlogo?.height ? filmlogo?.height : 100)}px;
  }

  & > div {
    position: absolute;
    right: calc(7.5rem + 18px);
    bottom: 2rem;
    width: 20rem;
  }

  & > div > h3 {
    position: relative;
    right: 0;
    color: ${colors.white[100]};
    font-family: ${fonts.Poppins};
    font-size: 1.2rem;
    font-weight: 400;
  }
  & > div > .link {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    height: 50px;
    margin-top: 2rem;
    padding: 1rem 2rem;
    color: ${colors.white[100]};
    font-size: 1.2rem;
    background-color: ${({ filmlogo }) =>
      filmlogo?.buttonColor ? filmlogo?.buttonColor : '#398ff3'};
    border-radius: 0.5rem;
  }
`;

const DotContainer = styled.div`
  position: absolute;
  z-index: 5;
  bottom: 0;
  left: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  transform: translateX(-50%);
  margin-bottom: 2rem;
  opacity: 0;
  transition: opacity 2s ease;
  @media only screen and (min-width: 1025px) and (max-width: 1200px) {
    display: none;
  }
`;
const Dot = styled.div`
  content: '';
  width: 25px;
  height: 25px;
  margin-right: 1rem;
  border-radius: 50%;
  background-color: ${colors.white[700]};
  cursor: pointer;
  &:hover {
    background-color: ${colors.white[100]};
  }
  &.active {
    background-color: ${colors.white[100]};
  }
`;
