import React from 'react';
import Slider from 'react-slick';
import { useApp } from '../context/AppContext';
import { v4 as uuid } from 'uuid';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import styled from 'styled-components';
import { colors, carouselHeight } from '../containts/styles.defaults';

export default function Carousel() {
  const { state } = useApp();
  const sliderSetting = {
    dots: true,
    fade: true,
    infinite: true,
    autoplay: true,
    autoplaySpeed: 10000,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    pauseOnHover: true,
  };
  return (
    <Container>
      <Section>
        <StyledCarousel {...sliderSetting}>
          {state.films
            .filter((query) => query.data.category !== 'Archived')
            .map((film) => {
              return (
                <ImgContainer key={uuid()}>
                  <Blackout />
                  <img src={film.data.backdrop} alt={film.data.title} />
                </ImgContainer>
              );
            })}
        </StyledCarousel>
      </Section>
    </Container>
  );
}

const Container = styled.div`
  position: relative;
  display: block;
  width: 100vw;
  height: ${carouselHeight}px;
  margin: 0 auto;
  @media only screen and (max-width: 760px) {
    display: none;
  }
  @media only screen and (min-width: 761px) and (max-width: 1100px) {
    height: 400px;
  }
  @media only screen and (min-width: 1101px) and (max-width: 1400px) {
    height: 500px;
  }
`;

const StyledCarousel = styled(Slider)`
  position: relative;
  display: block;
  width: 100vw;
  height: ${carouselHeight}px;
  margin: 0 auto;
  overflow: hidden;
  & > .slick-prev::before,
  & > .slick-next::before {
    font-size: 2rem;
  }
  & > .slick-prev {
    z-index: 2;
    left: 1rem;
  }
  & > .slick-next {
    z-index: 2;
    right: 2rem;
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
`;

const Section = styled.section`
  display: flex;
  justify-content: center;
  width: 100vw;
  height: ${carouselHeight}px;
  @media only screen and (max-width: 760px) {
    display: none;
  }
  @media only screen and (min-width: 761px) and (max-width: 1100px) {
    height: 400px;
  }
  @media only screen and (min-width: 1101px) and (max-width: 1400px) {
    height: 500px;
  }
`;

const ImgContainer = styled.div`
  position: relative;
  width: 100vw;
  height: ${carouselHeight}px;
  & img {
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    width: 100%;
    height: ${carouselHeight}px;
    z-index: -1;
  }
  @media only screen and (min-width: 761px) and (max-width: 1100px) {
    height: 500px;
    & img {
      left: 10rem;
    }
  }
  @media only screen and (min-width: 1101px) and (max-width: 1400px) {
    height: 600px;
    & img {
      left: 8rem;
    }
  }
`;

const Blackout = styled.div`
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  background: linear-gradient(to right, hsla(0, 0%, 0%, 0.8) 10%, transparent);
`;
