import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { connect } from "react-redux";
import { updateCart } from "../../redux/actions/products";
import { addToCart } from "../../helpers/cartManager";
import Header from "../../components/Header";
import priceFormat from "../../helpers/priceFormat";
import { Icon } from "@iconify/react";
import { getProductById } from "../../services/api";
import "./styles/Product.css";
import "./styles/Product-mobile.css";

function Product({ dispatch, cart }) {
  const { id } = useParams();

  const [product, setProduct] = useState([]);
  const {
    title,
    pictures,
    price,
    shipping,
    attributes,
    condition,
    available_quantity,
  } = product;

  const [pictureIndex, setPictureIndex] = useState(0);
  const [amount, setAmount] = useState(0);

  useEffect(() => {
    const setProductData = async () => {
      const productData = await getProductById(id);
      setProduct(productData);
      const itemInCart = cart.find((e) => e.id === product.id);
      if (itemInCart) setAmount(itemInCart.amount);
    }
    setProductData();
  }, [id, cart, product.id]);

  const nextImage = () => {
    if (pictureIndex < pictures.length - 1) setPictureIndex(pictureIndex + 1);
    else {
      setPictureIndex(0);
    }
  };

  const prevImage = () => {
    if (pictureIndex > 0) setPictureIndex(pictureIndex - 1);
    else {
      setPictureIndex(pictures.length - 1);
    }
  };

  const selectImage = (index) => {
    setPictureIndex(index);
  };

  const defineAmount = ({ target }) => {
    if (Number(target.value) > available_quantity) {
      target.value = available_quantity;
      setAmount(available_quantity);
    } else {
      setAmount(Number(target.value));
    }
  };

  const handleAddToCart = () => {
    addToCart({ ...product, amount });
    dispatch(updateCart());
  };

  const onKeyUp = ({ target }) => {
    const { value } = target;
    const firstNumber = value[0];
    if (firstNumber === "0") {
      const currentValue = value.slice(1, value.length);
      target.value = Number(currentValue);
    }
  };

  function minusOne() {
    if (Number(amount) > 0) setAmount(Number(amount) - 1);
  }

  function moreOne() {
    setAmount(Number(amount) + 1);
  }

  return (
    <article className="product">
      <Header />
      {product.length !== 0 && (
        <>
          <section className="product-info">
            <section className="product-images">
              <button onClick={prevImage}>
                <Icon icon="ooui:previous-ltr" />
              </button>
              <img
                src={pictures[pictureIndex].url}
                alt={`img-${pictureIndex}`}
                className="product-picture"
              />
              <button onClick={nextImage}>
                <Icon icon="ooui:next-ltr" />
              </button>
              <section className="product-image-select">
                {pictures.map((e, i) => (
                  <img
                    key={i}
                    onClick={() => selectImage(i)}
                    src={e.url}
                    alt={e.id}
                    className={
                      pictureIndex === i
                        ? "preview-picture-selected"
                        : "preview-picture"
                    }
                  />
                ))}
              </section>
            </section>
            <section className="product-detail">
              <h2>{title}</h2>
              <span className="product-price">{priceFormat(price)}</span>
              <span className="product-stock">{`${available_quantity} restantes`}</span>
              <span>
                {shipping.free_shipping ? (
                  <span className="free-shipping">
                    <Icon icon="fa6-solid:truck-fast" />
                    Frete Grátis
                  </span>
                ) : (
                  ""
                )}
              </span>
              <section className="add-to-cart">
                <button disabled={amount === 0} onClick={minusOne}>
                  -
                </button>
                <input
                  type="number"
                  name="amount"
                  id="amount"
                  value={amount}
                  onChange={defineAmount}
                  onKeyUp={onKeyUp}
                  className="input-amount"
                />
                <input
                  type="number"
                  name="amount"
                  id="amount"
                  value={String(amount)}
                  onChange={defineAmount}
                  onKeyUp={onKeyUp}
                  className="input-amount-mobile"
                />
                <button
                  disabled={amount === available_quantity}
                  onClick={moreOne}
                >
                  +
                </button>
                <button
                  className="add-to-cart-button"
                  onClick={handleAddToCart}
                >
                  Add to Cart
                  <Icon icon="bi:cart-plus" />
                </button>
              </section>
            </section>
          </section>
          <section className="product-attributes">
            <h4>Attributes</h4>
            <ul>
              <li>
                <span>Condition</span>:<span>{condition}</span>
              </li>
              {attributes.map((e, i) => (
                <li key={i}>
                  <span>{`${e.name}:`}</span>
                  <span>{e.value_name}</span>
                </li>
              ))}
            </ul>
          </section>
        </>
      )}
    </article>
  );
}

const mapStateToProps = (state) => ({
  cart: state.products.cart,
});

export default connect(mapStateToProps)(Product);
