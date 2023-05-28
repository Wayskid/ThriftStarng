import { useContext, useEffect } from "react";
import "../sassStyles/checkout.scss";
import { useLocation } from "react-router-dom";
import AppContext from "../contexts/AppContext";
import { REDUCER_ACTION_TYPES } from "../reducers/ReducerActionsTypes";
import BillingDetails from "../components/BillingDetails";
import Payment from "../components/Payment";
import OrderComplete from "../components/OrderComplete";
import OrderSummary from "../components/OrderSummary";
import { BiCheck } from "react-icons/bi";
import ShippingInfo from "../components/ShippingInfo";

export default function Checkout() {
  const { state, dispatch } = useContext(AppContext);

  const location = useLocation();

  useEffect(() => {
    dispatch({
      type: REDUCER_ACTION_TYPES.PAGE_TITLE,
      payload: "Checkout - ThriftStarng",
    });
  }, [state.pageTitle, state.cartList, dispatch]);

  useEffect(() => {
    if (window.innerWidth < 768) {
      dispatch({
        type: REDUCER_ACTION_TYPES.CLOSE_ORDER_SUMMARY,
        payload: false,
      });
    }
  }, [window.innerWidth]);

  function matchRoute(route: string): boolean {
    if (route === location.pathname) {
      return true;
    }
    return false;
  }

  return (
    <div className="checkout">
      <p className="checkoutHeader">Checkout</p>
      <div className="orderSummary">
        <div className="outlets">
          <div
            className={`outletDiv`}
            onClick={() => {
              dispatch({
                type: REDUCER_ACTION_TYPES.OPEN_CLOSE_ORDER_SUMMARY,
              });
            }}
          >
            Oder Summary
          </div>
          <div
            className={`outlet ${
              state.openClose.isOrderSummaryOpen && "showOutlet"
            }`}
          >
            <OrderSummary />
          </div>
        </div>
      </div>
      <div className="checkoutBody">
        <div className="outlets">
          <div className={`outletDiv first`}>
            <span>
              <p>1</p>
            </span>{" "}
            Billing Details{" "}
            {state.openClose.isOrderCompleteOpen ||
            state.openClose.isPaymentOpen ? (
              <BiCheck className="outletCheck" />
            ) : (
              ""
            )}
          </div>
          <div
            className={`outlet showOutlet
            `}
          >
            {state.openClose.isBillingDetailsOpen ? (
              <BillingDetails />
            ) : (
              !state.openClose.isOrderCompleteOpen && <ShippingInfo/>
            )}
          </div>
        </div>
        <div className="outlets">
          <div
            className={`outletDiv second ${
              matchRoute("/checkout/payment") && "active"
            }`}
          >
            <span>
              <p>2</p>
            </span>{" "}
            Payment{" "}
            {state.openClose.isOrderCompleteOpen && (
              <BiCheck className="outletCheck" />
            )}
          </div>
          <div
            className={`outlet ${
              state.openClose.isPaymentOpen && "showOutlet"
            }`}
          >
            <Payment />
          </div>
        </div>

        <div className="outlets">
          <div
            className={`outletDiv third ${
              matchRoute("/checkout/order_complete") && "active"
            }`}
          >
            <span>
              <p>3</p>
            </span>{" "}
            Order Complete
          </div>
          <div
            className={`outlet ${
              state.openClose.isOrderCompleteOpen && "showOutlet"
            }`}
          >
            <OrderComplete />
          </div>
        </div>
      </div>
    </div>
  );
}
