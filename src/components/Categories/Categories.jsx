import { useNavigate } from "react-router-dom";
import { connect } from "react-redux";
import { useState } from "react";
import { getProducts } from "../../redux/actions/products";
import { useEffect } from "react";
import { getCategories } from "../../services/api";
import { Icon } from "@iconify/react";
import "./styles/Categories.css";
import "./styles/Categories-mobile.css";

function Header({ dispatch, search: { category, query } }) {
  const navigate = useNavigate();

  const [categories, setCategories] = useState([]);
  const [openCategories, setOpenCategories] = useState(false);

  const clickCategory = (category) => {
    dispatch(getProducts({ category, query }));
    setOpenCategories(false);
    navigate("/");
  };

  const removeCategory = () => {
    dispatch(getProducts({ category: { name: "", id: "" }, query }));
    navigate("/");
  };

  const openCloseCategories = () => {
    setOpenCategories(!openCategories);
  };

  useEffect(() => {
    async function fetchCategories() {
      const results = await getCategories();
      setCategories(results);
    }
    fetchCategories();
  }, []);

  return (
    <aside className="categories">
      {categories.length !== 0 && (
        <>
          <ul className="categories-desktop">
            {categories.map((e) => (
              <li
                key={e.id}
                className={
                  e.id === category.id ? "category-selected" : "category"
                }
              >
                <span onClick={() => clickCategory(e)}>{e.name}</span>
                {e.id === category.id ? (
                  <Icon
                    className="remove-category"
                    onClick={removeCategory}
                    icon="akar-icons:circle-x-fill"
                  />
                ) : (
                  ""
                )}
              </li>
            ))}
          </ul>
          <Icon className="openCloseCategories" icon="carbon:expand-categories" onClick={openCloseCategories} />
          {openCategories && (
            <ul className="categories-mobile">
              {categories.map((e) => (
                <li
                  key={e.id}
                  className={
                    e.id === category.id ? "category-selected" : "category"
                  }
                >
                  <span onClick={() => clickCategory(e)}>{e.name}</span>
                  {e.id === category.id ? (
                    <Icon
                      className="remove-category"
                      onClick={removeCategory}
                      icon="akar-icons:circle-x-fill"
                    />
                  ) : (
                    ""
                  )}
                </li>
              ))}
            </ul>
          )}
        </>
      )}
    </aside>
  );
}

const mapStateToProps = (state) => ({
  search: state.products.search,
});

export default connect(mapStateToProps)(Header);
