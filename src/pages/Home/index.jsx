import Header from "../../components/Header";
import { connect } from "react-redux";
import ProductCard from "../../components/ProductCard";
import Categories from "../../components/Categories/Categories";
import './styles/Home.css';
import './styles/Home-mobile.css';

function Home({ products }) {

  return (
    <>
      <Header />
      <main className="home">
        <Categories />
        {products.length !== 0 && (
          <section className="products">
            {products.map((e, i) => (
              <ProductCard key={i} product={e} />
            ))}
          </section>
        )}
      </main>
    </>
  );
}

const mapStateToProps = (state) => ({
  products: state.products.products,
});

export default connect(mapStateToProps)(Home);
