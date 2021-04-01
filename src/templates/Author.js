import { graphql } from 'gatsby';
import React from 'react';
import Img from 'gatsby-image';
import SEO from '../components/SEO';

export default function SinglerAuthorPage({ data }) {
  const { author } = data;
  return (
    <>
      <SEO title={author.name} image={author.image?.asset?.fluid?.src} />
      <div className="center">
        {author.image && (
          <Img fluid={author.image.asset.fluid} alt={author.name} />
        )}
        <h2>
          <span className="mark">{author.name}</span>
        </h2>
        <p className="text">{author.description}</p>
      </div>
    </>
  );
}

// this needs to be dynamic based on the slug passed
// in via context in gatsby-node.js
// other advantage doing it there: immediate relaod, no need to restart gatsby
export const query = graphql`
  query($slug: String!) {
    author: sanityAuthor(slug: { current: { eq: $slug } }) {
      name
      id
      description
      image {
        asset {
          fluid(maxWidth: 1000, maxHeight: 750) {
            ...GatsbySanityImageFluid
          }
        }
      }
    }
  }
`;
