import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";

import MainLayout from "./layouts/MainLayout";
import HomePage from "./pages/HomePage";
import Products from "./pages/Products";
import ProductDetailPage from "./pages/ProductDetailPage";
import AdminDashboard from "./components/AdminDashboard";

const App = () => {
  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path="" element={<MainLayout />}>
        <Route index element={<HomePage />} />
        <Route path="products" element={<Products />} />
        <Route path="products/:id" element={<ProductDetailPage />} />
        <Route path="admin" element={<AdminDashboard />} />
      </Route>
    )
  );

  return <RouterProvider router={router} />;
};

export default App;
