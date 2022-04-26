import React from 'react';

import { useApp } from '../../context/AppContext';

const Logo = () => {
  const { state } = useApp();
  const Svg = import(`${state.site.svg}`);
  return <Svg />;
};

export default Logo;
