import "./index.css";
import slideimg1 from "../../assets/slide-img-1.webp";
import slideimg2 from "../../assets/slide-img-2.webp";
import { Link, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";

function Home() {
  const [products, setProducts] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get("https://strapi-store-server.onrender.com/api/products")
      .then((response) => {
        if (response.status === 200) {
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
      <section className="home">
        <div className="container home__container">
          <div className="hero__info">
            <h1>We are changing the way people shop</h1>
            <p>
              Lorem ipsum, dolor sit amet consectetur adipisicing elit. Tempore
              repellat explicabo enim soluta temporibus asperiores aut obcaecati
              perferendis porro nobis.
            </p>
            <Link to="/products">OUR PRODUCTS</Link>
          </div>
          <div className="slide-images">
            <img src={slideimg1} alt="" width="320" height="416" />
            <img src={slideimg2} alt="" width="300" height="416" />
          </div>
        </div>
      </section>
      <div className="container">
        <div className="card-wrapper card-wraps">
          {products.slice(0, 3).map((product, index) => {
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

export default Home;
