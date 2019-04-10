const fs = require('fs');
const googleTrends = require('google-trends-api');
const moment = require('moment');
const config = require('../src/config');
const reverseGeocode = require('country-reverse-geocoding').country_reverse_geocoding();

async function wait(ms) {
  return new Promise(resolve => {
    setTimeout(resolve, ms);
  });
}

async function getTrendsByDate({ keyword, startDate, endDate }) {
  console.log(
    `Getting trends for "${keyword}" from ${moment(startDate).format(
      'YYYY-MM-DD',
    )} to ${moment(endDate).format('YYYY-MM-DD')}...`,
  );
  return googleTrends
    .interestByRegion({
      endDate,
      keyword,
      resolution: 'city',
      startDate,
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

async function getInterestOverTime({ keyword, months }) {
  console.log(
    `Getting interest over time for "${keyword}" over the past ${months} months...`,
  );
  const startTime = moment()
    .subtract(months, 'months')
    .startOf('month')
    .toDate();

  return googleTrends
    .interestOverTime({
      keyword,
      startTime,
    })
    .then(response => {
      const parsed = JSON.parse(response);
      if (parsed && parsed.default && parsed.default.timelineData) {
        return parsed.default.timelineData.map(d => ({
          time: d.time * 1000, // convert from unix to unix ms
          value: d.value[0] || 0,
        }));
      }
      return [];
    })
    .catch(err => console.error(err));
}

async function buildData({ keyword, months }) {
  interestOverTime = await getInterestOverTime({ keyword, months });

  const trends = {};
  for (let i = 0; i < interestOverTime.length; i++) {
    const { time } = interestOverTime[i];
    const nextTime = interestOverTime[i + 1];
    const startDate = time;
    const endDate = nextTime !== undefined ? nextTime.time : undefined;
    await wait(500); // wait/throttle 500ms
    const trendsData = await getTrendsByDate({ keyword, startDate, endDate });
    trends[time] = trendsData;
  }

  const data = {
    interestOverTime,
    lastUpdated: moment().valueOf(),
    trends,
  };

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
