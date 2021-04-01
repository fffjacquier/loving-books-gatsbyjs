import calculatePrice, { formatMoney } from './calculatePrice';

export default function attachNamesAndPrices(order, books) {
  return order.map((item) => {
    const book = books.find((b) => b.id === item.id);
    return {
      ...item,
      name: book.name,
      thumbnail: book.image.asset.fluid.src || '',
      price: formatMoney(calculatePrice(book.price, item.format)),
    };
  });
}
