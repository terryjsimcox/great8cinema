import React from 'react';
import { Link } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import styled from 'styled-components';
import { colors, fonts, borderRadius } from '../containts/styles.defaults';
import Great8Building from '../assets/images/great8.jpg';

const AboutUs = () => {
  const { updateState } = useApp();
  return (
    <Container>
      <Card>
        <CardSection>
          <Title>About Us</Title>
        </CardSection>
        <CardSection>
          <CardContent>
            <CardP>
              Enjoy the comfort and amenities of a the area's only modern
              theater facility.
            </CardP>
            <CardP>
              Our theater features six individual auditoriums with stadium
              seating, state of the art projection equipment, stereo surround
              sound in all of the auditoriums, and many other amenities. DTS
              Digital Sound for selected movies is also available.
            </CardP>
            <CardBtn
              to='/Contact%20Us'
              onClick={() => updateState('current_page', 'Contact Us')}>
              Contact Us
            </CardBtn>
          </CardContent>
          <CardContent>
            <CardImage src={Great8Building} alt='Great 8 Cinema Building' />
          </CardContent>
        </CardSection>
      </Card>
    </Container>
  );
};

export default AboutUs;

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
  flex-direction: column;
  width: 970px;
  margin-bottom: 2rem;
  padding: 2rem;
  background-color: ${colors.dark[600]};
  border-radius: ${borderRadius.sm};
  @media only screen and (max-width: 960px) {
    width: inherit;
  }
`;

const CardContent = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: 100%;
`;

const CardSection = styled.div`
  display: flex;
  padding-right: 2rem;
  @media only screen and (max-width: 960px) {
    flex-direction: column;
    &:last-child {
      align-items: center;
    }
  }
`;

const Title = styled.h3`
  margin-bottom: 2rem;
  color: ${colors.white[100]};
  font-size: 2rem;
  font-family: ${fonts.EncodeSans};
  letter-spacing: ${fonts.letterSpacing};
`;

const CardP = styled.p`
  margin-right: 2rem;
  margin-bottom: 1rem;
  color: ${colors.white[100]};
  font-size: 1rem;
  font-family: ${fonts.EncodeSans};
  line-height: 1.5rem;
  letter-spacing: ${fonts.letterSpacing};
`;

const CardImage = styled.img`
  width: 350px;
  border-radius: ${borderRadius.sm};
  @media only screen and (max-width: 960px) {
    /* width: 350px; */
    margin-top: 2rem;
  }
`;

const CardBtn = styled(Link)`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 50%;
  margin-top: 2rem;
  padding: 1rem 2rem;
  color: ${colors.white[100]};
  font-size: 1.2rem;
  font-family: ${fonts.EncodeSans};
  letter-spacing: ${fonts.letterSpacing};
  background-color: ${colors.secondary[500]};
  border-radius: ${borderRadius.sm};
  @media only screen and (max-width: 960px) {
    width: 50%;
  }
`;
