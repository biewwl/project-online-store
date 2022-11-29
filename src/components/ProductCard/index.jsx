import { Link } from "react-router-dom";
import priceFormat from "../../helpers/priceFormat";
import { Icon } from "@iconify/react";
import { connect } from "react-redux";
import { updateCart } from "../../redux/actions/products";
import { removeFromTheCart } from "../../helpers/cartManager";
import "./styles/ProductCard.css";
// import "./styles/ProductCard-mobile.css";

function ProductCard({ product, isCart = false, dispatch }) {
  const { id, title, price, thumbnail, amount } = product;

  function removeFromCart() {
    removeFromTheCart(id);
    dispatch(updateCart());
  }

  return (
    <section className="product-card">
      {isCart && (
        <div className="remove-action">
          <button className="remove-from-the-cart" onClick={removeFromCart}>
            <Icon icon="ph:x-bold" />
          </button>
        </div>
      )}
      <img src={thumbnail} alt={title} />
      <Link to={`/product-${id}`} className="product-infos">
        <h3>{title}</h3>
        <span className="product-price">{priceFormat(price)}</span>
        {isCart && (
          <span className="item-quantity">
            <span>Quantity: </span>
            {amount}
          </span>
        )}
      </Link>
    </section>
  );
}

export default connect()(ProductCard);
