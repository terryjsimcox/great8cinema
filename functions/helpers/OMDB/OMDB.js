const axios = require('axios');
const dayjs = require('dayjs');

const OMDB = async (title, year = dayjs().year()) => {
  const result = await axios.get(
    `${process.env.OMDB_URI}t=${title}&y=${year}&p=full${process.env.OMDB_API_KEY}`
  );
  return result.data;
};

module.exports = OMDB;
