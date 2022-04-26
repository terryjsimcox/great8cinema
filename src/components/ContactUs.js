import React from 'react';
import ContactUsForm from './Forms/ContactUsForm';
import styled from 'styled-components';
import { colors, fonts, borderRadius } from '../containts/styles.defaults';

const ContactUs = ({ site }) => {
  const direction =
    site?.short === 'sullivan'
      ? 'https://www.google.com/maps/dir//Sullivan+6+Cinema+3001+S+Service+Rd+W+Sullivan,+MO+63080/@38.1995001,-91.182417,16z/data=!4m5!4m4!1m0!1m2!1m1!1s0x87d9624f4ec4057b:0xabea4ade5c96c512'
      : 'https://maps.google.com/maps/dir//Great+Eight+Cinema+5+Prairie+Dell+Plaza+Dr+Union,+MO+63084/@38.4263076,-90.966187,16z/data=!4m5!4m4!1m0!1m2!1m1!1s0x87d94691b1820511:0x4b03f696e249dc9d';
  return (
    <Container>
      <Card>
        <Section>
          <Title>
            {site?.short === 'sullivan'
              ? 'Sullivan 6 Cinema'
              : 'Great 8 Cinema'}{' '}
            Location
          </Title>
          <Content>
            <p>
              {site?.short === 'sullivan'
                ? '1003 North Service Rd West'
                : '5 Prairie Dell Plaza'}
              <br />
              {site?.short === 'sullivan'
                ? 'Sullivan, MO 63080'
                : 'Union, MO 63084'}
              <br />
              Business Office:{' '}
              {site?.short === 'sullivan' ? '(573)860-4800' : '(636)583-4800'}
              <br />
              24 Hour Movie Line:{' '}
              {site?.short === 'sullivan' ? '(573)860-7469' : '(636)583-8889'}
            </p>
            <a href={direction} target='_blank'>
              Directions
            </a>
          </Content>
        </Section>
        <Section>
          <Iframe
            width='600'
            height='450'
            loading='lazy'
            style={{ border: 0 }}
            referrerPolicy='no-referrer-when-downgrade'
            src={`https://www.google.com/maps/embed/v1/place?key=AIzaSyBrDS9DLeTIodNMLqYuxDzF_EgOdMbw12o&q=${
              site?.short === 'sullivan'
                ? 'Sullivan 6 Cinema'
                : 'Great 8 Cinema'
            }`}
            crossOrigin='anonymous'></Iframe>
        </Section>
      </Card>
      <Card>
        <ContactUsForm />
      </Card>
    </Container>
  );
};

export default ContactUs;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  margin-top: 8rem;
  padding-top: 5rem;
  padding-bottom: 5rem;

  @media only screen and (max-width: 960px) {
    width: 100vw;
  }
`;

const Card = styled.div`
  display: flex;
  margin-bottom: 2rem;
  padding: 2rem;
  background-color: ${colors.dark[500]};
  border-radius: ${borderRadius.sm};
  &:last-child {
    padding: 0;
  }
  @media only screen and (max-width: 960px) {
    flex-direction: column;
    width: 100%;
  }
`;
const Section = styled.section`
  display: flex;
  flex-direction: column;
  padding-right: 2rem;
  &:first-child {
    margin-right: 3rem;
  }

  @media only screen and (max-width: 960px) {
    padding-right: 0;
  }
`;
const Title = styled.h4`
  margin-bottom: 2rem;
  color: ${colors.white[100]};
  font-size: 1.5rem;
  font-family: ${fonts.EncodeSans};
  letter-spacing: ${fonts.letterSpacing};
`;
const Content = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: 100%;
  & > p {
    color: ${colors.white[200]};
  }
  & > a {
    padding: 0.8rem 1rem;
    color: ${colors.white[200]};
    text-align: center;
    background-color: ${colors.secondary[700]};
    border-radius: ${borderRadius.sm};
    &:hover {
      color: ${colors.white[100]};
      background-color: ${colors.secondary[500]};
    }
  }
  @media only screen and (max-width: 960px) {
    margin-bottom: 2rem;
    & > a {
      margin-top: 2rem;
    }
  }
`;
const Iframe = styled.iframe`
  width: 500px;
  height: 350px;
  border-radius: ${borderRadius.sm};
  animation: skeletion-loading 2s linear infinite alternate;

  @keyframes skeletion-loading {
    0% {
      background-color: hsl(0, 0%, 25%);
    }
    100% {
      background-color: hsl(0, 0%, 50%);
    }
  }
  @media only screen and (max-width: 960px) {
    width: 100%;
    padding-right: 0;
  }
`;
