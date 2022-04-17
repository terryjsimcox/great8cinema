import Actor from '../components/Card/Actor';

import testPhoto from './assets/testPhoto.jpg';

export default {
  title: 'Cards/Actor',
  component: Actor,
};

const Template = (args) => <Actor {...args} />;

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
