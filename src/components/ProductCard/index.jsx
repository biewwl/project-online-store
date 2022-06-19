import { Link } from "react-router-dom";
import { Icon } from "@iconify/react";
import priceFormat from "../../helpers/priceFormat";
import "./styles/ProductCard.css";
import "./styles/ProductCard-mobile.css";

function ProductCard({ product }) {
  const {
    id,
    title,
    price,
    thumbnail,
    available_quantity,
    shipping: { free_shipping },
  } = product;
  return (
    <section className="product-card">
      <img src={thumbnail} alt={title} />
      <Link to={`/product-${id}`} className="product-infos">
        <h3>{title}</h3>
        <span className="product-price">{priceFormat(price)}</span>
        <span className="product-stock">{`Stock: ${available_quantity}`}</span>
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
    </section>
  );
}

export default ProductCard;
