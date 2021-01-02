import React from 'react';
import ItemGrid from '../components/ItemGrid';
import LoadingGrid from '../components/LoadingGrid';
import HomePageGrid from '../styles/Grids';
import useLatestData from '../utils/useLatestData';

function CurrentlyReading({ authors }) {
  return (
    <div>
      <h2 className="center">
        <span className="mark tilt">Currently Reading...</span>
      </h2>
      <p>The best authors 🤖</p>
      {!authors && <LoadingGrid count={4} />}
      {authors && !authors.length && <p>No Book reading right now</p>}
      {authors?.length && <ItemGrid items={authors} />}
    </div>
  );
}

function HotNextBooks({ hot }) {
  return (
    <div>
      <h2 className="center">
        <span className="mark tilt">Hot shots soon</span>
      </h2>
      <p>My future pickles picks 🦉</p>
      {!hot && <LoadingGrid count={4} />}
      {hot && !hot.length && <p>Nothing Hot coming right now</p>}
      {hot?.length && <ItemGrid items={hot} />}
    </div>
  );
}

export default function HomePage() {
  const { author, hot } = useLatestData();

  return (
    <div className="center">
      <h1>The Books I am reading now. Or will.</h1>
      <p>Alas, Store is eternally closed for reading reasons.</p>
      <HomePageGrid>
        <CurrentlyReading authors={author} />
        <HotNextBooks hot={hot} />
      </HomePageGrid>
    </div>
  );
}

// get data straight from sanity in hook useLatestData
// https://i7vfcd89.api.sanity.io/v1/graphql/production/default
