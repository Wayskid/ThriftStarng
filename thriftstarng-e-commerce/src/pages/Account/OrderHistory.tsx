import { useContext, useEffect, useState } from "react";
import axios from "axios";
import moment from "moment";
import { Link, useNavigate } from "react-router-dom";
import { OrderInfoTypes } from "../../Types";
import AppButton from "../../components/appButton/AppButton";
import AppContext from "../../contexts/AppContext";
import AccountLoader from "../../components/skeletonLoaders/AccountLoader";
import { motion } from "framer-motion";

export default function OrderHistory() {
  const [orderHistory, setOrderHistory] = useState<OrderInfoTypes[]>([]);
  const { state } = useContext(AppContext);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    //Get user orders
    async function getUserOrders() {
      try {
        setLoading(true);

        const config = {
          headers: {
            Authorization: `Bearer ${state.token}`,
          },
        };

        const { data } = await axios.get(
          `https://thriftstarng.onrender.com/api/orders/user/${state.userInfo._id}`,
          config
        );

        setOrderHistory(data);
        setLoading(false);
      } catch (error) {
        console.log(error);
        setLoading(false);
      }
    }

    getUserOrders();
  }, []);

  return (
    <motion.div
      initial={{ translateX: 20 }}
      animate={{ translateX: 0 }}
      className="accountOutlet"
    >
      <div className="headerEdit">
        <p className="outletHeader">Order history</p>
      </div>
      <ul className="infoList">
        {!loading ? (
          orderHistory?.map((order) => (
            <div className="info orderHistInfo" key={order._id}>
              <div className="infoFlex">
                <p className="infoTitle">ID: ...{order._id.slice(15)}</p>
                <p className="infoBadge">{order.isPaid && "Paid"}</p>
              </div>
              <p className="infoValueOrder">
                Order date:{" "}
                <span className="dateVal">
                  {moment(order.createdAt).format("Do MMM YYYY")}
                </span>
              </p>
              <p className="infoValueOrder">
                Amount:{" "}
                <span className="amountVal">
                  #{order.totalAmount.toLocaleString("en-US")}
                </span>
              </p>
              <AppButton
                version="textOnly"
                label="view details"
                onClick={() => navigate(`/orders/${order._id}`)}
              />
            </div>
          ))
        ) : (
          <AccountLoader />
        )}
        {!loading && orderHistory.length === 0 && (
          <p className="noOrderYet">
            You don't have any order yet. <Link to="/">View products</Link>
          </p>
        )}
      </ul>
    </motion.div>
  );
}
