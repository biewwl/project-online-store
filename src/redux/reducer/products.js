import lS from "manager-local-storage";

const cartLS = () => lS("g", "biewwl-shopping-cart-cart");

const initialState = {
  search: {
    category: { id: "", name: "" },
    query: "",
  },
  products: [],
  cart: cartLS() ?? [],
};

const products = (state = initialState, action) => {
  switch (action.type) {
    case "GET_PRODUCTS":
      return {
        ...state,
        search: action.payload.search,
        products: action.payload.products,
      };
    case "UPDATE_CART":
      return {
        ...state,
        cart: cartLS(),
      };
    default:
      return state;
  }
};

export default products;
