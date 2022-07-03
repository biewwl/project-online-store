import Header from "../../components/Header";
import { connect } from "react-redux";
import ProductCard from "../../components/ProductCard";
import Categories from "../../components/Categories/Categories";
import "./styles/Home.css";
import "./styles/Home-mobile.css";
import Loading from "../../components/Loading";

function Home({ products, loading }) {
  return (
    <>
      <Header />
      <main className="home">
        <Categories />
        {loading
          ? <Loading />
          : products.length !== 0 && (
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
  loading: state.loading,
});

export default connect(mapStateToProps)(Home);
