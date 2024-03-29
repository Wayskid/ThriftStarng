import "../sassStyles/cartMenu.scss";
import { useNavigate } from "react-router-dom";
import { BsX } from "react-icons/bs";
import { useContext, useEffect } from "react";
import AppContext from "../contexts/AppContext";
import { motion } from "framer-motion";
import { REDUCER_ACTION_TYPES } from "../reducers/ReducerActionsTypes";
import AppButton from "../components/appButton/AppButton";

export default function CartMenu() {
  const { state, dispatch } = useContext(AppContext);

  const navigate = useNavigate();

  // Animations

  const cartMenu: {} = {
    showCart: {
      opacity: 1,
      visibility: "visible",
    },
    hideCart: {
      opacity: 0,
      transitionEnd: {
        visibility: "hidden",
      },
    },
  };

  const cartWrap = {
    showCartMenu: {
      translateX: 0,
      opacity: 1,
      transition: {
        type: "spring",
        duration: 1,
        bounce: 0,
        delay: 0.1,
      },
    },

    hideCartMenu: {
      opacity: 0,
      translateX: 90,
      transition: {
        type: "spring",
        restSpeed: 0.5,
      },
    },
  };

  useEffect(() => {
    if (state.openClose.isCartOpen) {
      dispatch({ type: REDUCER_ACTION_TYPES.CLOSE_SEARCH });
      dispatch({ type: REDUCER_ACTION_TYPES.CLOSE_MENU });
      dispatch({ type: REDUCER_ACTION_TYPES.CLOSE_FILTER });
    }
  }, [dispatch, state.openClose.isCartOpen]);

  return (
    <motion.div
      className="cartMenu"
      variants={cartMenu}
      animate={state.openClose.isCartOpen ? "showCart" : "hideCart"}
    >
      <div
        className="leftCartMenu"
        onClick={() =>
          dispatch({
            type: REDUCER_ACTION_TYPES.OPEN_CLOSE_CART,
          })
        }
      ></div>
      <motion.div
        className="rightCartMenu"
        variants={cartWrap}
        animate={state.openClose.isCartOpen ? "showCartMenu" : "hideCartMenu"}
      >
        <h1 className="cartMenuHeader">Shopping Bag</h1>
        <ul className="cartMenuList">
          {state.cartList.map((cartItem, index) => {
            return (
              <li key={index} className="cartMenuItem">
                <div className="imgWrap">
                  <img
                    src={cartItem.image}
                    alt="gown"
                    className="cartMenuItemImg"
                  />
                </div>
                <div className="cartMenuItemMid">
                  <p className="iteName">{cartItem.name}</p>
                  <p className="size">Size: {cartItem.size}</p>
                  <div className="amount">
                    <p className="qty">{cartItem.qty}</p> X{" "}
                    <h4 className="price">
                      #{cartItem.price.toLocaleString("en-US")}
                    </h4>
                  </div>
                </div>
                <button
                  className="deleteCartMenuItemBtn"
                  onClick={() =>
                    dispatch({
                      type: REDUCER_ACTION_TYPES.DELETE_FROM_CART,
                      payload: cartItem.product,
                    })
                  }
                >
                  <BsX />
                </button>
              </li>
            );
          })}
        </ul>
        <div className="total">
          <h3>TOTAL:</h3>
          <h2>#{state.cartAmounts.itemsAmount.toLocaleString("en-US")}</h2>
        </div>
        <div className="cartMenuBtns">
          <AppButton
            version="primaryBtn"
            label={"View Bag"}
            onClick={() => {
              dispatch({ type: REDUCER_ACTION_TYPES.OPEN_CLOSE_CART });
              navigate("/cart");
            }}
          />
          <AppButton
            version="secondaryBtn"
            label="Checkout"
            isDisabled={state.cartList.length ? false : true}
            onClick={() => {
              dispatch({ type: REDUCER_ACTION_TYPES.OPEN_CLOSE_CART });
              navigate("/checkout");
            }}
          />
        </div>
        <motion.button
          className="closeCartBtn"
          onClick={() =>
            dispatch({ type: REDUCER_ACTION_TYPES.OPEN_CLOSE_CART })
          }
          whileTap={{ scale: 0.95 }}
        >
          <BsX />
        </motion.button>
      </motion.div>
    </motion.div>
  );
}
