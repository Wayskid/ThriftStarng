import PayStack from "./PayStack";
import { useContext } from "react";
import moment from "moment";
import AppContext from "../../contexts/AppContext";

export default function Payment() {
  const { state } = useContext(AppContext);

  return (
    <div className="payment">
      <div className="orderInfo">
        <ul>
          <li>
            Order Date: <b>{moment().format("Do MMM YYYY")}</b>
          </li>
          <li>
            Order Amount:{" "}
            <b>#{state.cartAmounts.totalAmount.toLocaleString("en-US")}</b>
          </li>
          <li>Payment Method: Paystack</li>
        </ul>
        <p>
          Thank you for your order. Please click the button below to pay with
          Paystack
        </p>
        {state.openClose.isPaymentOpen && <PayStack />}
      </div>
    </div>
  );
}
