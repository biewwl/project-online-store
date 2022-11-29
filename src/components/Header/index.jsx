import { Link, useNavigate } from "react-router-dom";
import { connect } from "react-redux";
import { useState } from "react";
import { getProducts } from "../../redux/actions/products";
import { Icon } from "@iconify/react";
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
  };

  return (
    <header>
      <section className="header-left-content">
        <Link to="/">biewwl</Link>
        <div className="detail-logo"></div>
      </section>
      <section className="header-right-content">
        <form className="search-header" onSubmit={sendQuery}>
          <label htmlFor="query">
            <input
              type="text"
              id="query"
              placeholder="Procure o que quiser..."
              value={query}
              onChange={handleQuery}
            />
          </label>
          <button type="submit" className="send-query">
            <Icon icon="ic:sharp-search" />
          </button>
          {query !== "" && (
            <button className="clear-query" onClick={removeQuery}>
              <Icon icon="bi:x" className="clear-query" />
            </button>
          )}
        </form>
        <Link to="/cart" className="cart-header">
          <Icon icon="clarity:shopping-cart-line" />
          <span className="cart-amount">
            {cart.length < 100 ? cart.length : "99+"}
          </span>
        </Link>
      </section>
    </header>
  );
}

const mapStateToProps = (state) => ({
  search: state.products.search,
  cart: state.products.cart,
});

export default connect(mapStateToProps)(Header);
