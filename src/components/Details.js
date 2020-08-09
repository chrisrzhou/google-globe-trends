import React from 'react';

import { getRandomMarker } from '../state/selectors';
import { useStateValue } from '../state/StateProvider';
import Fade from './Fade';
import Button from './Button';

function getSearchURL(city, country, keyword) {
  const formattedQuery = `${encodeURIComponent(city)}, ${encodeURIComponent(
    country,
  )} ${encodeURIComponent(keyword.join('|'))}`.replace(/(%20| )/g, '+');
  return `https://www.google.com/search?q=${formattedQuery}`;
}

function Details() {
  const [state, dispatch] = useStateValue();
  const { keyword, start, focusedMarker } = state;
  const randomMarker = getRandomMarker(state);

  let content;
  if (focusedMarker) {
    const { city, countryCode, countryName, value } = focusedMarker;
    const url = getSearchURL(city, countryName, keyword);
    const relatedTopics = state.relatedTopics[countryCode] || [];
    content = (
      <>
        <div className="header">
          <Button
            label="Back to globe"
            onClick={() => dispatch({ type: 'FOCUS' })}
          />
          <Button
            label="Random City"
            onClick={() => dispatch({ type: 'FOCUS', payload: randomMarker })}
          />
        </div>
        <div className="content">
          <h2>
            {city}, {countryName} ({value})
          </h2>
          <div className="details-content">
            RELATED TOPICS
            {relatedTopics.map(({ topic, link }) => {
              return (
                <a
                  key={topic}
                  href={`https://trends.google.com${link}`}
                  rel="noopener noreferrer"
                  target="_blank">
                  {topic}
                </a>
              );
            })}
          </div>
          <a href={url} rel="noopener noreferrer" target="_blank">
            View search results
          </a>
        </div>
      </>
    );
  }

  return (
    <Fade className="details" shown={start}>
      {content}
    </Fade>
  );
}

export default Details;
