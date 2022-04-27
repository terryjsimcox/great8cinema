import React from 'react';
import GiftCardImage from './GiftCardImage';
import styled from 'styled-components';
import { colors, fonts, borderRadius } from '../../containts/styles.defaults';

const giftCards = ({ site }) => {
  return (
    <Container>
      <Card>
        <TopSection>
          <Title>
            Purchase a Gift Card
            <Emphasized>Today!</Emphasized>
          </Title>
          <Content>
            Give the gift of entertainment today!{' '}
            {site?.short === 'sullivan'
              ? 'Sullivan 6 Cinema'
              : 'Great 8 Cinema'}{' '}
            is proud to offer gift cards available for purchase online now! Gift
            card purchases are available in any dollar amount. To purchase,
            click the first link below. If you would like to check your gift
            card balance there is a link below.
          </Content>
          <GiftCardImage site={site} />
        </TopSection>
        <BottomSection>
          <Section>
            <p>
              Buying options are Virtual or Physical cards. They can be in any
              dollar amount.
            </p>
            <p>
              Virtual card: Delivery type would be email (It will be emailed to
              you and you will present the email to an employee).
            </p>
            <p>
              Physical card: Delivery type would be USPS (A physical card will
              be mailed to you).
            </p>
          </Section>
          <Section>
            <a
              href={`https://${site.RTN}.formovietickets.com:2235/app/rtsweb/gift`}
              target='_blank'>
              Purchase a Gift Card
            </a>
            <a
              href={`https://${site.RTN}.formovietickets.com:2235/app/rtsweb/gift/balance`}
              target='_blank'>
              Check Card Balance
            </a>
          </Section>
        </BottomSection>
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
  flex-wrap: wrap;
  align-items: center;

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
`;

const TopSection = styled.section`
  position: relative;
  display: flex;
  flex-direction: column;
  width: 70%;
  @media only screen and (max-width: 1200px) {
    justify-content: center;
    align-items: center;
    width: 100%;
  }
`;

const BottomSection = styled.section`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  margin-top: 4rem;
  width: 100%;
  & section:first-child {
    margin-top: 2rem;
    & p {
      margin-bottom: 1rem;
      color: ${colors.white[200]};
    }
  }
  & section:last-child {
    width: 35%;
    align-items: center;
    @media only screen and (max-width: 1200px) {
      width: 100%;
      margin-top: 4rem;
    }
    & a {
      align-items: center;
      justify-content: center;
      text-align: center;
      width: 60%;
      margin-bottom: 2rem;
      padding: 0.8rem 1.2rem;
      color: ${colors.white[200]};
      background-color: ${colors.secondary[600]};
      border-radius: ${borderRadius.sm};
      &:hover {
        color: ${colors.white[100]};
        background-color: ${colors.secondary[400]};
      }
    }
  }
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
const Emphasized = styled.span`
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
