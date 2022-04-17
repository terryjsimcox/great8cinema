import React, { useEffect, useState } from 'react';
import dayjs from 'dayjs';

import styled from 'styled-components';
import { colors, fonts } from '../../containts/styles.defaults';

const defaultRemainingTime = {
  hours: '00',
  minutes: '00',
  seconds: '00',
};

const updateCounterDownTimer = (timestampMs) => {
  const startTime = dayjs(timestampMs, 'YYYYMMDDHHmm');
  const currentTime = dayjs();

  return {
    hours: getRemainingHours(currentTime, startTime),
    minutes: getRemainingMinutes(currentTime, startTime),
    seconds: getRemainingSeconds(currentTime, startTime),
  };
};

const getRemainingSeconds = (currentTime, startTime) => {
  const seconds = startTime.diff(currentTime, 'seconds') % 60;
  return seconds;
};

const getRemainingMinutes = (currentTime, startTime) => {
  const minutes = startTime.diff(currentTime, 'minutes') % 60;
  return minutes;
};

const getRemainingHours = (currentTime, startTime) => {
  const hours = startTime.diff(currentTime, 'hours') % 24;
  return hours;
};

const CountDownTimer = ({ startTime }) => {
  const [remainingTime, setRemainingTime] = useState(defaultRemainingTime);
  useEffect(() => {
    const intervalId = setInterval(() => {
      updateRemainingTime(startTime);
    }, 1000);

    return () => clearInterval(intervalId);
  });

  const updateRemainingTime = (timestamp) => {
    setRemainingTime(updateCounterDownTimer(timestamp));
  };

  return (
    <Container>
      <Title>Starts in:</Title>
      <Timer>
        <p>
          {remainingTime.hours} : {remainingTime.minutes} :{' '}
          {remainingTime.seconds}
        </p>
      </Timer>
    </Container>
  );
};

export default CountDownTimer;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 1rem;
`;

const Title = styled.h4`
  color: ${colors.white[200]};
  font-family: ${fonts.EncodeSans}, sans-serif;
`;

const Timer = styled.div`
  display: flex;
  & p {
    margin-right: 1rem;
    color: ${colors.white[200]};
    font-family: ${fonts.EncodeSans}, sans-serif;
    font-size: 1.5rem;
  }
  & p:last-child {
    margin-right: 0;
  }
`;
