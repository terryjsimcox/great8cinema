import React from 'react';
import Slider from 'react-slick';
import { v4 as uuid } from 'uuid';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import CarouselSettings from '../containts/CarouselSettings';
import styled from 'styled-components';
import { colors } from '../containts/styles.defaults';

export default function Carousel({ films }) {
  const carouselHeight = 900;

  return (
    <Container carouselHeight={carouselHeight}>
      <Section carouselHeight={carouselHeight}>
        <StyledCarousel {...CarouselSettings}>
          {films
            ?.filter((query) => query.data.category !== 'Archived')
            ?.map((film) => {
              return (
                <ImgContainer key={uuid()} carouselHeight={carouselHeight}>
                  <img src={film.data.backdrop} alt={film.data.title} />
                </ImgContainer>
              );
            })}
        </StyledCarousel>
        <Gradient />
      </Section>
    </Container>
  );
}

const Container = styled.div`
  position: relative;
  display: block;
  width: 100%;
  height: ${({ carouselHeight }) => carouselHeight}px;
  margin: 0 auto;
  @media only screen and (max-width: 760px) {
    display: none;
  }
  @media only screen and (min-width: 761px) and (max-width: 1100px) {
    height: 525px;
  }
  @media only screen and (min-width: 1101px) and (max-width: 1400px) {
    height: 700px;
  }
`;

const StyledCarousel = styled(Slider)`
  position: relative;
  z-index: -1;
  display: block;
  width: 100vw;
  height: ${({ carouselHeight }) => carouselHeight}px;
  margin: 0 auto;
  overflow: hidden;
  & > .slick-prev::before,
  & > .slick-next::before {
    font-size: 2rem;
  }
  & > .slick-prev {
    display: none;
    z-index: 5;
    left: 1rem;
    &::before {
      display: none;
      z-index: 5;
    }
  }
  & > .slick-next {
    z-index: 5;
    right: 2rem;
    &::before {
      display: none;
    }
  }
  & > .slick-dots {
    bottom: 1rem;
    & li {
      & button {
        &:hover {
          &::before {
            color: ${colors.white[100]};
          }
        }
      }
      & button::before {
        font-size: 1.2rem;
        color: ${colors.white[300]};
      }
    }
    & > .slick-active {
      & button::before {
        color: ${colors.white[100]};
      }
    }
  }
  @media only screen and (max-width: 760px) {
    display: none;
  }
  @media only screen and (min-width: 761px) and (max-width: 1100px) {
    height: 500px;
  }
  @media only screen and (min-width: 1101px) and (max-width: 1400px) {
    height: 600px;
  }
`;

const Section = styled.section`
  display: flex;
  justify-content: center;
  width: 100vw;
  height: ${({ carouselHeight }) => carouselHeight}px;
  @media only screen and (max-width: 760px) {
    display: none;
  }
  @media only screen and (min-width: 761px) and (max-width: 1100px) {
    height: 500px;
  }
  @media only screen and (min-width: 1101px) and (max-width: 1400px) {
    height: 500px;
  }
`;

const Gradient = styled.div`
  content: '';
  position: absolute;
  z-index: 1;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  background: linear-gradient(to top, hsla(0, 0%, 5%, 1) 5%, transparent);
`;

const ImgContainer = styled.div`
  position: relative;
  width: 100vw;
  height: ${({ carouselHeight }) => carouselHeight}px;
  & img {
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    width: 100%;
    aspect-ratio: 16 / 9;
    z-index: -1;
  }
  @media only screen and (min-width: 761px) and (max-width: 1100px) {
    height: 500px;
  }
  @media only screen and (min-width: 1101px) and (max-width: 1400px) {
    height: 600px;
  }
`;
