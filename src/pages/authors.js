import { graphql, Link } from 'gatsby';
import React from 'react';
import Img from 'gatsby-image';
import styled from 'styled-components';
import Pagination from '../components/Pagination';
import SEO from '../components/SEO';

const AuthorGrid = styled.div`
  display: grid;
  grid-gap: 2rem;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
`;

const AuthorStyles = styled.div`
  a {
    text-decoration: none;
  }
  .gatsby-image-wrapper {
    height: 250px;
  }
  h2 {
    transform: rotate(-2deg);
    text-align: center;
    font-size: 4rem;
    margin-bottom: -2rem;
    position: relative;
    z-index: 2;
  }
  .description {
    background: var(--yellow);
    padding: 1rem;
    margin: 2rem;
    margin-top: -6rem;
    position: relative;
    text-align: center;
  }
`;

export default function AuthorsPage({ data, pageContext }) {
  console.log(data);
  const authors = data.authors.nodes;
  const numAuthors = data.authors.totalCount;

  return (
    <>
      <SEO title={`Authors - page ${pageContext.currentPage}`} />
      <Pagination
        pageSize={parseInt(process.env.GATSBY_PAGE_SIZE)}
        totalCount={numAuthors}
        currentPage={pageContext.currentPage || 1}
        skip={pageContext.skip}
        base="/authors"
      />
      <AuthorGrid>
        {authors.map((author) => (
          <AuthorStyles key={author.id}>
            <Link to={`/author/${author.slug.current}`}>
              <h2>
                <span className="mark">{author.name}</span>
              </h2>
            </Link>
            {author.image && (
              <Img fluid={author.image.asset.fluid} alt={author.name} />
            )}
            {!author.image && (
              <img
                src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNkYAAAAAYAAjCB0C8AAAAASUVORK5CYII="
                alt={author.name}
                width="100%"
              />
            )}
            <p className="description">{author.description}</p>
          </AuthorStyles>
        ))}
      </AuthorGrid>
    </>
  );
}

export const query = graphql`
  query($skip: Int = 0, $pageSize: Int = 2) {
    authors: allSanityAuthor(skip: $skip, limit: $pageSize) {
      totalCount
      nodes {
        name
        id
        slug {
          current
        }
        description
        image {
          asset {
            fluid(maxWidth: 410) {
              ...GatsbySanityImageFluid
            }
          }
        }
      }
    }
  }
`;
