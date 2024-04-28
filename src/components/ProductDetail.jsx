import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getProductByID } from "../lib/productService";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

import EditFormComponent from "./EditProductForm";

const ProductDetail = () => {
  const [productDetail, setProductDetail] = useState([]);
  const [isOpen, setIsOpen] = useState(false);

  const { id } = useParams();

  const openDialog = () => {
    console.log("opened");
    setIsOpen(true);
  };

  const closeDialog = () => {
    setIsOpen(false);
    console.log("dialog has been closed");
  };

  useEffect(() => {
    const getDetail = async () => {
      await getProductByID(id, productDetail, setProductDetail);
    };
    getDetail();
    console.log("use effect in motion at product detail page");
  }, []);

  return (
    <>
      {/* <div className="border-4 w-fit p-5 px-10 m-5">
        {productDetail.map((prod) => (
          <div key={prod.id}>
            <img
              src={prod.imageUrl}
              alt={prod.name}
              width="150px"
              loading="lazy"
            />
            <h1>{prod.name}</h1>
            <h1>{prod.price}</h1>
            <h1>{prod.description}</h1>
          </div>
        ))}
      </div> */}

      {productDetail.map((product, idx) => (
        <div key={idx} className="w-full pt-5">
          <div className="border-2 m-2 my-3 mx-auto lg:my-5 sm:px-0 md:max-w-[40rem] md:min-h-[22rem] rounded-3xl shadow-md hover:scale-105 transition-all ease-linear">
            <div className="image relative p-2 px-5">
              <div className="w-full h-[20rem] overflow-hidden rounded-2xl">
                <img
                  src={product.imageUrl}
                  alt={product.name}
                  className="object-cover w-full"
                />
              </div>
            </div>

            <div className="ProductName px-2 pr-10 flex items-center justify-between ">
              <p className="font-semibold text-lg m-2">{product.name}</p>
              <p className="font-semibold text-base m-2">${product.price}</p>
            </div>

            <div className="Price mb-3 mt-2 w-[90%] mx-auto ">
              <div>
                <button className="py-2 my-2 w-[100%] rounded-sm bg-indigo-600 text-white text-sm font-semibold">
                  Buy Now
                </button>
                <Button onClick={openDialog} className="py-2 my-2 w-[100%]">
                  Edit Product
                </Button>
              </div>
            </div>
          </div>
        </div>
      ))}

      <Dialog open={isOpen} onOpenChange={closeDialog}>
        <DialogContent className="sm:max-w-[525px]">
          <DialogHeader>
            <DialogTitle>Edit Product</DialogTitle>
          </DialogHeader>
          <EditFormComponent
            close={closeDialog}
            product={productDetail}
            id={id}
          />
        </DialogContent>
      </Dialog>
    </>
  );
};

export default ProductDetail;
