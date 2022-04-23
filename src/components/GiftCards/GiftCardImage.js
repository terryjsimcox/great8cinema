import React from 'react';
import { Great8Logo } from '../Logo';
import styled from 'styled-components';
import { colors, fonts, borderRadius } from '../../containts/styles.defaults';

const GiftCardImage = ({ site }) => {
  return (
    <Container>
      <Section>
        <Logo site={site} />
        <Title>Gift Card</Title>
      </Section>
    </Container>
  );
};

export default GiftCardImage;

const Container = styled.div`
  position: absolute;
  top: 25px;
  right: -325px;
  @media only screen and (max-width: 1200px) {
    position: relative;
    margin-top: 2rem;
    right: inherit;
  }
`;
const Section = styled.section`
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 1em;
  width: 300px;
  height: 175px;
  background: linear-gradient(
    45deg,
    rgba(0, 0, 0, 1),
    ${colors.secondary[600]}
  );
  border-radius: ${borderRadius.sm};
  box-shadow: inset 1px 0 50px rgba(0, 0, 0, 0.6),
    0 1px 10px 2px rgba(0, 0, 0, 0.2);
`;

const Logo = styled(Great8Logo)`
  position: absolute;
  top: 1.5rem;
  left: 2rem;
  & svg {
    width: 100px;
    height: 22px;
  }
`;
const Title = styled.h3`
  font-family: ${fonts.PermanentMarker};
  font-size: 2rem;
  color: ${colors.white[100]};
  letter-spacing: 0.08rem;
`;
