import React from "react";
import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar";
import { ProductsProvider } from "../lib/context/productsContext";
import { Toaster } from "@/components/ui/toaster";

const MainLayout = () => {
  return (
    <>
      <ProductsProvider>
        <Navbar />
        <Outlet />
        <Toaster />
      </ProductsProvider>
    </>
  );
};

export default MainLayout;
