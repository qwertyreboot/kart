import { BrowserRouter, Routes, Route } from "react-router-dom";
import SignupPage from "./pages/Signup";
import SigninPage from "./pages/Signin";
import { AuthProvider } from "./contexts/Auth";
import IsNotAuthenticated from "./components/utils/IsNotAuthenticated";
import ProductsPage from "./pages/Products";
import Navbar from "./components/common/Navbar";
import ProductCreatePage from "./pages/ProductCreate";
import IsStaff from "./components/utils/IsStaff";
import ProductOverviewPage from "./pages/ProductOverview";
import CheckoutPage from "./pages/Checkout";
import OrdersPage from "./pages/Orders";
import OrderOverviewPage from "./pages/OrderOverview";
import IsAuthenticated from "./components/utils/IsAuthenticated";
import { CartProvider } from "./contexts/Cart";

export default function App() {
  return (
    <AuthProvider>
      <CartProvider>
        <BrowserRouter>
          <Navbar />
          <Routes>
            <Route path="/" element={<ProductsPage />} />
            <Route path="/products/:id" element={<ProductOverviewPage />} />

            <Route path="/" element={<IsAuthenticated />}>
              <Route path="/checkout" element={<CheckoutPage />} />
              <Route path="/orders" element={<OrdersPage />} />
              <Route path="/orders/:id" element={<OrderOverviewPage />} />
            </Route>

            <Route path="/" element={<IsStaff />}>
              <Route path="/products/new" element={<ProductCreatePage />} />
            </Route>

            <Route path="/" element={<IsNotAuthenticated />}>
              <Route path="/signup" element={<SignupPage />} />
              <Route path="/signin" element={<SigninPage />} />
            </Route>
          </Routes>
        </BrowserRouter>
      </CartProvider>
    </AuthProvider>
  );
}
