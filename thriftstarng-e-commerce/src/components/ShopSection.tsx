import ShopList from "./ShopList";
import { useContext, useEffect } from "react";
import AppContext from "../contexts/AppContext";
import { REDUCER_ACTION_TYPES } from "../reducers/ReducerActionsTypes";
import { BsFilterLeft } from "react-icons/bs";
import Loader from "./Loader";

export default function ShopSection() {
  const { state, dispatch, getProducts, loadMore } = useContext(AppContext);

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
      {state.isLoading ? <Loader /> : <ShopList />}
      {state.pagenation <= state.products.length && !state.isLoading && (
        <button className="loadMoreBtn" onClick={loadMore}>
          Load More
        </button>
      )}
    </div>
  );
}
