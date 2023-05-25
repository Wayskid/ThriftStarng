import "../sassStyles/wish.scss";
import { useContext, useEffect } from "react";
import AppContext from "../contexts/AppContext";
import { REDUCER_ACTION_TYPES } from "../reducers/ReducerActionsTypes";
import WishItem from "../components/WishItem";
import { AiOutlineHeart } from "react-icons/ai";
import { Link } from "react-router-dom";

export default function WishList() {
  const { state, dispatch } = useContext(AppContext);

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
            <br />
            Wishlist is currently empty
            <br />
          </p>
        ) : (
          <>
            {state.wishList.map((wishItem, index) => {
              return <WishItem key={index} wishItem={wishItem} />;
            })}
          </>
        )}
        <Link to={"/new_arrivals"} className="contShoppingBtn">
          {state.wishList.length ? "Continue" : "Start"} Shopping
        </Link>
      </ul>
    </div>
  );
}
