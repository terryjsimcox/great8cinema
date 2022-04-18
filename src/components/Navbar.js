import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { v4 as uuid } from 'uuid';
import { useApp } from '../context/AppContext';
import { HiMenuAlt4, HiX } from 'react-icons/hi';
import styled from 'styled-components';
import { colors, fonts, borderRadius } from '../containts/styles.defaults';
import { Great8Logo } from './Logo';

const defaultNavItems = [
  {
    name: 'Now Showing',
    url: '/#Now Showing',
    description: 'Navigate to Now Showing page.',
  },
  {
    name: 'Coming Soon',
    url: '/#Coming Soon',
    description: 'Navigate to Coming Soon page.',
  },
  {
    name: 'Gift Cards',
    url: '/Gift Cards',
    description: 'Navigate to Gift Cards page.',
  },
  {
    name: 'Contact Us',
    url: '/Contact Us',
    description: 'Navigate to Contact Us page.',
  },
];

export default function Navbar({ state = null, updateState = null }) {
  const [scrollPos, setScrollPos] = useState(0);
  const [navOpen, setNavOpen] = useState(false);

  function handleClick(e, item) {
    state.current_page === item.name && e.preventDefault();
    updateState({ ...state, current_page: item.name });
    setNavOpen(!navOpen);
  }
  const checkScrollY = (e) => {
    window.scrollY > 150 ? setScrollPos(1) : setScrollPos(0);
  };
  useEffect(() => {
    window.addEventListener('scroll', checkScrollY);

    return () => window.removeEventListener('scrollY', checkScrollY);
  }, []);

  return (
    <Container>
      <Background opacity={scrollPos} />
      <Great8Logo
        handleClick={() =>
          updateState({ ...state, current_page: 'Now Showing' })
        }
      />
      <NavList open={navOpen} className={navOpen && 'open'}>
        {defaultNavItems.map((item) => (
          <NavItem
            open={navOpen}
            active={state.current_page === item.name ? true : false}
            key={uuid()}
            className={navOpen && 'open'}
            onClick={(e) => handleClick(e, item)}
            title={item.name}
            aria-label={item.description}>
            <Link to={item.url} title={item.name}>
              {item.name}
            </Link>
          </NavItem>
        ))}
      </NavList>
      <MobileIcon>
        {!navOpen ? (
          <HiMenuAlt4 onClick={() => setNavOpen(true)} />
        ) : (
          <HiX onClick={() => setNavOpen(false)} />
        )}
      </MobileIcon>
    </Container>
  );
}

const Container = styled.nav`
  position: fixed;
  top: 0;
  left: 0;
  z-index: 100;
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  height: 5rem;
  & > a {
    margin-inline-start: 2rem;
  }

  @media print {
    display: none;
  }
  @media only screen and (max-width: 960px) {
    justify-content: center;
    & > a {
      margin: 0;
    }
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

const NavList = styled.ul`
  display: flex;
  z-index: 2;
  margin-inline-end: 4rem;
  list-style: none;

  @media only screen and (max-width: 960px) {
    position: absolute;
    top: 5rem;
    left: 0;
    right: 0;
    flex-direction: column;
    margin: 0;
    padding: 0;
    opacity: ${({ open }) => (open ? 1 : 0)};
    transform: scale(1, 0);
    transition: transform 0.4s ease-in-out;
    transform-origin: top;
    background-color: ${colors.dark[700]};
    &.open {
      transform: scale(1, 1);
      transition: transform 0.8s ease-in-out;
      transform-origin: top;
      background-color: ${colors.dark[700]};
    }
  }
`;

const NavItem = styled.li`
  position: relative;
  margin-right: 2rem;
  cursor: ${({ active }) => (active ? 'pointer' : 'default')};
  &:last-child {
    margin-right: 0;
  }
  & > a {
    color: ${({ active }) => (active ? colors.white[100] : colors.white[200])};
    font-family: ${fonts.EncodeSans}, sans-serif;
    font-size: 1.2rem;
    text-decoration: none;
  }
  &::after {
    position: absolute;
    content: '';
    display: block;
    left: 0;
    right: 0;
    bottom: -0.5rem;
    height: 0.2rem;
    transform: scale(${({ active }) => (active ? 1 : 0)}, 1);
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

  @media only screen and (max-width: 960px) {
    all: unset;
    padding: 0;
    opacity: 0;
    transition: opacity 0.2s ease-in-out;
    transition-delay: 1s;
    background-color: ${({ active }) =>
      active ? colors.dark[500] : colors.dark[700]};
    cursor: ${({ active }) => (active ? 'default' : 'pointer')};
    & > a {
      display: block;
      padding: 2rem;
    }
    &.open {
      opacity: 1;
      transition: opacity 3s ease;
      transition-delay: 1s;
    }
    &:hover {
      & > a {
        color: ${colors.white[100]};
      }
      background-color: ${({ active }) =>
        active ? colors.dark[500] : colors.dark[400]};
    }
    &::after {
      all: unset;
      display: none;
    }
  }
`;

const MobileIcon = styled.div`
  display: none;
  @media only screen and (max-width: 960px) {
    display: block;
    position: absolute;
    right: 5rem;
    cursor: pointer;
    & > svg {
      width: 2em;
      height: 2rem;
      fill: ${colors.white[100]};
    }
    &:hover {
    }
  }
`;
