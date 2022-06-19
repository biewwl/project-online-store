import { applyMiddleware, legacy_createStore } from "redux";
import reducer from "../reducer";
import { composeWithDevTools } from "redux-devtools-extension";
import thunk from "redux-thunk";

const store = legacy_createStore(
  reducer,
  composeWithDevTools(applyMiddleware(thunk))
);

export default store;
