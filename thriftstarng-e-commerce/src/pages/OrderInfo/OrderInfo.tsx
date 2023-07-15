import "./orderInfo.scss";
import axios, { AxiosError } from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { OrderInfoTypes } from "../../Types";
import CartItem from "../../components/CartItem";
import moment from "moment";
import { BiCreditCard, BiPhone, BiUser } from "react-icons/bi";
import { HiMail } from "react-icons/hi";
import Loader from "../../components/Loader";

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
  const [loading, setLoading] = useState(true);
  const [errMsg, setErrMsg] = useState("");

  useEffect(() => {
    loading && setErrMsg("");
  }, [loading]);

  async function getOrderInfo() {
    try {
      setLoading(true);
      const { data } = await axios.get(
        `https://thriftstarng.onrender.com/api/orders/info/${orderId}`
        );
        
        setOrderInfoResult(data);
        setLoading(false);
      } catch (error) {
        if (error instanceof AxiosError) {
          setErrMsg(error?.response?.data);
        }
        setLoading(false);
    }
  }

  useEffect(() => {
    getOrderInfo();
  }, []);

  return (
    <div className="orderInfo">
      {errMsg ? (
        <p
          style={{
            color: "grey",
            marginInline: "auto",
            fontSize: 40,
            marginTop: 80,
          }}
        >
          {errMsg}
        </p>
      ) : (
        <>
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
                    <p className="custDetailSecondP">
                      {shippingDetails.country}
                    </p>
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
                    <p className="custDetailSecondP">
                      {shippingDetails.address}
                    </p>
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
                      version="orderInfo"
                    />
                  );
                })
              ) : (
                <Loader />
              )}
              {Object.values(orderInfoResult).length > 0 && (
                <div className="orderInfoListTotals">
                  <div>
                    <p>Subtotal:</p>
                    <p>
                      #{orderInfoResult.itemsAmount.toLocaleString("en-US")}
                    </p>
                  </div>
                  <div>
                    <p>Shipping fee:</p>
                    <p>
                      #{orderInfoResult.shippingFee.toLocaleString("en-US")}
                    </p>
                  </div>
                  <div>
                    <p>Tax:</p>
                    <p>#{orderInfoResult.tax.toLocaleString("en-US")}</p>
                  </div>
                  <div className="total">
                    <p>Total:</p> <b>#{totalAmount.toLocaleString("en-US")}</b>
                  </div>
                </div>
              )}
            </ul>
          </div>
        </>
      )}
    </div>
  );
}
