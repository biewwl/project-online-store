import lS from "manager-local-storage";

const NAME_KEY_LOCAL_STORAGE = "biewwl-shopping-cart-cart";

const getIndexInTheCart = (id) => {
  const currentCart = lS("g", NAME_KEY_LOCAL_STORAGE) ?? [];
  return currentCart.findIndex((item) => item.id === id);
};

export const addToCart = (item) => {
  const itemInTheCart = getIndexInTheCart(item.id);
  const currentCart = lS("g", NAME_KEY_LOCAL_STORAGE);
  if (item.amount === 0) {
    return removeFromTheCart(item.id);
  }
  if (itemInTheCart >= 0) {
    const newCart = currentCart;
    newCart[itemInTheCart].amount = item.amount;
    return lS("s", NAME_KEY_LOCAL_STORAGE, newCart);
  }
  return lS("s", NAME_KEY_LOCAL_STORAGE, [...currentCart, item]);
};

export const removeFromTheCart = (id) => {
  const currentCart = lS("g", NAME_KEY_LOCAL_STORAGE) ?? [];
  const newCart = currentCart.filter((itemCart) => itemCart.id !== id);
  lS("s", NAME_KEY_LOCAL_STORAGE, newCart);
};
