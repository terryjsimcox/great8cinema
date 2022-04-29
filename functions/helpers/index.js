const _ = require('lodash');
const dayjs = require('dayjs');
const genresList = require('../models/genres');
const TMDB = require('./TMDB/TMDB');
const OMDB = require('./OMDB/OMDB');
const RTS = require('./RTS/RTS');
const Storage = require('./Storage/Storage');
const { v4: uuid } = require('uuid');

require('dotenv').config();

const MakeFilmDocument = async (title, film) => {
  let temp = {
    _id: '',
    TMDB_id: '',
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
    const MDBfilm = await TMDB.movie(title);
    const actors = await TMDB.actors(MDBfilm.id);
    const OMDBfilm = MDBfilm.title && (await OMDB(MDBfilm.title));

    temp._id = uuid();
    temp.TMDB_id = MDBfilm.id;
    temp.actors = reconstructActors(actors.cast);
    temp.backdrop = `https://image.tmdb.org/t/p/original${MDBfilm.backdrop_path}`;
    temp.category = 'Coming Soon';
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

    OMDBfilm?.Writer?.split(',')?.map((writer) => temp.writer.push(writer));
    OMDBfilm?.Director?.split(',')?.map((director) =>
      temp.director.push(director)
    );
    return temp;
  } catch (error) {
    console.error(error);
  }
};

const reconstructActors = (cast) => {
  let tempCast = [];

  cast.forEach((actor) => {
    const tempActor = {
      name: actor.name,
      profile:
        actor.profile_path === null
          ? null
          : `https://image.tmdb.org/t/p/original${actor.profile_path}`,
      character: actor.character.split('/'),
      popularity: actor.popularity,
    };
    tempCast.push(tempActor);
  });
  return tempCast;
};

const reconstructFilmShows = (shows) => {
  let tempShows = [];
  shows.Show?.forEach((show) => {
    tempShows.push({
      actual: show.DT[0],
      date: dayjs(show.DT[0], 'YYYYMMDDhhmm').format('YYYYMMDD'),
      time12: dayjs(show.DT[0], 'YYYYMMDDhhmm').format('h:mm a'),
      time24: parseInt(dayjs(show.DT[0], 'YYYYMMDDhhmm').format('HHmm')),
      auditorium: show.Aud[0],
      showId: splitShowId(show.ID[0]),
    });
  });
  return tempShows;
};

const changeCategory = async (site, film, tempShows) => {
  const checkedShows = [];

  if (film.data.category === 'Now Showing')
    return `${film.data.title}: ${false}`;

  if (dayjs(film.data.released, 'DD ddd YYYY') <= dayjs()) {
    tempShows.forEach((show) => {
      if (dayjs(show.date, 'YYYYMMDD') <= dayjs()) checkedShows.push(show);
    });

    if (checkedShows.length > 0) {
      try {
        await Storage.updateDocument(site, film.id, 'category', 'Now Showing');
        return `${film.data.title}: ${true}`;
      } catch (error) {
        console.error(error);
      }
    }
  }
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

const Schedule = async (site) => {
  const rts = await RTS(site);
  const dbFilms = await Storage.getDocuments(site);

  rts.forEach(async (rtsFilm) => {
    const document = dbFilms.filter(
      (film) => film.data.rtsTitle === rtsFilm.Title[0]
    );

    if (document.length === 0) {
      const temp = await MakeFilmDocument(rtsFilm.Title[0], rtsFilm);
      return await Storage.addDocument(site, temp);
    }

    if (document.length > 0) {
      const tempShows = reconstructFilmShows(rtsFilm.Shows[0]);
      console.log('TempShows:', tempShows.length);
      if (tempShows.length > 0) {
        try {
          console.log(`Trying to update ${document[0]?.data?.title} shows.`);
          await changeCategory(site, document[0], tempShows);
          await Storage.updateDocument(
            site,
            document[0].id,
            'shows',
            tempShows
          );
        } catch (error) {
          console.error(error);
        }
      }
    }
  });
  await Storage.archiveDocument(site, dbFilms, rts);
};

module.exports = {
  TMDB,
  RTS,
  OMDB,
  Schedule,
  Storage,
};
