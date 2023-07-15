import { Routes, Route, Navigate } from "react-router-dom";
import { useContext } from "react";
import Nav from "./layouts/Nav";
import Home from "./pages/Home/Home";
import NewArrivals from "./pages/NewArrivals/NewArrivals";
import SignIn from "./pages/SignIn/SignIn";
import SignUp from "./pages/SignUp/SignUp";
import Cart from "./pages/Cart/Cart";
import Contact from "./pages/Contact/Contact";
import Sales from "./pages/Sales/Sales";
import Footer from "./layouts/Footer";
import About from "./pages/About/About";
import Wish from "./pages/Wish/Wish";
import Search from "./layouts/Search";
import ItemInfo from "./pages/ItemInfo/ItemInfo";
import NotFound from "./pages/NotFound";
import Checkout from "./pages/Checkout/Checkout";
// import ScrollToTop from "./pages/ScrollToTop";
import AppContext from "./contexts/AppContext";
import Filter from "./layouts/Filter";
import CartMenu from "./layouts/CartMenu";
import MobileMenu from "./layouts/MobileMenu";
import Alerts from "./layouts/Alerts";
import Account from "./pages/Account/Account";
import Billing from "./pages/Account/Billing";
import OrderInfo from "./pages/OrderInfo/OrderInfo";
import OrderHistory from "./pages/Account/OrderHistory";
import PersonalInfo from "./pages/Account/PersonalInfo";
import Settings from "./pages/Account/Settings";

function App() {
  const { state } = useContext(AppContext);

  return (
    <div className="app">
      {/* <ScrollToTop /> */}
      <Nav />
      <Routes>
        <Route path="/" element={<Home />}></Route>
        <Route path="new_arrivals" element={<NewArrivals />}></Route>
        <Route
          path="signIn"
          element={state.token ? <Navigate to={"/"} /> : <SignIn />}
        ></Route>
        <Route
          path="signUp"
          element={state.token ? <Navigate to={"/"} /> : <SignUp />}
        ></Route>
        <Route path="cart" element={<Cart />}></Route>
        <Route path="contact" element={<Contact />}></Route>
        <Route path="sales" element={<Sales />}></Route>
        <Route path="wish" element={<Wish />}></Route>
        <Route path="about" element={<About />}></Route>
        <Route path="products/:productId" element={<ItemInfo />}></Route>
        <Route
          path="checkout"
          element={
            state.cartList.length ? <Checkout /> : <Navigate to="/cart" />
          }
        />
        <Route path="orders/:orderId" element={<OrderInfo />}></Route>
        <Route
          path="account"
          element={state.token ? <Account /> : <Navigate to={"/signIn"} />}
        >
          <Route index element={<PersonalInfo />}></Route>
          <Route path="billing" element={<Billing />}></Route>
          <Route path="orderHistory" element={<OrderHistory />}></Route>
          <Route path="settings" element={<Settings />}></Route>
        </Route>
        <Route path="/*" element={<NotFound />}></Route>
      </Routes>
      <Footer />
      <MobileMenu />
      <CartMenu />
      <Search />
      <Filter />
      <Alerts />
    </div>
  );
}

export default App;
