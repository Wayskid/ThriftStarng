import { useContext, useEffect, useState } from "react";
import { OrderInfoTypes } from "../Types";
import AppContext from "../contexts/AppContext";
import axios from "axios";
import { REDUCER_ACTION_TYPES } from "../reducers/ReducerActionsTypes";

export default function OrderHistory() {
  const [orderHistory, setOrderHistory] = useState<OrderInfoTypes[]>([]);
  const { dispatch, state } = useContext(AppContext);

  //Get user orders
  async function getUserOrders() {
    try {
      dispatch({
        type: REDUCER_ACTION_TYPES.LOADING,
        payload: true,
      });

      const config = {
        headers: {
          Authorization: `Bearer ${state.userInfo.token}`,
        },
      };

      const { data } = await axios.get(
        `https://thriftstarng.onrender.com/api/orders/${state.userInfo._id}`,
        config
      );

      setOrderHistory(data);
      console.log(data);
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    getUserOrders();
  }, []);

  return (
    <div>
      {orderHistory &&
        orderHistory.map((order) => <p key={order._id}>Order</p>)}
    </div>
  );
}
