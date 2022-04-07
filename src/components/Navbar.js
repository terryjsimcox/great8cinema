import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { v4 as uuid } from 'uuid';
import { useApp } from '../context/AppContext';
import styled from 'styled-components';
import { colors, fonts, borderRadius } from '../containts/styles.defaults';
import { ReactComponent as Great8Logo } from '../assets/images/great8cinema.svg';

const defaultNavItems = [
  {
    name: 'Now Showing',
    url: '#Now Showing',
  },
  {
    name: 'Coming Soon',
    url: '#Coming Soon',
  },
  {
    name: 'Gift Cards',
    url: '/Gift Cards',
  },
  {
    name: 'Contact Us',
    url: '/Contact Us',
  },
];

export default function Navbar() {
  const [scrollPos, setScrollPos] = useState(1);
  const { state } = useApp();
  console.log(state);
  function checkScrollPos() {
    window.scrollY > 150 ? setScrollPos(1) : setScrollPos(0);
  }

  useEffect(() => {
    document.addEventListener('scroll', checkScrollPos);

    return () => {
      document.removeEventListener('scroll', checkScrollPos);
    };
  }, []);

  return (
    <Container>
      <Background opacity={scrollPos} />
      <MainLogo to='/'>
        <Great8Logo />
      </MainLogo>
      <NavList>
        {defaultNavItems.map((item) => (
          <NavItem
            key={uuid()}
            className={state.current_page === item.name && 'active'}>
            <Link to={item.url}>{item.name}</Link>
          </NavItem>
        ))}
      </NavList>
    </Container>
  );
}

const Container = styled.nav`
  position: fixed;
  top: 0;
  z-index: 100;
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  height: 5rem;

  @media only screen and (max-width: 960px) {
    justify-content: center;
  }
`;

const Background = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  opacity: ${({ opacity }) => opacity};
  transition: opacity 1s ease;
  background-color: ${colors.dark[700]};
  @media only screen and (max-width: 960px) {
    opacity: 1;
  }
`;

const MainLogo = styled(Link)`
  z-index: 2;
  margin-inline-start: 2rem;
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

const NavList = styled.ul`
  display: flex;
  z-index: 2;
  margin-inline-end: 4rem;
  @media only screen and (max-width: 960px) {
    display: none;
  }
`;

const NavItem = styled.li`
  position: relative;
  margin-right: 2rem;
  &:last-child {
    margin-right: 0;
  }
  & > a {
    color: ${colors.white[200]};
    font-family: ${fonts.EncodeSans};
    font-size: 1.2rem;
  }
  &::after {
    position: absolute;
    content: '';
    display: block;
    left: 0;
    right: 0;
    bottom: -0.5rem;
    height: 0.2rem;
    transform: scale(0, 1);
    transition: transform 800ms ease-in-out;
    background-color: ${colors.secondary[400]};
    border-radius: ${borderRadius.sm};
    cursor: default;
  }
  &:hover {
    color: ${colors.white[100]};
    &::after {
      transform: scale(1, 1);
    }
  }
  &.active {
    & > a {
      color: ${colors.white[100]};
      cursor: default;
    }
    &::after {
      transform: scale(1, 1);
    }
  }
`;
