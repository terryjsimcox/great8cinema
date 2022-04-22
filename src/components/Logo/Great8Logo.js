import React from 'react';
import { Link } from 'react-router-dom';
import { ReactComponent as Great8Svg } from '../../assets/images/Great8Cinema1.svg';
import { ReactComponent as Sullivan6Svg } from '../../assets/images/Sullivan6Cinema.svg';
import styled from 'styled-components';
import { colors } from '../../containts/styles.defaults';

export default function Great8Logo({ site, handleClick }) {
  console.log('Logo:', site);
  return (
    <Container
      to='/'
      onClick={handleClick}
      title='Great 8 Cinema Logo'
      aria-label='Navigate to the home page.'>
      {site === 'sullivan' ? <Sullivan6Svg /> : <Great8Svg />}
    </Container>
  );
}

const Container = styled(Link)`
  z-index: 2;
  & svg {
    & #great,
    .great,
    .sullivan {
      fill: ${colors.white[100]};
      stroke: transparent;
    }
    & #eight,
    .eight,
    .six {
      fill: ${colors.secondary[400]};
      stroke: transparent;
    }
    & #cinema,
    .cinema {
      fill: ${colors.white[100]};
      stroke: transparent;
    }
  }
`;
