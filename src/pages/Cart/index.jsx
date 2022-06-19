import Header from "../../components/Header";
import { connect } from "react-redux";
import ProductCardCart from "../../components/ProductCardCart";
import priceFormat from "../../helpers/priceFormat";
import "./styles/Cart.css";
import "./styles/Cart-mobile.css";

function Cart({ cart }) {
  const getSubtotal = () =>
    cart.map((e) => e.price * e.amount).reduce((prevE, e) => prevE + e);

  return (
    <>
      <Header />
      <main className="cart">
        <h1>Cart</h1>
        <section className="cart-items">
          {cart.map((e, i) => (
            <ProductCardCart key={i} product={e} />
          ))}
        </section>
      </main>
      {cart.length !== 0 && (
        <footer>
          <section className="subtotal">
            <span>Subtotal:</span>
            <span>{priceFormat(getSubtotal())}</span>
          </section>
          <button>Pay</button>
        </footer>
      )}
    </>
  );
}

const mapStateToProps = (state) => ({
  cart: state.products.cart,
});

export default connect(mapStateToProps)(Cart);
