import React from "react";
import Products from "./Products";
import { ToastContainer, toast } from "react-toastify";

const HomePage = () => {
  return (
    <>
      <Products isHome={true} />
    </>
  );
};

export default HomePage;
