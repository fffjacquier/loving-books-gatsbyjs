import { useContext, useState } from 'react';
import OrderContext from '../components/OrderContext';
import attachNamesAndPrices from './attachNamesAndPrices';
import calculateOrderTotal from './calculateOrderTotal';
import { formatMoney } from './calculatePrice';

export default function useBook({ books, inputs }) {
  // create state to hold the order
  // const [order, setOrder] = useState([]);
  const [order, setOrder] = useContext(OrderContext);
  const [error, setError] = useState();
  const [loading, setLoading] = useState();
  const [message, setMessage] = useState();

  // fn to add things to order
  function addToOrder(orderedBook) {
    setOrder([...order, orderedBook]);
  }

  // fn to remove things to order
  function removeFromOrder(index) {
    setOrder([...order.slice(0, index), ...order.slice(index + 1)]);
  }

  // TODO: send data to serverless function
  async function submitOrder(e) {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setMessage(null);

    // gather data
    const body = {
      order: attachNamesAndPrices(order, books),
      total: formatMoney(calculateOrderTotal(order, books)),
      name: inputs.name,
      email: inputs.email,
      pate: inputs.pate,
    };
    // console.log(body);

    // send this to the serverless function
    const res = await fetch(
      `${process.env.GATSBY_SERVERLESS_BASE}/placeOrder`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(body),
      }
    );
    const text = JSON.parse(await res.text());

    // check if everything worked
    setLoading(false);
    if (res.status >= 400 && res.status < 600) {
      // something went wrong
      setError(text.message);
    } else {
      setMessage('Success! Come on pick your book');
    }
  }

  return {
    order,
    addToOrder,
    removeFromOrder,
    error,
    loading,
    message,
    submitOrder,
  };
}
