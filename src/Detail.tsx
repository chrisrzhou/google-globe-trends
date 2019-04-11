import moment from 'moment';
import React from 'react';

import Tippy from '@tippy.js/react';

import Blur from './Blur';
import Button from './Button';
import { getRandomMarker } from './state';
import { useStateValue } from './StateProvider';
import { ActionType } from './types';

const TOOLTIP =
  'Values are calculated on a scale from 0 to 100, where 100 is the location with the most popularity as a fraction of total searches in that location, a value of 50 indicates a location which is half as popular. A value of 0 indicates a location where there was not enough data for this term.';

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

function Detail(): React.ReactElement {
  const [state, dispatch] = useStateValue();
  const { activeTime, keyword, start, focusedMarker } = state;
  const randomMarker = getRandomMarker(state);
  let city;
  let countryName;
  let value;
  let url;
  if (focusedMarker !== undefined) {
    city = focusedMarker.city;
    countryName = focusedMarker.countryName;
    value = focusedMarker.value;
    url = getSearchURL(
      city,
      countryName,
      keyword,
      activeTime,
      moment(activeTime)
        .add(1, 'week')
        .valueOf(),
    );
  }
  return (
    <Blur
      className="details"
      config={{ friction: 50 }}
      shown={start && focusedMarker}>
      <div className="header">
        <Button
          label="Back to globe"
          onClick={(): void => dispatch({ type: ActionType.Focus })}
        />
        <Button
          label="Random City"
          onClick={(): void =>
            dispatch({ type: ActionType.Focus, payload: randomMarker })
          }
        />
      </div>
      <div className="content">
        <h1>
          {city}, {countryName}
        </h1>
        <Tippy animation="scale" content={TOOLTIP}>
          <p>
            <a href="#">Score: {value}</a>
          </p>
        </Tippy>
        <a href={url}>
          <Button
            label={`See all search results from ${moment(activeTime).format(
              'MMM YY',
            )}`}
          />
        </a>
      </div>
    </Blur>
  );
}

export default Detail;
