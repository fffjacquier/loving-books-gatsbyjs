import { graphql } from 'gatsby';
import React from 'react';
import Img from 'gatsby-image';
import styled from 'styled-components';
import SEO from '../components/SEO';

const BookGrid = styled.div`
  display: grid;
  grid-gap: 2rem;
  grid-template-columns: repeat(auto-fill, minmax(400px, 1fr));
`;

export default function SingleBookPage({ data }) {
  const { book } = data;
  return (
    <>
      <SEO
        title={book.name}
        description={book.description}
        image={book.image?.asset?.fluid?.src}
      />
      <BookGrid>
        <Img fluid={book.image.asset.fluid} alt={book.name} />
        <div>
          <h2 className="mark">{book.name}</h2>
          <ul>
            {book.authors.map((author) => (
              <li key={author.id}>{author.name}</li>
            ))}
          </ul>
          <ul>
            {book.tags.map((tag) => (
              <li key={tag.id}>{tag.name}</li>
            ))}
          </ul>
        </div>
      </BookGrid>
    </>
  );
}

// this needs to be dynamic based on the slug passed
// in via context in gatsby-node.js
// other advantage doing it there: immediate relaod, no need to restart gatsby
export const query = graphql`
  query($slug: String!) {
    book: sanityBook(slug: { current: { eq: $slug } }) {
      name
      id
      image {
        asset {
          fluid(maxWidth: 800) {
            ...GatsbySanityImageFluid
          }
        }
      }
      authors {
        name
        id
      }
      tags {
        name
        id
        adult_only
      }
    }
  }
`;
