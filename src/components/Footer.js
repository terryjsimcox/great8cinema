import React from 'react';
import { Link } from 'react-router-dom';
import { v4 as uuid } from 'uuid';
import { Great8Logo } from './Logo';
import { useApp } from '../context/AppContext';
import TicketPrices from './TicketPrices';
import styled from 'styled-components';
import { colors, fonts } from '../containts/styles.defaults';
import FB_Popcorn_image from '../assets/images/fb-button-icon.png';

export default function Footer() {
  const { state, updateState } = useApp();
  const navLinks = [
    {
      name: 'Now Showing',
      url: '/',
    },
    {
      name: 'Gift Cards',
      url: '/GiftCards',
    },
    {
      name: 'Employment',
      url: '/Employment',
    },
    {
      name: 'Coming Soon',
      url: '/',
    },
    {
      name: 'Contact Us',
      url: '/ContactUs',
    },
    {
      name: 'About Us',
      url: '/AboutUs',
    },
  ];

  function handleClick(e, item) {
    state.current_page === item.name && e.preventDefault();
    updateState({ ...state, current_page: item.name });
  }
  return (
    <Container>
      <TopContainer>
        <Logo>
          <Great8Logo
            site={state.hostname}
            handleClick={() =>
              updateState({ ...state, current_page: 'Now Showing' })
            }
          />
        </Logo>
        <LinksContainer>
          <LinksList>
            {navLinks.map((link) => (
              <LinkItem key={uuid()}>
                <Link to={link.url} onClick={(e) => handleClick(e, link)}>
                  {link.name}
                </Link>
              </LinkItem>
            ))}
          </LinksList>
        </LinksContainer>
        <TicketPricesContainer>
          <TicketPrices />
        </TicketPricesContainer>
      </TopContainer>
      <BottomContainer>
        <FBLogo
          href={`https://www.facebook.com/${state.site.FB}/?ref=ts`}
          target='_blank'>
          <img src={FB_Popcorn_image} alt='Fb logo' />
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
  margin-top: auto;
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
  @media only screen and (max-width: 960px) {
    flex-direction: column;
  }
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
  @media only screen and (max-width: 960px) {
    grid-template-columns: 1fr;
    margin: 2rem 0;
  }
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

const TicketPricesContainer = styled.section`
  display: grid;
  flex-direction: column;
`;

const FBLogo = styled.a``;
