import lS from "../../helpers/localStorage";

const cartLS = lS("g", "biewwl-shopping-cart-cart");

const initialState = {
  search: {
    category: { id: "", name: "" },
    query: "",
  },
  products: [],
  cart: cartLS ? cartLS : [],
};

const products = (state = initialState, action) => {
  switch (action.type) {
    case "GET_PRODUCTS":
      return {
        ...state,
        search: action.payload.search,
        products: action.payload.products,
      };
    case "ADD_PRODUCT":
      const newCart = [...state.cart];
      const existentItem = newCart.find((e) => e.id === action.payload.id);
      if (existentItem) {
        existentItem.amount = action.payload.amount;
        lS("s", "biewwl-shopping-cart-cart", newCart);
        return { ...state, cart: newCart };
      } else {
        lS("s", "biewwl-shopping-cart-cart", [...state.cart, action.payload]);
        return {
          ...state,
          cart: [...state.cart, action.payload],
        };
      }
    case "REMOVE_PRODUCT":
      lS(
        "s",
        "biewwl-shopping-cart-cart",
        state.cart.filter((e) => e.id !== action.payload)
      );
      return {
        ...state,
        cart: state.cart.filter((e) => e.id !== action.payload),
      };
    default:
      return state;
  }
};

export default products;
