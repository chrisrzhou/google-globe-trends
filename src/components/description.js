import React from 'react';

import { useStateValue } from '../state';
import Link from './link';

export default function Description() {
  const [{ config }] = useStateValue();

  return (
    <>
      Visualizing <b>{`"${config.keyword.join(', ')}"`}</b> Google Trends with{' '}
      <Link link="REACT_GLOBE_GITHUB">react-globe</Link>
    </>
  );
}
