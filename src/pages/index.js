import React from 'react';
import EnteringBooks from '../components/EnteringBooks';
import ItemGrid from '../components/ItemGrid';
import LoadingGrid from '../components/LoadingGrid';
import SEO from '../components/SEO';
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
      {authors?.length && <ItemGrid items={authors} base="/author" />}
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
      {hot?.length && <ItemGrid items={hot} base="/book" />}
    </div>
  );
}

export default function HomePage() {
  const { author, hot } = useLatestData();

  return (
    <div className="center">
      <SEO
        title="Books I am reading now or will be soon"
        description="Currently reading and next reading hot shots"
      />
      <h1>The Books I am reading now. Or will. One day.</h1>
      <p>Store is obviously closed for reading reasons.</p>
      <HomePageGrid>
        <CurrentlyReading authors={author} />
        <HotNextBooks hot={hot} />
      </HomePageGrid>
      <EnteringBooks />
    </div>
  );
}

// get data straight from sanity in hook useLatestData
// https://i7vfcd89.api.sanity.io/v1/graphql/production/default
