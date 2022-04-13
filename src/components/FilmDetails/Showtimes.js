import dayjs from 'dayjs';
import React from 'react';
import { v4 as uuid } from 'uuid';

import styled from 'styled-components';
import { colors, fonts } from '../../containts/styles.defaults';

const fixShows = (shows) => {
  let sameDay = [];
  let newShowsArray = [];

  shows.forEach((show, index) => {
    if (sameDay.length === 0) {
      return sameDay.push({ date: show.date, shows: [{ ...show }] });
    }
    if (sameDay[0].date === show.date) {
      return sameDay[0].shows.push({ ...show });
    }
    if (sameDay[0].date !== show.date) {
      newShowsArray.push({ ...sameDay[0] });
      sameDay = [];
      sameDay.push({ date: show.date, shows: [{ ...show }] });
    }
  });
  return newShowsArray;
};

const Shows = ({ shows }) => {
  return (
    <ul>
      {shows.map((show) => (
        <li key={uuid()}>
          <a
            target='_blank'
            href={`http://40580.formovietickets.com:2235/T.ASP?WCI=BT&RtsPurchaseId=${uuid()}&Page=PickTickets&SHOWID=${
              show.showId
            }`}>
            {show.time12}
          </a>
        </li>
      ))}
    </ul>
  );
};

const Showtimes = ({ shows }) => {
  const newShows = fixShows(shows);
  return (
    <Container>
      {newShows.map(
        (show) =>
          dayjs().format('YYYYMMDD') <=
            dayjs(show.date, 'YYYYMMDD').format('YYYYMMDD') && (
            <div>
              <h4>{dayjs(show.date, 'YYYYMMDD').format('dddd MMM D ')}</h4>
              <Shows shows={show.shows} />
            </div>
          )
      )}
    </Container>
  );
};

export default Showtimes;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  & div {
    width: 100%;
    & h4 {
      color: ${colors.secondary[400]};
      font-size: 1.2rem;
      margin-bottom: 2rem;
    }
    & ul {
      display: flex;
      flex-wrap: wrap;
      margin-bottom: 4rem;
      & li {
        margin-right: 1rem;
        & a {
          padding: 0.5rem 1rem;
          color: ${colors.white[200]};
          border: 2px solid ${colors.white[200]};
          border-radius: 2rem;
          &:hover {
            background-color: ${colors.secondary[400]};
            border-color: ${colors.secondary[400]};
          }
        }
        &:last-child {
          margin-right: 0;
        }
      }
    }
  }
`;
