import { useNavigate } from "react-router-dom";
import CartItem from "../../components/CartItem";
import "./cart.scss";
import { HiOutlineShoppingBag } from "react-icons/hi";
import { useContext, useEffect } from "react";
import AppContext from "../../contexts/AppContext";
import { REDUCER_ACTION_TYPES } from "../../reducers/ReducerActionsTypes";
import AppButton from "../../components/appButton/AppButton";

export default function Cart() {
  const { state, dispatch } = useContext(AppContext);
  const navigate = useNavigate();

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
            Bag is currently empty
            <AppButton
              version="primaryBtn"
              label="Shop Now"
              onClick={() => {
                dispatch({ type: REDUCER_ACTION_TYPES.OPEN_CLOSE_CART });
                navigate("/new_arrivals");
              }}
            />
          </p>
        ) : (
          <>
            {state.cartList.map((cartItem, index) => {
              return (
                <CartItem
                  version="cart"
                  key={index}
                  cartItem={cartItem}
                  showBtn={true}
                />
              );
            })}
            <h3 className="total">
              Total:{" "}
              <b>#{state.cartAmounts.itemsAmount.toLocaleString("en-US")}</b>
            </h3>
            <div className="cartButtons">
              <AppButton
                version="secondaryBtn"
                label="Shop More"
                onClick={() => {
                  dispatch({ type: REDUCER_ACTION_TYPES.OPEN_CLOSE_CART });
                  navigate("/new_arrivals");
                }}
              />
              <AppButton
                version="primaryBtn"
                label="Checkout"
                onClick={() => {
                  navigate("/checkout");
                }}
              />
            </div>
          </>
        )}
      </ul>
    </div>
  );
}
