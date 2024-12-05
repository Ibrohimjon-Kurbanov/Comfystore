import axios from "axios";
import "./index.css";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
function Products() {
  const [products, setProducts] = useState([]);
  const navigate = useNavigate();
  useEffect(() => {
    axios
      .get("https://strapi-store-server.onrender.com/api/products")
      .then((response) => {
        if (response.status == 200) {
          console.log(response.data.data);
          setProducts(response.data.data);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);
  const handleRedirect = (id) => {
    navigate(`/products/${id}`);
  };
  return (
    <>
      <section className="filter">
        <div className="filter-container container">
          <form className="filter-form">
            <div className="form-box">
              <label htmlFor="search-input">Search Product</label>
              <input type="search" id="search-input" />
            </div>
            <div className="form-box">
              <label htmlFor="category">Select category</label>
              <select name="" id="category">
                <option value="all">all</option>
                <option value="Tables">Tables</option>
                <option value="Chairs">Chairs</option>
                <option value="Kids">Kids</option>
                <option value="Sofas">Sofas</option>
                <option value="Beds">Beds</option>
              </select>
            </div>
            <div className="form-box">
              <label htmlFor="company">Select Company</label>
              <select name="" id="company">
                <option value="all">all</option>
                <option value="Modenza">Modenza</option>
                <option value="Luxora">Luxora</option>
                <option value="Artifex">Artifex</option>
                <option value="Comfora">Comfora</option>
                <option value="Homestead">Home</option>
              </select>
            </div>
            <div className="form-box">
              <label htmlFor="sort">Sort by</label>
              <select name="" id="sort">
                <option value="a-z">a-z</option>
                <option value="z-a">z-a</option>
                <option value="high">high</option>
                <option value="low">low</option>
              </select>
            </div>
            <div className="form-box">
              <div className="price-wrap">
                <label htmlFor="sort">Select Price</label>
                <span>$1,000.00</span>
              </div>
              <input
                type="range"
                id="price"
                min="0"
                max="1000"
                value="1000"
                step="10"
              ></input>
              <div className="price-wrapp">
                <span>0</span>
                <span>Max: $1,000.00</span>
              </div>
            </div>
            <div className="form-box form-box-2">
              <span htmlFor="check">Free Shipping</span>
              <input type="checkbox" id="check" />
            </div>
            <div className="form-box">
              <button>SEARCH</button>
            </div>
            <div className="form-box">
              <a href="#">RESET</a>
            </div>
          </form>
        </div>
      </section>
      <div className="container">
        <div className="card-wrapper">
          {products.length > 0 &&
            products.map((product, index) => {
              return (
                <div
                  className="card"
                  key={index}
                  onClick={() => {
                    handleRedirect(product.id);
                  }}
                >
                  <div className="card-image">
                    <img
                      className="card-pic"
                      src={product.attributes.image}
                      alt=""
                    />
                  </div>
                  <div className="card-info">
                    <h3>{product.attributes.title}</h3>
                    <p>${product.attributes.price}</p>
                  </div>
                </div>
              );
            })}
        </div>
      </div>
    </>
  );
}
export default Products;
