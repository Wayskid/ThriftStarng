import "../sassStyles/orderInfo.scss";
import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { OrderInfoTypes } from "../Types";
import CartItem from "../components/CartItem";
import moment from "moment";
import { BiCreditCard, BiPhone, BiUser } from "react-icons/bi";
import { HiMail } from "react-icons/hi";
import Loader from "../components/Loader";

export default function OrderInfo() {
  const [orderInfoResult, setOrderInfoResult] = useState<OrderInfoTypes>(
    {} as OrderInfoTypes
  );
  const {
    userInfo,
    orderItems,
    totalAmount,
    shippingDetails,
    isPaid,
    paymentMethod,
  } = orderInfoResult;
  const { orderId } = useParams();

  async function getOrderInfo() {
    try {
      const { data } = await axios.get(
        `http://localhost:3000/api/orders/${orderId}`
      );

      setOrderInfoResult(data);
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    getOrderInfo();
  }, []);

  return (
    <div className="orderInfo">
      <div className="orderInfoHeader">
        <p className="orderInfoHeaderTitle">
          Order <span>#{orderInfoResult._id}</span>
        </p>
        <p className="orderDate">
          {moment(orderInfoResult.createdAt).format("Do MMM YYYY, LT")}
        </p>
      </div>
      <div className="OrderInfoLists">
        <div className="orderInfoListCustomer">
          <p className="orderInfoListHeader">Customer Details</p>
          {Object.values(orderInfoResult).length > 0 ? (
            <ul className="custDetailsList">
              <li className="custDetail">
                <p className="custDetailFirstP">
                  <BiUser className="custDetailIcon" />
                  {userInfo.name}
                </p>
                <p className="custDetailSecondP">{shippingDetails.country}</p>
              </li>
              <li className="custDetail">
                <p className="custDetailFirstP">
                  <HiMail className="custDetailIcon" />
                  {userInfo.email}
                </p>
                <p className="custDetailSecondP">{shippingDetails.city}</p>
              </li>
              <li className="custDetail">
                <p className="custDetailFirstP">
                  <BiPhone className="custDetailIcon" />
                  {userInfo.phone}
                </p>
                <p className="custDetailSecondP">{shippingDetails.address}</p>
              </li>
              <li className="custDetail">
                <p className="custDetailFirstP">
                  <BiCreditCard className="custDetailIcon" />
                  {paymentMethod}
                </p>
                <p>
                  {isPaid && (
                    <span className="custDetailSecondP paid">PAID</span>
                  )}
                </p>
              </li>
            </ul>
          ) : (
            <Loader />
          )}
        </div>
        <ul className="orderInfoListItems">
          <p className="orderInfoListHeader">Order Items</p>
          {Object.values(orderInfoResult).length > 0 ? (
            orderItems.map((cartItem, index) => {
              return (
                <CartItem
                  key={index}
                  cartItem={cartItem}
                  showBtn={false}
                  version="cart"
                />
              );
            })
          ) : (
            <Loader />
          )}
          {Object.values(orderInfoResult).length > 0 && (
            <h3 className="orderInfoListTotal">
              Total: <b>#{totalAmount.toLocaleString("en-US")}</b>
            </h3>
          )}
        </ul>
      </div>
    </div>
  );
}
