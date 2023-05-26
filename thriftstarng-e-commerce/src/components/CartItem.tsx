import { BsXCircleFill } from "react-icons/bs";
import { CartType } from "../Types";
import { useContext } from "react";
import AppContext from "../contexts/AppContext";
import { REDUCER_ACTION_TYPES } from "../reducers/ReducerActionsTypes";

export default function CartItem({ cartItem }: { cartItem: CartType }) {
  const { dispatch } = useContext(AppContext);

  return (
    <li className="cartItem">
      <div className="imgWrap">
        <img src={cartItem.image} alt="gown" className="cartItemImg" />
      </div>
      <h3 className="name">{cartItem.name}</h3>
      <div className="qtyST">
        <small>QTY</small> <b>{cartItem.qty}</b>
        {/* I'm not making this quantity editable because almost all things sold on this website is going to be quantity of 1 */}
      </div>
      <div className="qtyST">
        <small>PRICE</small> #{cartItem.price.toLocaleString("en-US")}
      </div>
      <div className="qtyST">
        <small>SUBTOTAL</small>{" "}
        <b>#{(cartItem.qty * cartItem.price).toLocaleString("en-US")}</b>
      </div>
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
    </li>
  );
}
