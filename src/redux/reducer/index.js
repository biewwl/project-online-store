import { combineReducers } from "redux";
import products from './products';
import loading from "./loading";

const reducer = combineReducers({
  products,
  loading,
});

export default reducer;
