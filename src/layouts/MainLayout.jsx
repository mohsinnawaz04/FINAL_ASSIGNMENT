import React from "react";
import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar";
import { ProductsProvider } from "../lib/context/productsContext";

const MainLayout = () => {
  return (
    <>
      <ProductsProvider>
        <Navbar />
        <Outlet />
      </ProductsProvider>
    </>
  );
};

export default MainLayout;
