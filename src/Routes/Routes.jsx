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
import AdminDashboard from "../DashBoard/AdminDashBoard";
import ProductList from "../admin/ProductList";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout></MainLayout>,
    errorElement: <ErrorPage></ErrorPage>,
    children: [
      {
        path: "/",
        element: <Home></Home>,
      },
      {
        path: "/drop-shoulder",
        element: <DropShoulderPage></DropShoulderPage>,
      },
      {
        path: "/old-money",
        element: <OldMoneyPoloPage></OldMoneyPoloPage>,
      },
      {
        path: "/product/:id",
        element: <ProductDetailsPage></ProductDetailsPage>,
      },
      {
        path: "/cart",
        element: <CartPage></CartPage>,
      },
      {
        path: "/order-review",
        element: <OrderReviewPage></OrderReviewPage>,
      },
      {
        path: "/login",
        element: <Login></Login>,
      },
      {
        path: "/register",
        element: <RegisterPage></RegisterPage>,
      },
      {
        path: "/admin/products",
        element: <ProductList></ProductList>,
      },
    ],
  },
]);
