import { BsXCircleFill } from "react-icons/bs";
import { CartType } from "../Types";
import { useContext } from "react";
import AppContext from "../contexts/AppContext";
import { REDUCER_ACTION_TYPES } from "../reducers/ReducerActionsTypes";

export default function WishItem({ wishItem }: { wishItem: CartType }) {
  const { addToCart, dispatch } = useContext(AppContext);

  return (
    <li className="wishItem">
      <div className="imgWrap">
        <img src={wishItem.image} alt="gown" className="wishItemImg" />
      </div>
      <h3 className="description">{wishItem.name}</h3>
      <div className="qtyST">
        <small>PRICE</small> <b>#{wishItem.price.toLocaleString("en-US")}</b>
      </div>
      <button
        onClick={() => addToCart(wishItem.qty, wishItem.product)}
        className="wishAddToCartBtn"
      >
        Add To Cart
      </button>
      <button
        className="deleteWishItemBtn"
        onClick={() =>
          dispatch({
            type: REDUCER_ACTION_TYPES.DELETE_FROM_WISH,
            payload: wishItem.product,
          })
        }
      >
        <BsXCircleFill />
      </button>
    </li>
  );
}
