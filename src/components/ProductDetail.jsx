import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getProductByID } from "../lib/productService";

const ProductDetail = () => {
  const [productDetail, setProductDetail] = useState([]);
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const getDetail = async () => {
      await getProductByID(id, productDetail, setProductDetail);
    };
    getDetail();
  }, []);

  return (
    <div>
      {productDetail.length > 0
        ? productDetail.map((prod) => (
            <div key={prod.id}>
              <img
                src={prod.ProductImg}
                alt={prod.productName}
                width="150px"
                loading="lazy"
              />
              <h1>{prod.ProductName}</h1>
              <h1>{prod.ProductPrice}</h1>
            </div>
          ))
        : ""}
      <button
        className="px-3 py-2 mt-5  bg-zinc-900 text-white"
        onClick={() => navigate(`/products/edit-product/${id}`)}
      >
        Edit Product
      </button>
    </div>
  );
};

export default ProductDetail;
