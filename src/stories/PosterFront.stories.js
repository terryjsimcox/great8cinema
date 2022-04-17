import PosterFront from '../components/Card/PosterFront';

export default {
  title: 'Cards/PosterFront',
  component: PosterFront,
};

const Template = (args) => <PosterFront {...args} />;

export const Loaded = Template.bind({});
Loaded.args = {
  isLoaded: true,
  setIsLoaded: () => false,
  src: 'https://image.tmdb.org/t/p/original/wRnbWt44nKjsFPrqSmwYki5vZtF.jpg',
  alt: 'Doctor Strange in the Multiverse of Madness',
};
