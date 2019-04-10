import moment from 'moment';
import * as React from 'react';

function getSearchURL(
  city: string,
  country: string,
  keyword: string,
  startTime: number,
  endTime: number,
): string {
  const formattedQuery = `${encodeURIComponent(city)}, ${encodeURIComponent(
    country,
  )} ${encodeURIComponent(keyword)}`.replace(/(%20| )/g, '+');
  const formattedStartTime = moment(startTime).format('MM/DD/YYYY');
  const formattedEndTime = moment(endTime).format('MM/DD/YYYY');
  return `https://www.google.com/search?q=${formattedQuery}&tbs=cdr:1,cd_min:${formattedStartTime},cd_max:${formattedEndTime}`;
}

function Trends(): React.ReactElement {
  return (
    <a
      href={getSearchURL(
        'San Fransisco',
        'US',
        '#MeToo',
        moment()
          .subtract(1, 'year')
          .valueOf(),
        moment()
          .subtract(2, 'month')
          .valueOf(),
      )}
      rel="noopener noreferrer"
      target="_blank">
      See all results
    </a>
  );
}

export default Trends;
