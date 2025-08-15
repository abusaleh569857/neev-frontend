import { createBrowserRouter } from "react-router-dom";
import MainLayout from "../Layout/MainLayout";
import ErrorPage from "../Pages/ErrorPage";
import Home from "../Pages/Home";
import DropShoulderPage from "../Pages/DropShoulderPage";
import OldMoneyPoloPage from "../Pages/OldMoneyPoloPage";
import ProductDetailsPage from "../Pages/ProductDetailsPage";
import CartPage from "../Pages/CartPage";
import OrderReviewPage from "../Pages/OrderReviewPage";
import Login from "../Pages/Login";
import RegisterPage from "../Pages/Register";

import ProductList from "../admin/ProductList";

import EditProduct from "../admin/EditProduct";
import AdminOrderPage from "../admin/AdminOrderPage";

import PrivateRoute from "../components/PrivateRoute";
import About from "../Pages/About";
import SearchResults from "../components/SearchResults";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout></MainLayout>,
    errorElement: <ErrorPage></ErrorPage>,
    children: [
      { path: "/", element: <Home /> },
      { path: "/drop-shoulder", element: <DropShoulderPage /> },
      { path: "/old-money", element: <OldMoneyPoloPage /> },
      { path: "/product/:id", element: <ProductDetailsPage /> },
      { path: "/cart", element: <CartPage /> },
      { path: "/order-review", element: <OrderReviewPage /> },
      { path: "/login", element: <Login /> },
      { path: "/register", element: <RegisterPage /> },
      { path: "/about", element: <About /> },
      { path: "/search", element: <SearchResults /> },

      {
        path: "/admin/products",
        element: (
          <PrivateRoute adminOnly={true}>
            <ProductList />
          </PrivateRoute>
        ),
      },
      {
        path: "/admin/products/add",
        element: (
          <PrivateRoute adminOnly={true}>
            <EditProduct />
          </PrivateRoute>
        ),
      },
      {
        path: "/admin/products/edit/:id",
        element: (
          <PrivateRoute adminOnly={true}>
            <EditProduct />
          </PrivateRoute>
        ),
      },
      {
        path: "/admin/orders",
        element: (
          <PrivateRoute adminOnly={true}>
            <AdminOrderPage />
          </PrivateRoute>
        ),
      },
    ],
  },
]);
