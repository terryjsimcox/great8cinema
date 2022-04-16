const functions = require('firebase-functions');
const { RTS, TMDB, OMDB, Storage, Schedule } = require('./helpers');
require('dotenv').config();

exports.rtsSchedule = functions.https.onRequest(async (req, res) => {
  const schedule = await RTS();
  await Schedule();
  res.send(schedule);
});

exports.MovieDB = functions.https.onRequest(async (req, res) => {
  let results;
  switch (req.method) {
    case 'POST':
      results = await TMDB.movie(req.body.title, req.body.year);
      res.send(results);
      break;
    case 'GET':
      results = await TMDB.movie(req.query.title, req.query.year);
      res.send(results);
      break;
    default:
      res.send({ message: 'You use the wrong method' });
  }
});

exports.MovieDBActors = functions.https.onRequest(async (req, res) => {
  let results;
  switch (req.method) {
    case 'POST':
      results = await TMDB.actors(req.query.id);
      res.send(results);
      break;
    case 'GET':
      results = await TMDB.actors(req.query.id);
      res.send(results);
      break;
    default:
      res.send({ message: 'Use the wrong method. Please try agin.' });
  }
  res.send(req.query);
});

exports.OMDB = functions.https.onRequest(async (req, res) => {
  let results;
  switch (req.method) {
    case 'POST':
      results = await OMDB(req.body.title, req.body.year);
      res.send(results);
      break;
    case 'GET':
      results = await OMDB(req.query.title, req.query.year);
      res.send(results);
      break;
    default:
      res.send({ message: 'You use the wrong method' });
  }
});

exports.GetFilms = functions.https.onRequest(async (req, res) => {
  try {
    const results = await Storage.getDocuments();
    res.set('Access-Control-Allow-Origin', '*');
    if (req.method === 'OPTIONS') {
      res.set('Access-Control-Allow-Methods', 'GET');
      res.set('Access-Control-Max-Age', '3600');
      res.status(204).send('');
    } else {
      res.send(results);
    }
  } catch (err) {
    console.log(err);
  }
});
