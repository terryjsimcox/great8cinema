import PosterFront from '../components/Card/PosterFront';
import styled from 'styled-components';
export default {
  title: 'Cards/PosterFront',
  component: PosterFront,
  parameters: {
    backgrounds: {
      default: 'default',
      values: [{ name: 'default', value: '#272822' }],
    },
  },
};

const Template = (args) => (
  <Container>
    <PosterFront {...args} />
  </Container>
);

const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const Loaded = Template.bind({});
Loaded.args = {
  isLoaded: true,
  setIsLoaded: () => false,
  src: 'https://image.tmdb.org/t/p/original/wRnbWt44nKjsFPrqSmwYki5vZtF.jpg',
  alt: 'Doctor Strange in the Multiverse of Madness',
};
