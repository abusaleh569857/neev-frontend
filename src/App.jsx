import { RouterProvider } from "react-router-dom";
import { router } from "./Routes/Routes";
import { AuthProvider } from "./Context/AuthContext";
import { CartProvider } from "./context/CartContext";

function App() {
  return (
    <>
      <AuthProvider>
        <CartProvider>
          <RouterProvider router={router}></RouterProvider>
        </CartProvider>
      </AuthProvider>
    </>
  );
}

export default App;
