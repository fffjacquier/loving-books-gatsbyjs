import { Link } from 'gatsby';
import React from 'react';
import Img from 'gatsby-image';
import styled from 'styled-components';

const BookGridStyles = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 4rem;
  grid-auto-rows: auto auto 500px;
`;

const BookStyles = styled.div`
  display: grid;
  /* take row sizing from bookGridStyles */
  @supports not (grid-template-rows: subgrid) {
    --rows: auto auto 1fr;
  }
  grid-template-rows: var(--rows, subgrid);
  grid-row: span 3;
  grid-gap: 1rem;
  h2,
  p {
    margin: 0;
  }
`;

function SingleBook({ book }) {
  return (
    <BookStyles>
      <Link to={`/book/${book.slug.current}`}>
        <h2>
          <span className="mark">{book.name}</span>
        </h2>
      </Link>
      <p>{book.tags.map((tag) => tag.name).join(', ')}</p>
      <Img fluid={book.image.asset.fluid} alt={book.name} />
    </BookStyles>
  );
}

const BookList = ({ books }) => (
  <BookGridStyles>
    {books.map((book) => (
      <SingleBook book={book} key={book.id} />
    ))}
  </BookGridStyles>
);

export default BookList;
