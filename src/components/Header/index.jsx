import { Link, useNavigate } from "react-router-dom";
import { connect } from "react-redux";
import { useState } from "react";
import { getProducts } from "../../redux/actions/products";
import { Icon } from "@iconify/react";
import logo from "./images/logo.png";
import "./styles/Header.css";
import "./styles/Header-mobile.css";

function Header({ dispatch, search: { category, query: globalQuery }, cart }) {
  const navigate = useNavigate();

  const [query, setQuery] = useState(globalQuery);

  const handleQuery = ({ target }) => {
    setQuery(target.value);
  };

  const sendQuery = () => {
    dispatch(getProducts({ category, query }));
    navigate("/");
  };

  const removeQuery = () => {
    dispatch(getProducts({ category, query: "" }));
    setQuery("");
    navigate("/");
  };

  return (
    <header>
      <Link to="/" className="logo-header">
        <img src={logo} alt="logo" />
        <span>Online Store</span>
      </Link>
      <section className="search-header">
        <label htmlFor="query">
          <input type="text" id="query" placeholder="Find anything..." value={query} onChange={handleQuery} />
        </label>
        <button onClick={sendQuery} className="send-query">
          <Icon icon="ei:search" />
        </button>
        {query !== "" && (
          <button className="clear-query" onClick={removeQuery}>
            <Icon icon="bi:x" className="clear-query" />
          </button>
        )}
      </section>
      <Link to="/cart" className="cart-header">
        <Icon icon="clarity:shopping-cart-line" />
        <span className="cart-amount">
          {cart.length < 100 ? cart.length : "99+"}
        </span>
      </Link>
    </header>
  );
}

const mapStateToProps = (state) => ({
  search: state.products.search,
  cart: state.products.cart,
});

export default connect(mapStateToProps)(Header);
