import { useEffect, useState } from 'react';

const details = `
  name
  _id
  slug {
    current
  }
  image {
    asset {
      url
      metadata {
        lqip
      }
    }
  }
`;
export default function useLatestData() {
  // hot
  const [hot, setHot] = useState();

  // currently
  const [author, setAuthor] = useState();

  // use side effect to fetch data from sanity grapqhql zendpooint
  useEffect(() => {
    // when component loads fetch data, or if data changes
    fetch(process.env.GATSBY_GRAPHQL_ENDOINT, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      /* _id and not id because we request sanity directly */
      body: JSON.stringify({
        query: `query {
          StoreSettings(id: "downtown") {
            name
            author {
              ${details}
            }
            hot {
              ${details}
            }
          }
        }`,
      }),
    })
      .then((resp) => resp.json())
      .then((res) => {
        // check errors

        // set data to state
        setHot(res.data.StoreSettings.hot);
        setAuthor(res.data.StoreSettings.author);
      })
      .catch((err) => console.error('Error', err));
  }, []);
  return {
    hot,
    author,
  };
}
