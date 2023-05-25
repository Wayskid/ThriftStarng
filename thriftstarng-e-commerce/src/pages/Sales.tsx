import "../sassStyles/sales.scss";
import { useContext, useEffect } from "react";
import AppContext from "../contexts/AppContext";
import { REDUCER_ACTION_TYPES } from "../reducers/ReducerActionsTypes";
import ShopSection from "../components/ShopSection";

export default function Sales() {

  const { state, dispatch } = useContext(AppContext);

  useEffect(() => {
    dispatch({
      type: REDUCER_ACTION_TYPES.PAGE_TITLE,
      payload: "Sales - ThriftStarng",
    });
  }, [state.pageTitle]);

  return (
    <div className="sales">
      <div className="salesHeader">
        <h1>ThriftStarng Sales</h1>
        <h3>Get 30%-50% off Designs</h3>
      </div>
      <div className="salesShopSec">
        <ShopSection />
      </div>
    </div>
  );
}
