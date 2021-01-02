import React from 'react';
import { graphql } from 'gatsby';
import BookList from '../components/BookList';
import TagsFilter from '../components/TagsFilter';
import SEO from '../components/SEO';

export default function BooksPage({ data, pageContext }) {
  const books = data.books.nodes;
  return (
    <>
      <SEO
        title={pageContext.tag ? `Book genre ${pageContext.tag}` : ' All books'}
      />
      <TagsFilter activeTag={pageContext.tag} />
      <BookList books={books} />
    </>
  );
}

// Page query
// with regex instead of in:
// regex : $toppingRegex (and use $toppingRegex instead of $tag param)
export const query = graphql`
  query BookQuery($tag: [String]) {
    books: allSanityBook(
      filter: { tags: { elemMatch: { name: { in: $tag } } } }
    ) {
      nodes {
        name
        id
        price
        slug {
          current
        }
        authors {
          id
          name
        }
        tags {
          id
          name
        }
        image {
          asset {
            #fixed(width: 200, height: 200) {
            #  ...GatsbySanityImageFixed
            #}
            fluid(maxWidth: 300) {
              ...GatsbySanityImageFluid
            }
          }
        }
      }
    }
  }
`;
