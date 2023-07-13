import { useContext } from "react";
import AppContext from "../../contexts/AppContext";

export default function OrderSummary() {
  const { state } = useContext(AppContext);

  
  
  return (
    <div className="orderSummaryWrap">
      <div className="orderSummaryWrapTop">
        <div className="summaryFlex">
          <p className="summaryFlexTitle">Subtotal</p>
          <p className="summaryFlexValue">
            #{state.cartAmounts.itemsAmount.toLocaleString("en-US")}
          </p>
        </div>
        <div className="summaryFlex">
          <p className="summaryFlexTitle">Shipping Fee</p>
          <p className="summaryFlexValue">
            #{state.cartAmounts.shippingFee.toLocaleString("en-US")}
          </p>
        </div>
        <div className="summaryFlex">
          <p className="summaryFlexTitle">Tax</p>
          <p className="summaryFlexValue">
            #{state.cartAmounts.tax.toLocaleString("en-US")}
          </p>
        </div>
        <div className="summaryFlexTotal">
          <h2 className="summaryFlexTotal">Total</h2>
          <p className="summaryFlexTotalValue">
            #{state.cartAmounts.totalAmount.toLocaleString("en-US")}
          </p>
        </div>
      </div>
      <button type="button" className="editCartBtn">
        Edit Cart
      </button>
      <div className="couponDiv">
        <input type="text" placeholder="Coupon" />
        <button type="button">Apply Coupon</button>
      </div>
    </div>
  );
}
