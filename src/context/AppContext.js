import React, { useContext, useEffect, useState } from 'react';
import axios from 'axios';
const AppContext = React.createContext();

const initialState = {
  films: [],
  current_page: 'Now Showing',
};

export const useApp = () => {
  return useContext(AppContext);
};

export const AppProvider = ({ children }) => {
  const [state, setState] = useState(initialState);

  function updateState(key, value) {
    setState({ ...state, [key]: value });
  }

  const value = {
    state,
    updateState,
  };

  useEffect(() => {
    axios
      .get('https://us-central1-great8cinema-a8432.cloudfunctions.net/GetFilms')
      .then((results) => setState({ ...state, films: results }))
      .catch((err) => console.log(err));
  }, []);
  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};
