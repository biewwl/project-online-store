import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { removeProduct } from "../../redux/actions/products";
import priceFormat from "../../helpers/priceFormat";
import { Icon } from "@iconify/react";
import "./styles/ProductCardCart.css";
import "./styles/ProductCardCart-mobile.css";

function ProductCardCart({ product, dispatch }) {
  const {
    id,
    title,
    price,
    thumbnail,
    shipping: { free_shipping },
    amount,
  } = product;

  function removeFromCart() {
    dispatch(removeProduct(id));
  }

  return (
    <section className="product-card">
      <img src={thumbnail} alt={title} />
      <Link to={`/product-${id}`} className="product-infos">
        <h3>{title}</h3>
        <span className="product-price">{priceFormat(price)}</span>
        <span className="product-amount">{`Amount: ${amount}`}</span>
        <span>
          {free_shipping ? (
            <span className="free-shipping">
              <Icon icon="fa6-solid:truck-fast" />
              Free Shipping
            </span>
          ) : (
            ""
          )}
        </span>
      </Link>
      <button className="remove-item" onClick={removeFromCart}>
      <Icon icon="bi:x" />
      </button>
    </section>
  );
}

export default connect()(ProductCardCart);
