import React from 'react';
import { Link } from 'react-router-dom';
import dayjs from 'dayjs';
import { v4 as uuid } from 'uuid';
import { CountDownTimer } from '../Timer';
import { useApp } from '../../context/AppContext';
import styled from 'styled-components';
import { colors, fonts, borderRadius } from '../../containts/styles.defaults';

const MovieTimesBack = ({ movie }) => {
  const { state, updateState } = useApp();
  const findNextShow = (shows) => {
    const dateFormat = 'YYYYMMDD';
    let nextShow;
    shows.forEach((show) => {
      if (
        dayjs(show.date, dateFormat).format(dateFormat) ===
          dayjs().format(dateFormat) &&
        dayjs(show.actual) > dayjs() &&
        dayjs(show.actual).diff(dayjs(), 'hours') % 60 < 1 &&
        dayjs(show.actual).diff(dayjs(), 'minutes') % 60 <= 30
      ) {
        return (nextShow = <CountDownTimer startTime={show?.actual} />);
      }
    });
    return nextShow;
  };

  return (
    <Container>
      <Title>{dayjs().format('dddd, MMMM D')}</Title>
      {findNextShow(movie.data.shows)}
      <ShowLinks>
        {movie?.data.shows.map((show) => {
          if (
            dayjs(show.actual) > dayjs() &&
            dayjs(show.date).format('YYYYMMDD') === dayjs().format('YYYYMMDD')
          )
            return (
              <ShowItem key={uuid()}>
                <a
                  href={`http://40580.formovietickets.com:2235/T.ASP?WCI=BT&RtsPurchaseId=${uuid()}&Page=PickTickets&SHOWID=${
                    show.showId
                  }`}
                  target='_blank'>
                  {show.time12}
                </a>
              </ShowItem>
            );
        })}
        <ShowItem>
          <MovieDetails
            to={`film/${movie.id}`}
            onClick={() => {
              updateState({ ...state, current_page: 'Details' });
            }}>
            More Details
          </MovieDetails>
        </ShowItem>
      </ShowLinks>
    </Container>
  );
};

export default MovieTimesBack;

const Container = styled.div`
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  z-index: 2;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  background-color: rgba(0, 0, 0, 0.8);
  border-radius: ${borderRadius.md};
  transform: scale(0);
  transform-origin: center;
  transition: transform 0.4s ease-in-out;
  user-select: none;
`;

const Title = styled.h3`
  margin-top: 1rem;
  color: ${colors.white[200]};
  letter-spacing: 0.04rem;
`;
const Timer = styled.div`
  display: flex;
  & > div p {
    color: ${colors.white[200]};
  }
`;

const ShowLinks = styled.ul`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 80%;
  margin-bottom: 1rem;
`;

const ShowItem = styled.li`
  display: flex;
  width: 100%;
  margin-bottom: 1rem;
  align-items: center;
  justify-content: center;
  & > a {
    width: 100%;
    padding: 0.5rem 1rem;
    color: ${colors.white[200]};
    font-size: 1.2rem;
    font-family: ${fonts.EncodeSans};
    text-align: center;
    background-color: ${colors.secondary[400]};
    border-radius: ${borderRadius.sm};
  }
`;

const MovieDetails = styled(Link)``;
