import "../sassStyles/newArrivals.scss";
import { useContext, useEffect } from "react";
import AppContext from "../contexts/AppContext";
import { REDUCER_ACTION_TYPES } from "../reducers/ReducerActionsTypes";
import ShopSection from "../components/ShopSection";

export default function NewArrivals() {
  const { state, dispatch } = useContext(AppContext);

  useEffect(() => {
    dispatch({
      type: REDUCER_ACTION_TYPES.PAGE_TITLE,
      payload: "New Arrivals - ThriftStarng",
    });
  }, [state.pageTitle]);

  return (
    <div className="newArrivals">
      <div className="newArrivalsHeader">
        <h1>New Arrivals</h1>
        <h3>Shop ThriftStarng Newest Designs</h3>
      </div>
      <div className="newArrivalsShopSec">
        <ShopSection />
      </div>
    </div>
  );
}
