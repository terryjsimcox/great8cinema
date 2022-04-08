// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getAnalytics } from 'firebase/analytics';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: 'AIzaSyDQey7E2am5XJ4e1KKCCXbygiZzADx--MY',
  authDomain: 'great8cinema-a8432.firebaseapp.com',
  projectId: 'great8cinema-a8432',
  storageBucket: 'great8cinema-a8432.appspot.com',
  messagingSenderId: '400071885471',
  appId: '1:400071885471:web:414330935a146c5cd6d8aa',
  measurementId: 'G-KLNJLJWFTS',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
