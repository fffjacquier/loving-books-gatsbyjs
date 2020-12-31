import path from 'path';
import fetch from 'isomorphic-fetch';

async function turnBooksIntoPages({ graphql, actions }) {
  // get a template for thhe page
  const bookTemplate = path.resolve('./src/templates/Book.js');

  // query all books
  const { data } = await graphql(`
    query {
      books: allSanityBook {
        nodes {
          name
          slug {
            current
          }
        }
      }
    }
  `);
  // loop over and create page for the book
  data.books.nodes.forEach((book) => {
    // console.log('creating page for ', book.name);
    actions.createPage({
      path: `/book/${book.slug.current}`,
      component: bookTemplate,
      context: {
        slug: book.slug.current,
      },
    });
  });
}

async function turnTagsIntoPages({ graphql, actions }) {
  const tagTemplate = path.resolve('./src/pages/books.js');

  // query all tags
  const { data } = await graphql(`
    query {
      tags: allSanityTag {
        nodes {
          name
          id
        }
      }
    }
  `);
  data.tags.nodes.forEach((tag) => {
    actions.createPage({
      path: `/tag/${tag.name}`,
      component: tagTemplate,
      context: {
        tag: tag.name,
        // tagRegex: `/${tag.name}/i `,
      },
    });
  });
}

async function fetchBeersAndTurnIntoNodes({
  actions,
  createNodeId,
  createContentDigest,
}) {
  // fetch list of beers
  const res = await fetch('https://sampleapis.com/beers/api/ale');
  const beers = await res.json();
  // loop over
  for (const beer of beers) {
    // create a node for each beer
    const nodeMeta = {
      id: createNodeId(`beer-${beer.name}`),
      parent: null,
      children: [],
      internal: {
        type: 'Beer',
        mediaType: 'application/json', // other plugins can find the type of media if they need
        contentDigest: createContentDigest(beer),
      },
    };
    // create node for each movie
    actions.createNode({
      ...beer,
      ...nodeMeta,
    });
  }
}

async function turnAuthorsIntoPages({ graphql, actions }) {
  // query authors
  const { data } = await graphql(`
    query {
      authors: allSanityAuthor {
        totalCount
        nodes {
          name
          id
          slug {
            current
          }
        }
      }
    }
  `);
  // turn each into their own page
  data.authors.nodes.forEach((author) => {
    actions.createPage({
      component: path.resolve('./src/templates/Author.js'),
      path: `/author/${author.slug.current}`,
      context: {
        name: author.name,
        slug: author.slug.current,
      },
    });
  });

  // how any pages there are based on how many authros and how many per page
  const pageSize = parseInt(process.env.GATSBY_PAGE_SIZE);
  const pageCount = Math.ceil(data.authors.nodes.length / pageSize);

  // loop over from 1 to N pages
  Array.from({ length: pageCount }).forEach((_, i) => {
    actions.createPage({
      path: `/authors/${i + 1}`,
      component: path.resolve('./src/pages/authors.js'),
      context: {
        skip: i * pageSize, // on first page, we skip 0, on page 2, we skip 4
        currentPage: i + 1,
        pageSize,
      },
    });
  });
}

// sourcing nodes: putting data in your gatsby as a node (graphql thing)
export async function sourceNodes(params) {
  // fetch a list of movies and source them into gatsby
  await Promise.all([fetchBeersAndTurnIntoNodes(params)]);
}

export async function createPages(params) {
  // create pages dynamically: books; tags; authors
  await Promise.all([
    turnBooksIntoPages(params),
    turnTagsIntoPages(params),
    turnAuthorsIntoPages(params),
  ]);
}

/* exports.onCreateWebpackConfig = ({ stage, actions }) => {
  if (stage.startsWith('develop')) {
    // better to use actions.setWebpackConfig because it automatically merges with the default config
    actions.setWebpackConfig({
      resolve: {
        alias: {
          'react-dom': '@hot-loader/react-dom',
        },
      },
    });
  }
}; */
