import Navbar from '../components/Navbar';
import { MemoryRouter } from 'react-router-dom';
import styled from 'styled-components';

export default {
  title: 'Navbar/Navbar',
  component: Navbar,
  parameters: {
    backgrounds: {
      default: 'default',
      values: [{ name: 'default', value: '#272822' }],
    },
  },
};

const Template = (args) => (
  <Container>
    <MemoryRouter>
      <Navbar {...args} />
    </MemoryRouter>
  </Container>
);

const Container = styled.div`
  position: relative;
  height: 1000px;
`;

export const Default = Template.bind({});
Default.args = {
  state: {
    current_page: 'Now Showing',
    films: [],
  },
  updateState: () => {},
};
