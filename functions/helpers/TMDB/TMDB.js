const axios = require('axios');
const _ = require('lodash');
require('dotenv').config();

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

const getMovieDetails = async (filmTitle, year = new Date().getFullYear()) => {
  const title = convertTitleToHTTPUrlFriendly(filmTitle);

  try {
    const results = await axios.get(
      `https://api.themoviedb.org/3/search/movie\?api_key\=${process.env.TMDB_API_KEY}\&language\=en-US\&query\=${title}\&page\=1\&include_adult\=false\&year\=${year}`
    );
    return results.data.results[0];
  } catch (error) {
    return { isAxiosError: true, error };
  }
};

const getActorsDetails = async (movieID) => {
  try {
    const results = await axios.get(
      `https://api.themoviedb.org/3/movie/${movieID}/credits?api_key=${process.env.TMDB_API_KEY}&language=en-US`
    );
    return results.data;
  } catch (error) {
    return { isAxoisError: true, error };
  }
};

const TMDB = {
  movie: getMovieDetails,
  actors: getActorsDetails,
};

module.exports = TMDB;
