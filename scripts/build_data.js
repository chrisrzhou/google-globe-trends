const fs = require('fs');
const googleTrends = require('google-trends-api');
const moment = require('moment');
const config = require('../src/config');
const reverseGeocode = require('country-reverse-geocoding').country_reverse_geocoding();

async function getTrends({ keyword }) {
  console.log(`Getting trends for "${keyword}" `);
  return googleTrends
    .interestByRegion({
      keyword,
      resolution: 'city',
    })
    .then(response => {
      const parsed = JSON.parse(response);
      const results = [];
      if (parsed && parsed.default && parsed.default.geoMapData) {
        parsed.default.geoMapData.forEach(d => {
          const { lat, lng } = d.coordinates;
          const country = reverseGeocode.get_country(lat, lng);
          if (country) {
            results.push({
              city: d.geoName,
              countryCode: country.code,
              countryName: country.name,
              coordinates: [lat, lng],
              value: d.value[0],
            });
          }
        });
      }
      return results;
    })
    .catch(err => console.error(err));
}

async function buildData({ keyword }) {
  const trends = await getTrends({ keyword });

  const data = {
    lastUpdated: moment().valueOf(),
    trends,
  };

  if (trends.length === 0) {
    console.log('No data fetched.  Skip writing to file...');
    return;
  }

  console.log('Writing data to file...');
  fs.writeFile(
    './src/_data/trends.json',
    JSON.stringify(data, null, 2),
    err => {
      if (err) {
        throw err;
      }
      console.log('Data file successfully saved!');
    },
  );
}

buildData(config.data);
