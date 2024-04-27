import React, { useEffect, useState } from "react";
import ProductCard from "../components/ProductCard";
import { Link } from "react-router-dom";
import { UseProducts } from "@/lib/context/productsContext";

const Products = ({ isHome = false }) => {
  const [isLoading, setIsLoading] = useState(true);
  const productsState = UseProducts;

  const getData = async () => {
    try {
      const data = await productsState.current;
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <>
      <div className="flex flex-wrap justify-center lg:justify-start lg:items-center lg:px-28 pt-5 lg:pt-10">
        <ProductCard isHome={isHome} />
      </div>

      {isHome && !isLoading && (
        <div className="w-full text-center">
          <Link to="/products">
            <button className="my-5 w-[90%] lg:w-fit lg:px-48 py-2 bg-zinc-900 hover:bg-zinc-700 text-white rounded">
              View All Products
            </button>
          </Link>
        </div>
      )}
    </>
  );
};

export default Products;
