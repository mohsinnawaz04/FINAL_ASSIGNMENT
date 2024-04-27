import { MdOutlineStarPurple500 } from "react-icons/md";
import CartSvg from "./CartSvgComponent";
import { Link } from "react-router-dom";

const ProductCardData = ({ product, home }) => {
  return (
    <>
      {home ? (
        <>
          <div className="border-2 m-2 my-3 lg:my-5 sm:px-0 md:max-w-[25rem] md:min-h-[16rem] rounded-3xl shadow-md  hover:scale-105 transition-all ease-linear">
            <div className="image relative p-2 px-2">
              <Link to={`products/${product.id}`}>
                <div className="w-[22rem] h-52 overflow-hidden rounded-2xl">
                  <img
                    src={product.imageUrl}
                    alt="Iphone 9"
                    className="object-cover w-full"
                  />
                </div>

                <div className="flex items-center gap-1 absolute bottom-5 left-7 text-slate-500 bg-white  p-1 pr-2 rounded">
                  <MdOutlineStarPurple500 className="text-yellow-400" />
                  <p>4.8</p>
                </div>
              </Link>
            </div>
            <div className="ProductName px-2">
              <p className="font-semibold text-lg m-2">{product.name}</p>
            </div>

            <div className="Price mb-3">
              <div className="mx-2 flex justify-between items-center px-2">
                <p className="flex space-x-1 items-center">
                  <span>${product.price}</span>
                </p>

                <div className="flex items-center mb-2 space-x-1.5 rounded-lg bg-blue-500 text-white duration-100 hover:bg-blue-600">
                  <button className="text-sm flex items-center gap-2 px-4 py-2">
                    <CartSvg />
                    <span>Add to cart</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </>
      ) : (
        <>
          <div className="border-2 m-2 my-3 lg:my-5 sm:px-0 md:max-w-[25rem] md:min-h-[16rem] rounded-3xl shadow-md hover:scale-105 transition-all ease-linear">
            <Link to={`${product.id}`}>
              <div className="image relative p-2 px-2 hover:cursor-pointer">
                <div className="w-[22rem] h-52 overflow-hidden rounded-2xl">
                  <img
                    src={product.imageUrl}
                    alt="Iphone 9"
                    className="object-cover w-full"
                  />
                </div>

                <div className="flex items-center gap-1 absolute bottom-5 left-7 text-slate-500 bg-white  p-1 pr-2 rounded">
                  <MdOutlineStarPurple500 className="text-yellow-400" />
                  <p>4.8</p>
                </div>
              </div>
            </Link>

            <div className="ProductName px-2">
              <p className="font-semibold text-lg m-2">{product.name}</p>
            </div>

            <div className="Price mb-3">
              <div className="mx-2 flex justify-between items-center px-2">
                <p className="flex space-x-1 items-center">
                  <span>${product.price}</span>
                </p>

                <div className="flex items-center mb-2 space-x-1.5 rounded-lg bg-blue-500 text-white duration-100 hover:bg-blue-600">
                  <button className="text-sm flex items-center gap-2 px-4 py-2">
                    <CartSvg />
                    <span>Add to cart</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default ProductCardData;
