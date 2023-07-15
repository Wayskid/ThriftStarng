import "../sassStyles/cartItem.scss";
import { BsXCircleFill } from "react-icons/bs";
import { CartType } from "../Types";
import { useContext, useState } from "react";
import AppContext from "../contexts/AppContext";
import { REDUCER_ACTION_TYPES } from "../reducers/ReducerActionsTypes";
import AppButton from "./appButton/AppButton";
import AppInputSelect from "./appInput/AppInputSelect";
import { useNavigate } from "react-router-dom";

export default function CartItem({
  cartItem,
  showBtn,
  version,
}: {
  cartItem: CartType;
  showBtn: boolean;
  version: "cart" | "wish" | "orderInfo";
}) {
  const { dispatch, addToCart } = useContext(AppContext);
  const navigate = useNavigate();

  const [itemQty, setItemQty] = useState(cartItem.qty);

  return (
    <li className="cartItem">
      <img src={cartItem.image} alt="gown" className="cartItemImg" />
      <h4 className="cartItemName">{cartItem.name}</h4>
      <div className="qtyST">
        <small>QTY:</small>
        {version === "cart" ? (
          <AppInputSelect
            version="stock"
            list={[...Array(cartItem.stockCount).keys()]}
            value={itemQty.toString()}
            name="qty"
            onChange={(e) => {
              setItemQty(Number(e.target.value));
              dispatch({
                type: REDUCER_ACTION_TYPES.UPDATE_CART,
                payload: { key: cartItem.product, value: e.target.value },
              });
            }}
          />
        ) : (
          <p>{cartItem.qty}</p>
        )}
      </div>
      <b className="cartItemPrice">
        #{(itemQty * cartItem.price).toLocaleString("en-US")}
      </b>
      {version === "orderInfo" && (
        <AppButton
          onClick={() => navigate(`/products/${cartItem.product}`)}
          version="primaryBtn"
          label="View Item"
        />
      )}
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
