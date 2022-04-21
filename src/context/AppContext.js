import React, { useContext, useState } from 'react';
const AppContext = React.createContext();

const initialState = {
  films: [],
  current_page: '',
  hostname: '',
};

export const useApp = () => {
  return useContext(AppContext);
};

const AppProvider = ({ children }) => {
  const [state, setState] = useState(initialState);

  function updateState(value) {
    setState(value);
  }

  const value = {
    state,
    updateState,
  };
  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};

export default AppProvider;
