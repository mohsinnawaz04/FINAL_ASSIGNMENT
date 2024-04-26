import { useEffect, useState } from "react";
import { UseProducts } from "../lib/context/productsContext";
import { Link } from "react-router-dom";

const ProductCard = ({ isHome = false }) => {
  const [products, setProducts] = useState([]);
  const productsState = UseProducts();

  const getData = async () => {
    try {
      const data = await productsState.current;

      if (data.length > 0) setProducts(data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    console.log("useEffect in motion");
    getData();
  }, [productsState]); // Empty dependency array ensures getData is only called once

  return (
    <>
      {products?.map((products, idx) => (
        <div key={idx}>
          {isHome ? (
            <Link to={`products/${products.id}`}>
              <div
                className="flex flex-col border px-5 py-3 bg-gray-200"
                id={products.id}
              >
                <div className="max-w-[10rem] min-w-[10rem] overflow-hidden border-[5px]">
                  <img
                    src={products.ProductImg}
                    alt={products.productName}
                    className="object-cover"
                  />
                </div>
                <ol>
                  <li>{products.ProductName}</li>
                  <li>{products.ProductPrice}</li>
                </ol>
                <br />
              </div>
            </Link>
          ) : (
            <Link to={`${products.id}`} key={idx}>
              <div
                className="flex flex-col border px-5 py-3 bg-gray-200"
                id={products.id}
              >
                <div className="max-w-[10rem] min-w-[10rem] overflow-hidden border-[5px]">
                  <img
                    src={products.ProductImg}
                    alt={products.productName}
                    className="object-cover"
                  />
                </div>
                <ol>
                  <li>{products.ProductName}</li>
                  <li>{products.ProductPrice}</li>
                </ol>
                <br />
              </div>
            </Link>
          )}
        </div>
      ))}
    </>
  );
};

export default ProductCard;
