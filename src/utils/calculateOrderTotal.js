import calculatePrice from './calculatePrice';

export default function calculateOrderTotal(order, books) {
  // loop over each item in the order
  const total = order.reduce((runningTotal, singleOrder) => {
    const book = books.find((b) => b.id === singleOrder.id);
    return runningTotal + calculatePrice(book.price, singleOrder.format);
  }, 0);
  return total;
}
