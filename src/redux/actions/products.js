import { getProductsFromCategoryAndQuery } from "../../services/api";

const getProducts = ({ category: { name, id }, query }) => {
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

const addProduct = (payload) => ({
  type: "ADD_PRODUCT",
  payload,
});

const removeProduct = (payload) => ({
  type: "REMOVE_PRODUCT",
  payload,
});

export { getProducts, addProduct, removeProduct };
