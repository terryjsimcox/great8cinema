import dayjs from 'dayjs';
import React from 'react';
import { v4 as uuid } from 'uuid';

import styled from 'styled-components';
import { colors, fonts } from '../../containts/styles.defaults';

const fixShows = (shows) => {
  let tempShow = [];
  let newShows = [];
  let currentDate = '';

  shows?.forEach((show, index) => {
    if (index === 0 || currentDate === show.date) {
      currentDate = show.date;
      tempShow.push(show);
    }
    if (currentDate !== show.date) {
      newShows.push({ date: currentDate, shows: tempShow });
      currentDate = show.date;
      tempShow = [show];
    }
    if (index === shows.length - 1) {
      newShows.push({ date: currentDate, shows: tempShow });
    }
  });

  return newShows;
};

const Shows = ({ shows, site }) => {
  return (
    <ul>
      {shows?.map((show) => (
        <li key={uuid()}>
          <a
            target='_blank'
            href={`http://${
              site.RTN
            }.formovietickets.com:2235/T.ASP?WCI=BT&RtsPurchaseId=${uuid()}&Page=PickTickets&SHOWID=${
              show.showId
            }`}>
            {show.time12}
          </a>
        </li>
      ))}
    </ul>
  );
};

const Showtimes = ({ shows, site }) => {
  const newShows = fixShows(shows);

  return (
    <Container>
      {newShows?.map(
        (show) =>
          dayjs().format('YYYYMMDD') <=
            dayjs(show.date, 'YYYYMMDD').format('YYYYMMDD') && (
            <div key={uuid()}>
              <h4>{dayjs(show.date, 'YYYYMMDD').format('dddd MMM D ')}</h4>
              <Shows shows={show.shows} site={site} />
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
      font-family: ${fonts.EncodeSans};
      font-size: 1.2rem;
      margin-bottom: 2rem;
      user-select: none;
    }
    & ul {
      display: flex;
      flex-wrap: wrap;
      margin-bottom: 2rem;
      & li {
        margin-right: 1rem;
        margin-bottom: 2rem;
        & a {
          padding: 0.5rem 1rem;
          color: ${colors.white[200]};
          font-family: ${fonts.EncodeSans};
          letter-spacing: 0.04rem;
          border: 2px solid ${colors.white[200]};
          border-radius: 2rem;
          user-select: none;
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
