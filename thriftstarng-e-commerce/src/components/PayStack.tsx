import { PaystackButton } from "react-paystack";
import AppContext from "../contexts/AppContext";
import { useContext } from "react";

const PayStack = () => {
  const { state, handleOrder } = useContext(AppContext);

  const publicKey = import.meta.env.VITE_PAYSTACK_KEY;


  const componentProps = {
    email: state.billingDetails.email,
    amount: state.cartAmounts.totalAmount * 100.0,
    publicKey,
    text: "Pay Now",
    onSuccess: (reference: Object) => {
      handleOrder(reference);
    },
    onClose: () => alert("Wait! Don't leave :("),
  };

  return <PaystackButton {...componentProps} />;
};

export default PayStack;
