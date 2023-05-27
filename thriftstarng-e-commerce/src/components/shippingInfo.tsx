import { useContext } from "react";
import AppContext from "../contexts/AppContext";
import { REDUCER_ACTION_TYPES } from "../reducers/ReducerActionsTypes";

export default function ShippingInfo() {
  const { state, dispatch } = useContext(AppContext);
  const { billingDetails } = state;

  return (
    <div className="shippingInfo">
      <div className="shippingInfoDivs">
        <p className="shippingInfoHeader">
          Shipping Address{" "}
          <button
            onClick={() => {
              dispatch({
                type: REDUCER_ACTION_TYPES.OPEN_CLOSE_BILLING_DET,
                payload: true,
              });
              dispatch({
                type: REDUCER_ACTION_TYPES.OPEN_CLOSE_PAYMENT,
                payload: false,
              });
            }}
          >
            Edit
          </button>
        </p>
        <p className="shippingInfoText">
          {billingDetails.gift
            ? billingDetails.giftFirstName
            : billingDetails.firstName}{" "}
          {billingDetails.gift
            ? billingDetails.giftLastName
            : billingDetails.lastName}
        </p>
        <p className="shippingInfoText">
          {billingDetails.gift
            ? billingDetails.giftAddress
            : billingDetails.address}
        </p>
        <p className="shippingInfoText">
          {billingDetails.gift ? billingDetails.giftCity : billingDetails.city}
          {", "}
          {billingDetails.gift
            ? billingDetails.giftState
            : billingDetails.state}
          {", "}
          {billingDetails.gift
            ? billingDetails.giftCountry
            : billingDetails.country}
        </p>
      </div>
      <div className="shippingInfoDivs">
        <p className="shippingInfoText">{billingDetails.email}</p>
        <p className="shippingInfoText">{billingDetails.phone}</p>
      </div>
    </div>
  );
}
