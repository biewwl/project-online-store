import { useState } from "react";
import Header from "../../components/Header";
import { connect } from "react-redux";
import ProductCard from "../../components/ProductCard";
import cpfFormat from "../../helpers/cpfFormat";
import priceFormat from "../../helpers/priceFormat";
import "./styles/Cart.css";
import "./styles/Cart-mobile.css";

function Cart({ cart }) {
  const getSubtotal = () =>
    cart.map((e) => e.price * e.amount).reduce((prevE, e) => prevE + e);

  const [deliveryData, setDeliveryData] = useState({
    address: "",
    complement: "",
    cpf: "",
  });

  const { address, complement, cpf } = deliveryData;

  const handleChange = ({ target }) => {
    setDeliveryData({
      ...deliveryData,
      [target.name]: target.value,
    });
  };

  return (
    <section className="cart-page">
      <Header />
      <main className="cart">
        <section className="cart-items">
          {cart.map((e, i) => (
            <ProductCard key={i} product={e} isCart />
          ))}
        </section>
      </main>
      {cart.length !== 0 && (
        <aside className="finalize-order">
          <form onSubmit={(e) => e.preventDefault()}>
            <h3>Checkout</h3>
            <input
              type="text"
              name="address"
              id="address"
              value={address}
              onChange={handleChange}
              required
              placeholder="Endereço"
            />
            <input
              type="text"
              name="complement"
              id="complement"
              value={complement}
              onChange={handleChange}
              placeholder="Complemento"
            />
            <input
              type="text"
              name="cpf"
              id="cpf"
              value={cpfFormat(cpf)}
              onChange={handleChange}
              required
              placeholder="CPF"
            />
            <span className="cart-subtotal">
              <span>Subtotal: </span>
              {priceFormat(getSubtotal())}
            </span>
            <button type="submit" className="submit-order">
              Finalizar Pedido
            </button>
          </form>
        </aside>
      )}
    </section>
  );
}

const mapStateToProps = (state) => ({
  cart: state.products.cart,
});

export default connect(mapStateToProps)(Cart);
