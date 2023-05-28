import "../sassStyles/shopSection.scss";
import ShopList from "./ShopList";
import { useContext, useEffect } from "react";
import AppContext from "../contexts/AppContext";
import { REDUCER_ACTION_TYPES } from "../reducers/ReducerActionsTypes";
import { BsFilterLeft } from "react-icons/bs";
import Loader from "./Loader";
import SkeletonLoader from "./SkeletonLoader";

export default function ShopSection() {
  const { state, dispatch, getProducts } = useContext(AppContext);

  useEffect(() => {
    getProducts();
  }, [dispatch]);

  return (
    <div className="shopSection">
      <div className="shopSectionTop">
        <div className="catSelected">
          <p>ThriftStarng</p>
          <b>{state.productFilterSort.category}</b>
        </div>
        <button
          onClick={() =>
            dispatch({
              type: REDUCER_ACTION_TYPES.OPEN_CLOSE_FILTER,
            })
          }
        >
          Filter
          <span>
            <BsFilterLeft />
          </span>
        </button>
      </div>
      {state.isLoading ? (
        <div className="skeletonLoaders">
          <SkeletonLoader />
          <SkeletonLoader />
          <SkeletonLoader />
          <SkeletonLoader />
        </div>
      ) : (
        <ShopList />
      )}
      {state.pagenation <= state.products.length && !state.isLoading && (
        <button
          className="loadMoreBtn"
          onClick={() => dispatch({ type: REDUCER_ACTION_TYPES.PAGENATION })}
        >
          Load More
        </button>
      )}
    </div>
  );
}
