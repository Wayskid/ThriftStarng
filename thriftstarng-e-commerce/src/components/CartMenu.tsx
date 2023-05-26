import "../sassStyles/nav.scss";
import { Link, useNavigate } from "react-router-dom";
import { BsX } from "react-icons/bs";
import { IoMdClose } from "react-icons/io";
import { useContext, useEffect } from "react";
import AppContext from "../contexts/AppContext";
import { motion } from "framer-motion";
import { REDUCER_ACTION_TYPES } from "../reducers/ReducerActionsTypes";

export default function CartMenu() {
  const { state, dispatch } = useContext(AppContext);

  const navigate = useNavigate();

  // Animations

  const cartMenu: {} = {
    showCartWrap: {
      opacity: 1,
      visibility: "visible",
    },
    hideCartWrap: {
      opacity: 0,
      transitionEnd: {
        visibility: "hidden",
      },
    },
  };

  const cartWrap = {
    showCart: {
      translateX: 0,
      opacity: 1,
      transition: {
        type: "spring",
        duration: 1,
        bounce: 0,
        delay: 0.1,
      },
    },

    hideCart: {
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
      animate={state.openClose.isCartOpen ? "showCartWrap" : "hideCartWrap"}
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
        className="cartMenuWrapper"
        variants={cartWrap}
        animate={state.openClose.isCartOpen ? "showCart" : "hideCart"}
      >
        <h1 className="cartMenuHeader">Shopping Bag</h1>
        <ul className="cartMenuList">
          {state.cartList.map((cartItem, index) => {
            return (
              <li
                key={index}
                className="cartMenuItem"
                onClick={() =>
                  dispatch({
                    type: REDUCER_ACTION_TYPES.DELETE_FROM_CART,
                    payload: cartItem.product,
                  })
                }
              >
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
                <button className="deleteCartMenuItemBtn">
                  <IoMdClose />
                </button>
              </li>
            );
          })}
        </ul>
        <div className="cartMenuFooter">
          <div className="total">
            <h3>TOTAL:</h3>
            <h2>#{state.cartAmounts.itemsAmount.toLocaleString("en-US")}</h2>
          </div>
        </div>
        <div className="cartMenuBtns">
          <Link
            to="/cart"
            className="cartMenuViewCartBtn"
            onClick={() =>
              dispatch({ type: REDUCER_ACTION_TYPES.OPEN_CLOSE_CART })
            }
          >
            View Bag
          </Link>
          <button
            className="cartMenuCheckoutBtn"
            onClick={() => {
              dispatch({ type: REDUCER_ACTION_TYPES.OPEN_CLOSE_CART });
              navigate("/checkout");
            }}
            disabled={state.cartList.length ? false : true}
          >
            Checkout
          </button>
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
