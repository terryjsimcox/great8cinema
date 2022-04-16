const parseString = require('xml2js').parseString;
const axios = require('axios');

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

module.exports = RTS;
