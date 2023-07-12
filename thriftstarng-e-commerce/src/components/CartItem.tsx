import "../sassStyles/cartItem.scss";
import { BsXCircleFill } from "react-icons/bs";
import { CartType } from "../Types";
import { useContext } from "react";
import AppContext from "../contexts/AppContext";
import { REDUCER_ACTION_TYPES } from "../reducers/ReducerActionsTypes";
import AppButton from "./appButton/AppButton";

export default function CartItem({
  cartItem,
  showBtn,
  version,
}: {
  cartItem: CartType;
  showBtn: boolean;
  version: "cart" | "wish";
}) {
  const { dispatch, addToCart } = useContext(AppContext);

  return (
    <li className="cartItem">
      <div className="imgWrap">
        <img src={cartItem.image} alt="gown" className="cartItemImg" />
      </div>
      <h4 className="name">{cartItem.name}</h4>
      {version === "cart" ? (
        <div className="qtyST">
          <small>QTY:</small>
          <b>{cartItem.qty}</b>
        </div>
      ) : null}
      <b>#{(cartItem.qty * cartItem.price).toLocaleString("en-US")}</b>
      {version === "wish" ? (
        <AppButton
          version="primaryBtn"
          label="Add to cart"
          onClick={() => addToCart(cartItem.qty, cartItem.product)}
        />
      ) : null}
      {showBtn && (
        <button
          className="deleteCartItemBtn"
          onClick={() =>
            dispatch({
              type: REDUCER_ACTION_TYPES.DELETE_FROM_CART,
              payload: cartItem.product,
            })
          }
        >
          <BsXCircleFill />
        </button>
      )}
    </li>
  );
}
