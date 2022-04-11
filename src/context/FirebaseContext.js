import React, { useContext } from 'react';
import { firebaseConfig } from '../firebase';
import { initializeApp } from 'firebase/app';
import { getStorage, ref, getDownloadURL } from 'firebase/storage';

const FirebaseContext = React.createContext();

const firebase = initializeApp(firebaseConfig);
const storage = getStorage(firebase);

export const useFirebase = () => {
  return useContext(FirebaseContext);
};

const FirebaseProvider = ({ children }) => {
  const getUrl = async (directory, fileName) => {
    const url = await getDownloadURL(ref(storage, `${directory}/${fileName}`));
    return url;
  };

  const value = {
    getUrl,
  };

  return (
    <FirebaseContext.Provider value={value}>
      {children}
    </FirebaseContext.Provider>
  );
};

export default FirebaseProvider;
