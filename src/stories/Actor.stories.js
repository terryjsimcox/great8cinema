import Actor from '../components/Card/Actor';

import testPhoto from './assets/testPhoto.jpg';
import styled from 'styled-components';

export default {
  title: 'Cards/Actor',
  component: Actor,
  parameters: {
    backgrounds: {
      default: 'default',
      values: [{ name: 'default', value: '#272822' }],
    },
  },
};

const Template = (args) => (
  <Container>
    <Actor {...args} />
  </Container>
);

const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const Loading = Template.bind({});
Loading.args = {
  src: null,
  alt: null,
  name: null,
  character: [],
};

export const LoadedWithImage = Template.bind({});
LoadedWithImage.args = {
  src: testPhoto,
  alt: 'Benedict Cumberbatch',
  name: 'Benedict Cumberbatch',
  character: ['Dr. Stephen Strange'],
};

export const LoadedWithOutImage = Template.bind({});
LoadedWithOutImage.args = {
  src: null,
  alt: 'Benedict Cumberbatch',
  name: 'Benedict Cumberbatch',
  character: ['Dr. Stephen Strange'],
};
