import React from 'react';
import Img from 'gatsby-image';
import MenuItemStyles from '../styles/MenuItemStyles';
import calculatePrice, { formatMoney } from '../utils/calculatePrice';

export default function BookOrder({ order, books, removeFromOrder }) {
  return (
    <>
      {order.map((singleOrder, index) => {
        const book = books.find((b) => b.id === singleOrder.id);
        return (
          <MenuItemStyles key={`${singleOrder.id}-${index}`}>
            <Img fluid={book.image.asset.fluid} alt={book.name} />
            <h2>{book.name}</h2>
            <p>
              {formatMoney(calculatePrice(book.price, singleOrder.format))}
              <button
                type="button"
                className="remove"
                title={`Remove ${singleOrder.format} ${book.name}`}
                onClick={() => removeFromOrder(index)}
              >
                &times;
              </button>
            </p>
          </MenuItemStyles>
        );
      })}
    </>
  );
}
