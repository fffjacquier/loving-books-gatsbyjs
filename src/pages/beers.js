import { graphql } from 'gatsby';
import React from 'react';

export default function BeersPage({ data }) {
  console.log(data.beers.nodes);
  return (
    <>
      <h2 className="center">
        We have {data.beers.nodes.length} beers available.
      </h2>
      <div>
        {data.beers.nodes.map((beer) => {
          console.log(beer);
          return (
            <div key={beer.id}>
              <img src={beer.image} alt={beer.name} />
              <h3>{beer.name}</h3>
              {beer.price}
            </div>
          );
        })}
      </div>
    </>
  );
}

export const query = graphql`
  query {
    beers: allBeer {
      nodes {
        id
        name
        price
        image
        rating {
          average
          reviews
        }
      }
    }
  }
`;
