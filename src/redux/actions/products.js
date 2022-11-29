import { getProductsFromCategoryAndQuery } from "../../services/api";

export const getProducts = ({ category: { name, id }, query }) => {
  return async (dispatch) => {
    dispatch({
      type: "GET_PRODUCTS",
      payload: {
        search: { category: { name, id }, query },
      },
    });
    dispatch({ type: "LOADING", payload: true });
    const responseObj = await getProductsFromCategoryAndQuery(id, query);
    dispatch({ type: "LOADING", payload: false });
    const results = responseObj.results;
    dispatch({
      type: "GET_PRODUCTS",
      payload: {
        search: { category: { name, id }, query },
        products: results,
      },
    });
  };
};

export const updateCart = () => ({
  type: "UPDATE_CART",
});

