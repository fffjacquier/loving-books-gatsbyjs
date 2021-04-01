import { graphql } from 'gatsby';
import React from 'react';
import Img from 'gatsby-image';
import SEO from '../components/SEO';
import useForm from '../utils/useForm';
import useBook from '../utils/useBook';
import calculatePrice, { formatMoney } from '../utils/calculatePrice';
import OrderStyles from '../styles/OrderStyles';
import MenuItemStyles from '../styles/MenuItemStyles';
import BookOrder from '../components/BookOrder';
import calculateOrderTotal from '../utils/calculateOrderTotal';

export default function OrderPage({ data }) {
  const books = data.books.nodes;
  const { values, updateValue } = useForm({
    name: '',
    email: '',
    pate: '',
  });
  const {
    order,
    addToOrder,
    removeFromOrder,
    error,
    loading,
    message,
    submitOrder,
  } = useBook({
    books,
    inputs: values,
  });

  if (message) {
    return <p>{message}</p>;
  }

  return (
    <>
      <SEO title="Order a book" />
      <OrderStyles onSubmit={submitOrder}>
        <fieldset disabled={loading}>
          <legend>Your Info</legend>
          <label htmlFor="name">
            Name
            <input
              type="text"
              name="name"
              id="name"
              value={values.name}
              onChange={updateValue}
            />
          </label>

          <label htmlFor="email">
            Email
            <input
              type="email"
              name="email"
              id="email"
              value={values.email}
              onChange={updateValue}
            />
          </label>

          <label htmlFor="pate" className="pate">
            Pat&eacute;
            <input
              type="pate"
              name="pate"
              id="pate"
              value={values.pate}
              onChange={updateValue}
            />
          </label>
        </fieldset>
        <fieldset className="booksList" disabled={loading}>
          <div>Books List:</div>
          {books.map((book) => (
            <MenuItemStyles key={book.id}>
              <Img
                alt={book.name}
                fluid={book.image.asset.fluid}
                width="50"
                height="50"
              />
              <div>
                <h2>{book.name}</h2>
              </div>
              <div>
                {['Poche', 'Broché'].map((format) => (
                  <button
                    key={format}
                    type="button"
                    onClick={() =>
                      addToOrder({
                        id: book.id,
                        format,
                      })
                    }
                  >
                    {format} {formatMoney(calculatePrice(book.price, format))}
                  </button>
                ))}
              </div>
            </MenuItemStyles>
          ))}
        </fieldset>
        <fieldset className="order" disabled={loading}>
          <legend>Order</legend>
          <BookOrder
            order={order}
            removeFromOrder={removeFromOrder}
            books={books}
          />
        </fieldset>
        <fieldset disabled={loading}>
          <h3>
            Your Total is {formatMoney(calculateOrderTotal(order, books))}
          </h3>
          <div>{error ? <p>Error: {error}</p> : ''}</div>
          <button type="submit" disabled={loading}>
            {loading ? 'Placing Order...' : 'Order Now'}
          </button>
        </fieldset>
      </OrderStyles>
    </>
  );
}

export const query = graphql`
  query {
    books: allSanityBook {
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
            fluid(maxWidth: 100) {
              ...GatsbySanityImageFluid
            }
          }
        }
      }
    }
  }
`;
