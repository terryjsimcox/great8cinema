import Carousel from '../components/Carousel';
import styled from 'styled-components';

export default {
  title: 'Carousel/Hero',
  component: Carousel,
  parameters: {
    backgrounds: {
      default: 'default',
      values: [{ name: 'default', value: '#272822' }],
    },
  },
};

const Template = (args) => (
  <Container>
    <Carousel {...args} />
  </Container>
);

const Container = styled.div`
  position: relative;
  z-index: -1;
  display: flex;
  margin: 0;
  padding: 0;
  height: 2000px;
  width: 100vw;
  background-color: hsl(0, 0%, 5%);
  overflow: hidden;
`;

export const Default = Template.bind({});
Default.args = {
  films: [
    {
      data: {
        category: 'Now Showing',
        title: 'Sonic',
        backdrop:
          'https://image.tmdb.org/t/p/original/egoyMDLqCxzjnSrWOz50uLlJWmD.jpg',
      },
    },
    {
      data: {
        category: 'Now Showing',
        title: 'Father Stu',
        backdrop:
          'https://image.tmdb.org/t/p/original/bSJs4alJq5O2DkyfWYUU7oxeiio.jpg',
      },
    },
    {
      data: {
        category: 'Now Showing',
        title: 'The Northman',
        backdrop:
          'https://image.tmdb.org/t/p/original/ik9SVGcYxKg6y2a9cW0e0WchImW.jpg',
      },
    },
  ],
};
