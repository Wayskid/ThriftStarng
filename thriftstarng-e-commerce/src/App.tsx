import { Routes, Route, Navigate } from "react-router-dom";
import { useContext } from "react";
import Nav from "./layouts/Nav";
import Home from "./pages/Home";
import NewArrivals from "./pages/NewArrivals";
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";
import Cart from "./pages/Cart";
import Contact from "./pages/Contact";
import Sales from "./pages/Sales";
import Footer from "./layouts/Footer";
import About from "./pages/About";
import Wish from "./pages/Wish";
import Search from "./layouts/Search";
import ViewItem from "./pages/ViewItem";
import NotFound from "./pages/NotFound";
import Checkout from "./pages/Checkout";
import ScrollToTop from "./pages/ScrollToTop";
import AppContext from "./contexts/AppContext";
import Filter from "./layouts/Filter";

function App() {
  const { state } = useContext(AppContext);

  return (
    <div className="App">
      <ScrollToTop />
      <Nav />
      <Routes>
        <Route path="/" element={<Home />}></Route>
        <Route path="new_arrivals" element={<NewArrivals />}></Route>
        <Route
          path="signIn"
          element={state.userInfo ? <Navigate to={"/"} /> : <SignIn />}
        ></Route>
        <Route
          path="signUp"
          element={state.userInfo ? <Navigate to={"/"} /> : <SignUp />}
        ></Route>
        <Route path="cart" element={<Cart />}></Route>
        <Route path="contact" element={<Contact />}></Route>
        <Route path="sales" element={<Sales />}></Route>
        <Route path="wish" element={<Wish />}></Route>
        <Route path="about" element={<About />}></Route>
        <Route path="products/:id" element={<ViewItem />}></Route>
        <Route
          path="checkout"
          element={
            state.cartList.length ? <Checkout /> : <Navigate to="/cart" />
          }
        />
        <Route path="/*" element={<NotFound />}></Route>
      </Routes>
      <Footer />
      <Search />
      <Filter/>
    </div>
  );
}

export default App;
