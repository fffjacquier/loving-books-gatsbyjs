import { graphql } from 'gatsby';
import React from 'react';
import Img from 'gatsby-image';
import styled from 'styled-components';
import SEO from '../components/SEO';

const BookGrid = styled.div`
  display: grid;
  grid-gap: 2rem;
  grid-template-columns: repeat(auto-fill, minmax(400px, 1fr));
  blockquote {
    letter-spacing: 0;
    line-height: 1.4;
    margin: 0;
    margin-top: 1em;
    padding-left: 0.5rem;
    padding-top: 6rem;
    position: relative;
    border-left: 3px solid var(--yellow);
    font-family: Georgia, Times, 'Times New Roman', serif;
    font-style: italic;
    transition: 0.2s border ease-in-out;
    z-index: 0;
    &:before {
      content: '“';
      position: absolute;
      top: 0;
      left: -1rem;
      height: 2em;
      width: 5px;
      margin-top: -10rem;
      font-size: 1500%;
      color: var(--yellow);
      transition: 0.2s all ease-in-out, 0.4s transform ease-in-out;
    }
    &:active:after {
      transform: rotateY(360deg);
    }
  }
  blockquote p {
    padding-left: 1em;
  }
  cite
    display: block
    font-size: 0.75em
    line-height: 1.8em
    margin-top: 1em
  .quotiquo {
    float: left;
    height: 45px;
    margin-top: -20px;
    padding-top: 45px;
    margin-bottom: -50px;
    font-size: 700%;
    color: var(--yellow);
  }
`;

export default function SingleBookPage({ data }) {
  const { book } = data;
  let starting;
  if (book.starts) {
    starting = book.starts[0].children.map((elem) => elem.text).join('');
  }

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
          {starting && (
            <blockquote>
              <p>{starting}</p>
              {/* <span className="quotiquo">“</span> */}
            </blockquote>
          )}
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
      status
      starts {
        children {
          text
        }
      }
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
