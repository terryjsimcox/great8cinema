import React from 'react';
import ContactUsForm from './Forms/ContactUsForm';
import styled from 'styled-components';
import { colors, fonts, borderRadius } from '../containts/styles.defaults';

const ContactUs = () => {
  return (
    <Container>
      <Card>
        <Section>
          <Title>Great 8 Cinema Locaion</Title>
          <Content>
            <p>
              5 Prairie Dell Plaza
              <br />
              Union, MO 63084
              <br />
              Business Office: (636)583-4800
              <br />
              24 Hour Movie Line: (636)583-8889
            </p>
            <a
              href='https://maps.google.com/maps/dir//Great+Eight+Cinema+5+Prairie+Dell+Plaza+Dr+Union,+MO+63084/@38.4263076,-90.966187,16z/data=!4m5!4m4!1m0!1m2!1m1!1s0x87d94691b1820511:0x4b03f696e249dc9d'
              target='_blank'>
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
            src='https://www.google.com/maps/embed/v1/place?key=AIzaSyBrDS9DLeTIodNMLqYuxDzF_EgOdMbw12o&q=Great 8 Cinema'
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
`;
const Section = styled.section`
  display: flex;
  flex-direction: column;
  padding-right: 2rem;
  &:first-child {
    margin-right: 3rem;
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
`;
const Iframe = styled.iframe`
  width: 500px;
  height: 350px;
  border-radius: ${borderRadius.sm};
`;
