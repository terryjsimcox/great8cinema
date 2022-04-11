import React from 'react';

import styled from 'styled-components';
import { colors, fonts, borderRadius } from '../containts/styles.defaults';

const giftCards = () => {
  return (
    <Container>
      <Card>
        <Section>
          <Title>
            Purchase a Gift Card
            <Emphasized>Today!</Emphasized>
          </Title>
          <Content>
            Give the gift of entertainment today! Great 8 Cinema is proud to
            offer gift cards available for purchase online now! Gift card
            purchases are available in any dollar amount. To purchase, click the
            first link below. If you would like to check your gift card balance
            there is a link below.
          </Content>
        </Section>
        <ImageSection></ImageSection>
      </Card>
    </Container>
  );
};

export default giftCards;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
  margin: 7em 0;
  @media only screen and (max-width: 1200px) {
    display: flex;
    flex-direction: column;
    margin-top: 10rem;
  }
`;

const Card = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 80%;
  margin-bottom: 2rem;
  padding: 2rem 4rem;
  background-color: ${colors.dark[500]};
  border-radius: ${borderRadius.sm};
  @media only screen and (max-width: 1200px) {
    flex-direction: column;
  }
`;

const Section = styled.section`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Title = styled.h3`
  display: flex;
  align-items: center;
  margin-bottom: 2rem;
  font-size: 2rem;
  font-weight: ${fonts.weight[400]};
  color: ${colors.white[200]};
  font-family: ${fonts.EncodeSans};
  letter-spacing: 0.04rem;
`;
const Emphasized = styled.h3`
  margin-left: 1rem;
  font-size: 3rem;
  color: ${colors.secondary[300]};
  font-family: ${fonts.PermanentMarker};
  font-weight: ${fonts.weight[400]};
  letter-spacing: 0.04rem;
`;

const Content = styled.p`
  letter-spacing: 0.08rem;
  color: ${colors.white[200]};
  font-family: ${fonts.EncodeSans};
  line-height: 1.5rem;
`;

const ImageSection = styled.div``;
