import styled from 'styled-components';
import MovieTimesBack from '../components/Card/MovieTimesBack';
import { MemoryRouter } from 'react-router-dom';
export default {
  title: 'Cards/MovieTimesBack',
  component: MovieTimesBack,
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
      <MovieTimesBack {...args} />
    </Container>
  </MemoryRouter>
);

const Container = styled.div`
  position: relative;
  width: 18rem;
  height: 27rem;
  margin-left: 0.5rem;
`;

export const Default = Template.bind({});
Default.args = {
  state: {
    current_page: 'Now Showing',
    films: [],
  },
  updateState: () => {},
  testing: true,
  isLoaded: true,
  id: 'hvPPyI0BFY3MaKZR7A7G',
  shows: [
    {
      actual: '202204162230',
      auditorium: '8',
      date: '20220416',
      showId: '65878',
      time12: '10:30 pm',
      time24: '2300',
    },
    {
      actual: '202204162300',
      auditorium: '8',
      date: '20220416',
      showId: '65878',
      time12: '11:00 pm',
      time24: '1900',
    },
  ],
};
