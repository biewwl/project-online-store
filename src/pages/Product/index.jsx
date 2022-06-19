import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { connect } from "react-redux";
import { addProduct } from "../../redux/actions/products";
import Header from "../../components/Header";
import priceFormat from "../../helpers/priceFormat";
import { Icon } from "@iconify/react";
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
  const [amount, setAmount] = useState(1);

  useEffect(() => {
    async function getProduct() {
      const url = `https://api.mercadolibre.com/items/${id}`;
      const response = await fetch(url);
      const responseJson = await response.json();
      setProduct(responseJson);
      const itemInCart = cart.find((e) => e.id === product.id);
      if (itemInCart) setAmount(itemInCart.amount);
    }
    getProduct();
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

  const addToCart = () => {
    dispatch(addProduct({ ...product, amount }));
  };

  function onlyNumber(evt) {
    const theEvent = evt || window.event;
    const keyCodes = [
      48, 49, 50, 51, 52, 53, 54, 55, 56, 57, 96, 97, 98, 99, 100, 101, 102,
      103, 104, 105, 8, 37, 39, 46,
    ];
    if (
      keyCodes.some((e) => e === theEvent.keyCode) &&
      !(amount === "" && theEvent.keyCode === 48) &&
      !(amount === "" && theEvent.keyCode === 96)
    )
      theEvent.returnValue = true;
    else {
      theEvent.returnValue = false;
      if (theEvent.preventDefault) theEvent.preventDefault();
    }
  }

  function minusOne() {
    if (Number(amount) > 0) setAmount(Number(amount) - 1);
  }

  function moreOne() {
    setAmount(Number(amount) + 1);
  }

  return (
    <>
      <Header />
      <article className="product">
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
                <span className="product-stock">{`Stock: ${available_quantity}`}</span>
                <span>
                  {shipping.free_shipping ? (
                    <span className="free-shipping">
                      <Icon icon="fa6-solid:truck-fast" />
                      Free Shipping
                    </span>
                  ) : (
                    ""
                  )}
                </span>
                <section className="add-to-cart">
                  <button disabled={amount <= 1} onClick={minusOne}>
                    -
                  </button>
                  <input
                    type="text"
                    name="amount"
                    id="amount"
                    value={amount}
                    onChange={defineAmount}
                    onKeyDown={onlyNumber}
                    className="input-amount"
                  />
                  <input
                    type="number"
                    name="amount"
                    id="amount"
                    value={String(amount)}
                    onChange={defineAmount}
                    onKeyDown={onlyNumber}
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
                    disabled={amount === 0}
                    onClick={addToCart}
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
    </>
  );
}

const mapStateToProps = (state) => ({
  cart: state.products.cart,
});

export default connect(mapStateToProps)(Product);
