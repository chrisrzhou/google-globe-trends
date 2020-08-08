import React from 'react';

import { getRandomMarker } from '../state/selectors';
import { useStateValue } from '../state/StateProvider';
import { ActionType } from '../types';
import Blur from './ui/Blur';
import Button from './ui/Button';

function getSearchURL(
  city: string,
  country: string,
  keyword: string[],
): string {
  const formattedQuery = `${encodeURIComponent(city)}, ${encodeURIComponent(
    country,
  )} ${encodeURIComponent(keyword.join('|'))}`.replace(/(%20| )/g, '+');
  return `https://www.google.com/search?q=${formattedQuery}`;
}

function Details(): React.ReactElement {
  const [state, dispatch] = useStateValue();
  const { keyword, start, focusedMarker } = state;
  const randomMarker = getRandomMarker(state);
  if (!focusedMarker) {
    return <div />;
  }
  const { city, countryCode, countryName, value } = focusedMarker;
  const url = getSearchURL(city, countryName, keyword);
  const relatedTopics = state.relatedTopics[countryCode] || [];
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
          {city}, {countryName} ({value})
        </h2>
        <div className="details-content">
          RELATED TOPICS
          {relatedTopics.map(
            ({ topic, link }): React.ReactNode => {
              return (
                <a
                  key={topic}
                  href={`https://trends.google.com${link}`}
                  rel="noopener noreferrer"
                  target="_blank">
                  {topic}
                </a>
              );
            },
          )}
        </div>
        <a href={url} rel="noopener noreferrer" target="_blank">
          <Button label="View search results" />
        </a>
      </div>
    </Blur>
  );
}

export default Details;
