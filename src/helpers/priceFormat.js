export default function priceFormat(price) {
  const originalPrice = price.toFixed(2).toString();
  return `R$ ${originalPrice.replace('.', ',')}`;
}
