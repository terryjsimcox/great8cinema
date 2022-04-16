const { initializeApp } = require('firebase/app');
const {
  collection,
  addDoc,
  updateDoc,
  getFirestore,
  getDocs,
  doc,
} = require('firebase/firestore');

const firebaseConfig = {
  apiKey: 'AIzaSyDQey7E2am5XJ4e1KKCCXbygiZzADx--MY',
  authDomain: 'great8cinema-a8432.firebaseapp.com',
  projectId: 'great8cinema-a8432',
  storageBucket: 'great8cinema-a8432.appspot.com',
  messagingSenderId: '400071885471',
  appId: '1:400071885471:web:414330935a146c5cd6d8aa',
  measurementId: 'G-KLNJLJWFTS',
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

const addDocument = async (document) => {
  const docRef = await addDoc(collection(db, 'films'), document);
  return docRef;
};

const updateDocument = async (docID, field, data) => {
  console.log('UpdateDocument:', field);
  const dbDoc = doc(db, 'films', docID);
  await updateDoc(dbDoc, { [field]: data });
};

const archiveDocument = async (db, rts) => {
  db.forEach(async (document) => {
    if (
      rts.filter((film) => film.FilmCode[0] === document.data.filmCode).length >
      0
    )
      return;
    await updateDocument(document.id, 'category', 'Archived');
  });
};

const getDocuments = async () => {
  let documents = [];
  const docSnap = await getDocs(collection(db, 'films'));
  docSnap.forEach((doc) => {
    documents.push({ id: doc.id, data: doc.data() });
  });

  return documents;
};

const Storage = {
  addDocument,
  updateDocument,
  archiveDocument,
  getDocuments,
};

module.exports = Storage;
