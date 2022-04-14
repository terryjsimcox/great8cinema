import React from 'react';
import { Link } from 'react-router-dom';
import { ReactComponent as Great8Svg } from '../../assets/images/great8cinema.svg';
import styled from 'styled-components';
import { colors } from '../../containts/styles.defaults';

export default function Great8Logo({ handleClick }) {
  return (
    <Container to='/' onClick={handleClick}>
      <Great8Svg />
    </Container>
  );
}

const Container = styled(Link)`
  z-index: 2;
  & svg {
    & #great {
      fill: ${colors.white[100]};
      stroke: transparent;
    }
    & #eight {
      fill: ${colors.secondary[400]};
      stroke: transparent;
    }
    & #cinema {
      fill: ${colors.white[100]};
      stroke: transparent;
    }
  }
`;
