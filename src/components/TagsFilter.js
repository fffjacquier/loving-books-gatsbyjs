import { graphql, Link, useStaticQuery } from 'gatsby';
import React from 'react';
import styled from 'styled-components';

const TagsStyles = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
  margin-bottom: 4rem;
  a {
    display: grid;
    grid-template-columns: auto 1fr;
    grid-gap: 0 1rem;
    align-items: center;
    padding: 5px;
    background: var(--grey);
    border-radius: 2px;
    .count {
      background: white;
      padding: 2px 5px;
    }
    &[aria-current='page'] {
      background: var(--yellow);
    }
  }
`;

function countBooksInTags(books) {
  const counts = books
    .map((book) => book.tags)
    .flat()
    .reduce((acc, tag) => {
      const existingTag = acc[tag.id];
      // if existing tag, increment by one
      // otherwise, set it to 1
      if (existingTag) {
        existingTag.count += 1;
      } else {
        acc[tag.id] = {
          id: tag.id,
          name: tag.name,
          count: 1,
        };
      }
      return acc;
    }, {});
  const sorted = Object.values(counts).sort((a, b) => b.count - a.count);
  return sorted;
}

export default function TagsFilter({ activeTag }) {
  // get list of tags
  // get list of all books with their tags
  const { books } = useStaticQuery(graphql`
    query {
      books: allSanityBook {
        nodes {
          tags {
            name
            id
          }
        }
      }
    }
  `);

  // count how many books in each tag
  const tagsWithCount = countBooksInTags(books.nodes);

  return (
    <TagsStyles>
      <Link to="/books">
        <span className="name">All</span>
        <span className="count">{books.nodes.length}</span>
      </Link>
      {tagsWithCount.map((tag) => (
        <Link to={`/tag/${tag.name}`} key={tag.id}>
          <span className="name">{tag.name}</span>
          <span className="count">{tag.count}</span>
        </Link>
      ))}
    </TagsStyles>
  );
}
