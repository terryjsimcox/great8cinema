const functions = require('firebase-functions');
const { RTS, MovieDB, OMDB, getDocuments } = require('./helpers');
require('dotenv').config();

exports.rtsSchedule = functions.https.onRequest(async (req, res) => {
  const schedule = await RTS();
  res.send(schedule);
});

exports.MovieDB = functions.https.onRequest(async (req, res) => {
  let results;
  switch (req.method) {
    case 'POST':
      results = await MovieDB(req.body.title, req.body.year);
      res.send(results);
      break;
    case 'GET':
      results = await MovieDB(req.query.title, req.query.year);
      res.send(results);
      break;
    default:
      res.send({ message: 'You use the wrong method' });
  }
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
    const results = await getDocuments();
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
