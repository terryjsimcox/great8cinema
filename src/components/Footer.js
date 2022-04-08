import React from 'react';
import { Link } from 'react-router-dom';
import { v4 as uuid } from 'uuid';
import { Great8Logo } from './Logo';
import styled from 'styled-components';
import { colors, fonts } from '../containts/styles.defaults';

export default function Footer() {
  const navLinks = [
    {
      name: 'Now Showing',
      url: '/#Now Showing',
    },
    {
      name: 'Gift Cards',
      url: '/Gift Cards',
    },
    {
      name: 'Employment',
      url: '/Employment',
    },
    {
      name: 'Coming Soon',
      url: '/Coming Soon',
    },
    {
      name: 'Contact Us',
      url: '/Contact Us',
    },
    {
      name: 'About Us',
      url: '/About Us',
    },
  ];

  return (
    <Container>
      <TopContainer>
        <Logo>
          <Great8Logo />
        </Logo>
        <LinksContainer>
          <LinksList>
            {navLinks.map((link) => (
              <LinkItem key={uuid()}>
                <Link to={link.url}>{link.name}</Link>
              </LinkItem>
            ))}
          </LinksList>
        </LinksContainer>
        <TicketPricesContainer>Ticket Prices</TicketPricesContainer>
      </TopContainer>
      <BottomContainer>
        <FBLogo
          href='https://www.facebook.com/great8cinema/?ref=ts'
          target='_blank'>
          <img src='/images/fb-button-icon.png' alt='Fb logo' />
        </FBLogo>
        <p>&copy; Copyrights. All rights reserved.</p>
      </BottomContainer>
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  min-height: 100px;
  background-color: ${colors.dark[700]};
`;

const TopContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 75%;
  margin: 0 auto;
  padding: 2rem 0;
  border-bottom: 2px solid ${colors.dark[400]};
`;

const BottomContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  & > p {
    color: ${colors.white[100]};
  }
`;

const Logo = styled.section``;

const LinksContainer = styled.section``;

const LinksList = styled.ul`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 1rem 12rem;
`;

const LinkItem = styled.li`
  & > a {
    color: ${colors.white[300]};
    font-family: ${fonts.EncodeSans};
  }
  &:hover {
    & > a {
      color: ${colors.white[100]};
    }
  }
`;

const TicketPricesContainer = styled.section``;

const FBLogo = styled.a``;