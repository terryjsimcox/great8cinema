const parseString = require('xml2js').parseString;
const axios = require('axios');
const _ = require('lodash');
const dayjs = require('dayjs');
const filmTemplate = require('../models/film');
const genresList = require('../models/genres');
const { v4: uuid } = require('uuid');

const { initializeApp } = require('firebase/app');
const {
  collection,
  addDoc,
  getFirestore,
  getDocs,
  doc,
  query,
  where,
} = require('firebase/firestore');

require('dotenv').config();

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

const parseXML = async (data) => {
  return new Promise((resolve, reject) => {
    return parseString(data, (error, response) => {
      if (error) {
        reject(error);
        return {
          error: true,
          errorMessage: error,
          message: 'There was an issue with parse the XML file.',
        };
      } else {
        return resolve(response);
      }
    });
  });
};

const MovieDB = async (filmTitle, year = new Date().getFullYear()) => {
  const title = convertTitleToHTTPUrlFriendly(filmTitle);

  try {
    const results = await axios.get(
      `https://api.themoviedb.org/3/search/movie\?api_key\=${process.env.TMDB_API_KEY}\&language\=en-US\&query\=${title}\&page\=1\&include_adult\=false\&year\=${year}`
    );
    return results.data.results[0];
  } catch (error) {
    console.error(error);
  }
};

const convertTitleToHTTPUrlFriendly = (title, noSpaces) => {
  const tempTitle = title.split(' ');
  let newTitleWithSpaces = '';

  if (noSpaces) {
    tempTitle.forEach((word) => {
      if (_.indexOf(tempTitle, word) === 0) {
        newTitleWithSpaces += word;
      } else {
        newTitleWithSpaces += word;
      }
    });
    return newTitleWithSpaces;
  }

  tempTitle.forEach((word) => {
    if (_.indexOf(tempTitle, word) === 0) {
      newTitleWithSpaces += word;
    } else {
      newTitleWithSpaces += `%20${word}`;
    }
  });

  return newTitleWithSpaces;
};

const RTS = async () => {
  const URI = process.env.RTS_GREAT8_URI;
  const body = process.env.RTS_REQUEST;

  try {
    const results = await axios.post(URI, body, {
      auth: {
        username: process.env.RTS_GREAT8_USERNAME,
        password: process.env.RTS_PASSWORD,
      },
      headers: {
        Accept: 'application/json, text/plain, text/html',
        'X-Requested-With': 'XMLHttpRequest',
        'Accept-Encoding': 'gzip',
      },
    });
    if (results.status === 200) {
      const schedule = await parseXML(results.data);
      return schedule.Response.ShowSchedule[0].Films[0].Film;
    }
  } catch (error) {
    return error;
  }
};

const OMDB = async (title, year = dayjs().year()) => {
  const result = await axios.get(
    `${process.env.OMDB_URI}t=${title}&y=${year}&p=full${process.env.OMDB_API_KEY}`
  );
  return result.data;
};

const MakeFilmDocument = async (title, film) => {
  let temp = {
    _id: '',
    actors: [],
    backdrop: '',
    category: null,
    director: [],
    filmCode: '',
    genres: [],
    length: '',
    manualEdited: false,
    plot: '',
    poster: '',
    rating: '',
    released: '',
    rtsTitle: '',
    shows: [],
    status: '',
    title: '',
    writer: [],
    year: '',
  };

  try {
    const MDBfilm = await MovieDB(title);
    const OMDBfilm = MDBfilm.title && (await OMDB(MDBfilm.title));

    temp._id = uuid();
    temp.backdrop = `https://image.tmdb.org/t/p/original${MDBfilm.backdrop_path}`;
    temp.category = null;
    temp.filmCode = film.FilmCode[0];
    temp.genres = getGenres(genresList, MDBfilm.genre_ids);
    temp.length = film.Length[0];
    temp.plot = MDBfilm.overview;
    temp.poster = `https://image.tmdb.org/t/p/original${MDBfilm.poster_path}`;
    temp.released = OMDBfilm.Released ? OMDBfilm.Released : null;
    temp.rating = film.Rating[0] ? film.Rating[0] : null;
    temp.title = MDBfilm.title;
    temp.rtsTitle = film.Title[0];
    temp.shows = reconstructFilmShows(film.Shows);
    temp.year = OMDBfilm.Year ? OMDBfilm.Year : null;

    OMDBfilm?.Actors?.split(',')?.map((actor) => temp.actors.push(actor));
    OMDBfilm?.Writer?.split(',')?.map((writer) => temp.writer.push(writer));
    OMDBfilm?.Director?.split(',')?.map((director) =>
      temp.director.push(director)
    );
    return temp;
  } catch (error) {
    console.error(error);
  }
};

const reconstructFilmShows = (shows) => {
  let tempShows = [];
  shows.forEach(({ Show }) => {
    Show.forEach((time) => {
      tempShows.push({
        actual: time.DT[0],
        date: dayjs(time.DT[0], 'YYYYMMDDhhmm').format('YYYYMMDD'),
        time12: dayjs(time.DT[0], 'YYYYMMDDhhmm').format('h:mm a'),
        time24: parseInt(dayjs(time.DT[0], 'YYYYMMDDhhmm').format('HHmm')),
        auditorium: time.Aud[0],
        showId: splitShowId(time.ID[0]),
      });
    });
  });
  return tempShows;
};

const splitShowId = (showId) => {
  const rtsShowId = showId.split('');
  const newShowId = [];

  rtsShowId.forEach((id, index) => {
    if (index !== 0 && index < 6) newShowId.push(id);
  });

  return newShowId.join('');
};

const getGenres = (genresList, filmGenres) => {
  let tempGenres = [];
  filmGenres.forEach((id) => tempGenres.push(_.find(genresList, { id }).name));
  return tempGenres;
};

const addDocument = async (document) => {
  const docRef = await addDoc(collection(db, 'films'), document);
};

const checkDocument = async (query) => {};

const getDocuments = async () => {
  let documents = [];
  const docSnap = await getDocs(collection(db, 'films'));
  docSnap.forEach((doc) => {
    documents.push({ id: doc.id, data: doc.data() });
  });

  return documents;
};

const Schedule = async () => {
  const rts = await RTS();
  const dbFilms = await getDocuments();

  rts.forEach(async (film) => {
    const temp = await MakeFilmDocument(film.Title[0], film);
    const filter = dbFilms.filter((film) => film.data.title === 'Dog');
    if (filter.length === 0) await addDocument(temp);
  });
};

module.exports = { MovieDB, RTS, OMDB, Schedule, getDocuments };
