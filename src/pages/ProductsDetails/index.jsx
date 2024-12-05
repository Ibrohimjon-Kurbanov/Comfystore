import "./index.css";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
function ProductDetails() {
  const [product, setProduct] = useState({});
  const { id } = useParams();
  useEffect(() => {
    axios
      .get(`https://strapi-store-server.onrender.com/api/products/${id}`)
      .then((response) => {
        if (response.status == 200) {
          setProduct(response.data.data);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);
  return (
    <div>
      <div className="container">
        <div className="product-details">
          {product.id && (
            <div className="product-card">
              <div className="product-image">
                <div className="links">
                  <Link to="/">Home</Link>
                  <Link to="/products">Products</Link>
                </div>
                <img
                  src={product.attributes.image}
                  alt=""
                  width="511"
                  height="384"
                />
              </div>
              <div className="products-card-info">
                <h2>{product.attributes.title}</h2>
                <h3>{product.attributes.company}</h3>
                <span className="products-price">
                  ${product.attributes.price}
                </span>
                <p>{product.attributes.description}</p>
                <h4>Colors</h4>
                <div className="colors">
                  {product.attributes &&
                    product.attributes.colors.map((color, index) => (
                      <span
                        key={index}
                        style={{
                          backgroundColor: color,
                          display: "inline-block",
                          width: "24px",
                          height: "24px",
                          borderRadius: "50%",
                          marginRight: "8px",
                          cursor: "pointer",
                          marginBottom: "10px",
                        }}
                      ></span>
                    ))}
                </div>
                <h4>Amount</h4>
                <select name="" id="">
                  <option value="1">1</option>
                  <option value="2">2</option>
                  <option value="3">3</option>
                  <option value="4">4</option>
                  <option value="5">5</option>
                  <option value="6">6</option>
                  <option value="7">7</option>
                  <option value="8">8</option>
                  <option value="9">9</option>
                  <option value="10">10</option>
                </select>
                <button className="products-add-btn">ADD TO BAG</button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
export default ProductDetails;
