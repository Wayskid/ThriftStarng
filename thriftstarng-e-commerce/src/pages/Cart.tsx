import { Link } from "react-router-dom";
import CartItem from "../components/CartItem";
import "../sassStyles/cart.scss";
import { HiOutlineShoppingBag } from "react-icons/hi";
import { useContext, useEffect } from "react";
import AppContext from "../contexts/AppContext";
import { REDUCER_ACTION_TYPES } from "../reducers/ReducerActionsTypes";

export default function Cart() {
  const { state, dispatch } = useContext(AppContext);

  useEffect(() => {
    dispatch({
      type: REDUCER_ACTION_TYPES.PAGE_TITLE,
      payload: "Cart - ThriftStarng",
    });
  }, [state.pageTitle]);

  return (
    <div className="cart">
      <div className="cartHeader">
        <h1>Shopping Bag</h1>
        <p className="productCount">
          Number of Clothes: <b>{state.cartList.length}</b>
        </p>
      </div>
      <ul className="cartList">
        {!state.cartList.length ? (
          <p className="cartListEmpty">
            <HiOutlineShoppingBag className="emptyCartIcon" />
            <br />
            Bag is currently <br /> empty
          </p>
        ) : (
          <>
            {state.cartList.map((cartItem, index) => {
              return <CartItem key={index} cartItem={cartItem} />;
            })}
            <h2 className="total">
              Total:{" "}
              <b>#{state.cartAmounts.itemsAmount.toLocaleString("en-US")}</b>
            </h2>
          </>
        )}
        <div className="cartButtons">
          <Link to="/new_arrivals" className="contShoppingBtn">
            {state.cartList.length ? "Continue" : "Start"} Shopping
          </Link>
          {state.cartList.length > 0 && (
            <Link to="/checkout" className="checkoutBtn">
              Proceed to Checkout
            </Link>
          )}
        </div>
      </ul>
    </div>
  );
}
