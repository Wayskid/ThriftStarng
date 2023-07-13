import "./wish.scss";
import { useContext, useEffect } from "react";
import AppContext from "../../contexts/AppContext";
import { REDUCER_ACTION_TYPES } from "../../reducers/ReducerActionsTypes";
import { AiOutlineHeart } from "react-icons/ai";
import { useNavigate } from "react-router-dom";
import CartItem from "../../components/CartItem";
import AppButton from "../../components/appButton/AppButton";

export default function WishList() {
  const { state, dispatch } = useContext(AppContext);
  const navigate = useNavigate();

  useEffect(() => {
    dispatch({
      type: REDUCER_ACTION_TYPES.PAGE_TITLE,
      payload: "Wishlist - ThriftStarng",
    });
  }, [state.pageTitle]);

  return (
    <div className="wish">
      <div className="wishHeader">
        <h1>Wish List</h1>
        <p className="productCount">
          Number of Wishes: <b>{state.wishList.length}</b>
        </p>
      </div>
      <ul className="wishList">
        {!state.wishList.length ? (
          <p className="wishListEmpty">
            <AiOutlineHeart className="emptyWishIcon" />
            Wishlist is currently empty
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
            {state.wishList.map((wishItem, index) => {
              return (
                <CartItem
                  key={index}
                  cartItem={wishItem}
                  showBtn={true}
                  version={"wish"}
                />
              );
            })}
          </>
        )}
      </ul>
    </div>
  );
}
