import React from 'react';
import { v4 as uuid } from 'uuid';
import Actor from '../Card/Actor';
import styled from 'styled-components';
import { colors, fonts } from '../../containts/styles.defaults';

const Cast = ({ cast }) => {
  console.log(cast);
  return (
    <Container>
      <Header>Cast</Header>
      <Section>
        {cast.map((actor) =>
          actor.popularity > 5 ? (
            <Actor
              key={uuid()}
              src={actor.profile}
              alt={actor.name}
              name={actor.name}
              character={actor.character}
            />
          ) : (
            <></>
          )
        )}
      </Section>
    </Container>
  );
};

export default Cast;

const Container = styled.section``;
const Section = styled.section`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 2rem;
  @media only screen and (max-width: 960px) {
    grid-template-columns: 1fr;
  }
  @media only screen and (min-width: 961px) and (max-width: 1200px) {
    grid-template-columns: 1fr 1fr;
  }
`;
const Header = styled.h2`
  margin-bottom: 2rem;
  color: ${colors.white[200]};
  font-family: ${fonts.EncodeSans};
`;
