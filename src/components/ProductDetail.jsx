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
  }, [productDetail]);

  return (
    <>
      <div className="border-4 w-fit p-5 px-10 m-5">
        {productDetail.length > 0
          ? productDetail.map((prod) => (
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
            ))
          : ""}
      </div>
      <Button onClick={openDialog} className="m-5 px-8 p-5">
        Edit Product
      </Button>
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
