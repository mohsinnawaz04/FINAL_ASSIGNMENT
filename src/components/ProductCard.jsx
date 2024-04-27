import { useEffect, useState } from "react";
import { UseProducts } from "../lib/context/productsContext";
import { Link } from "react-router-dom";

const ProductCard = ({ isHome = false }) => {
  const [products, setProducts] = useState([]);
  const productsState = UseProducts();

  const getData = async () => {
    try {
      const data = await productsState.current;
      setProducts(data);
      sliceProducts();
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const sliceProducts = () => {
    if (isHome) setProducts((prevProducts) => prevProducts.slice(0, 6));
    console.log(products);
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
                    src={products.imageUrl}
                    alt={products.name}
                    className="object-cover"
                  />
                </div>
                <ol>
                  <li>{products.name}</li>
                  <li>{products.price}</li>
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
                    src={products.imageUrl}
                    alt={products.productName}
                    className="object-cover"
                  />
                </div>
                <ol>
                  <li>{products.name}</li>
                  <li>{products.price}</li>
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
