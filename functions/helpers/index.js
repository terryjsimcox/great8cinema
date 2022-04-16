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
  shows?.forEach(({ Show }) => {
    Show?.forEach((time) => {
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

const Schedule = async () => {
  const rts = await RTS();
  const dbFilms = await Storage.getDocuments();

  rts.forEach(async (rtsFilm) => {
    const document = dbFilms.filter(
      (film) => film.data.rtsTitle === rtsFilm.Title[0]
    );

    if (document.length === 0) {
      const temp = await MakeFilmDocument(rtsFilm.Title[0], rtsFilm);
      await Storage.addDocument(temp);
    }

    if (document.length > 0) {
      const tempShows = reconstructFilmShows(rtsFilm.Shows[0].Show);
      if (document.length > 0 && tempShows.length > 0) {
        try {
          await Storage.updateDocument(document[0].id, 'shows', tempShows);
        } catch (error) {
          console.error(error);
        }
      }

      console.log(
        dayjs(tempShows[0]?.date, 'YYYYMMDD') <= dayjs(),
        dayjs(document[0]?.data?.released, 'DD ddd YYYY') <= dayjs()
      );

      if (
        dayjs(document[0]?.data?.released, 'DD ddd YYYY') <= dayjs() &&
        dayjs(tempShows[0]?.date, 'YYYYMMDD') <= dayjs()
      ) {
        try {
          await Storage.updateDocument(
            document[0].id,
            'category',
            'Now Showing'
          );
        } catch (error) {
          console.error(error);
        }
      }
    }
  });
  await Storage.archiveDocument(dbFilms, rts);
};

module.exports = {
  TMDB,
  RTS,
  OMDB,
  Schedule,
  Storage,
};
