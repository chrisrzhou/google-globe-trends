import React from 'react';

import Tippy from '@tippy.js/react';

import { getRandomMarker } from '../state/selectors';
import { useStateValue } from '../state/StateProvider';
import { ActionType } from '../types';
import Blur from './ui/Blur';
import Button from './ui/Button';

const TOOLTIP =
  'Values are calculated on a scale from 0 to 100, where 100 is the location with the most popularity as a fraction of total searches in that location, a value of 50 indicates a location which is half as popular. A value of 0 indicates a location where there was not enough data for this term.';

function getSearchURL(city: string, country: string, keyword: string): string {
  const formattedQuery = `${encodeURIComponent(city)}, ${encodeURIComponent(
    country,
  )} ${encodeURIComponent(keyword)}`.replace(/(%20| )/g, '+');
  return `https://www.google.com/search?q=${formattedQuery}`;
}

function Details(): React.ReactElement {
  const [state, dispatch] = useStateValue();
  const { keyword, start, focusedMarker } = state;
  const randomMarker = getRandomMarker(state);
  if (!focusedMarker) {
    return <div />;
  }
  const { city, countryName, value } = focusedMarker;
  const url = getSearchURL(city, countryName, keyword);
  return (
    <Blur className="details" config={{ friction: 50 }} shown={start}>
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
        <h2>
          {city}, {countryName}
        </h2>
        <p>
          <Tippy animation="scale" content={TOOLTIP}>
            <a href="#">Score: {value}</a>
          </Tippy>
        </p>
        <a href={url}>
          <Button label="View all search results" />
        </a>
      </div>
    </Blur>
  );
}

export default Details;
