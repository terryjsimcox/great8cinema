import MoviePosterCard from '../components/Card/MoviePosterCard';
import { MemoryRouter } from 'react-router-dom';
import styled from 'styled-components';
export default {
  title: 'Cards/MoviePosterCard',
  component: MoviePosterCard,
  parameters: {
    backgrounds: {
      default: 'default',
      values: [{ name: 'default', value: '#272822' }],
    },
  },
};

const Template = (args) => (
  <MemoryRouter>
    <Container>
      <MoviePosterCard {...args} />
    </Container>
  </MemoryRouter>
);

const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const Default = Template.bind({});
Default.args = {
  movie: {
    title: 'Doctor Strange in the Multiverse of Madness',
    poster:
      'https://image.tmdb.org/t/p/original/wRnbWt44nKjsFPrqSmwYki5vZtF.jpg',
    shows: [
      {
        actual: '202204172030',
        date: '20220417',
        time12: '8:30 pm',
        time24: 2000,
      },
      {
        actual: '202204171600',
        date: '20220417',
        time12: '4:00 pm',
        time24: 1600,
      },
    ],
  },
  state: {
    current_page: 'Now Showing',
    films: [],
  },
  updateState: () => {},
  testing: true,
};