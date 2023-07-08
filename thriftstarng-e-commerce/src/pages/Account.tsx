import { useContext } from "react";
import "../sassStyles/account.scss";
import { Link, Outlet } from "react-router-dom";
import { AiOutlineSetting, AiOutlineUser } from "react-icons/ai";
import { BiDetail } from "react-icons/bi";
import { BsReceiptCutoff } from "react-icons/bs";
import AppContext from "../contexts/AppContext";

export default function Account() {
  const { state, pathMatch } = useContext(AppContext);
  return (
    <div className="account">
      <h1 className="accountHeader">Account</h1>
      <div className="introRoutes">
        <div className="accountIntro">
          <img
            src="https://images.unsplash.com/photo-1593529467220-9d721ceb9a78?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MjB8fGZhY2V8ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&w=500&q=60"
            alt="profile"
          />
          <p className="userName">{state.userInfo.name}</p>
          <p className="userEmail">{state.userInfo.email}</p>
        </div>
        <div className="accountRoutes">
          <Link to=".">Personal Info</Link>
          <Link to="billing">Billing Details</Link>
          <Link to="orderHistory">Order History</Link>
          <Link to="settings">Settings</Link>
        </div>
      </div>

      <div className="accountNav">
        <Link
          to="."
          className={`${pathMatch(`/account`) && "activeAccountNav"}`}
        >
          <AiOutlineUser />
        </Link>
        <Link
          to="billing"
          className={`${pathMatch(`/account/billing`) && "activeAccountNav"}`}
        >
          <BiDetail />
        </Link>
        <Link
          to="orderHistory"
          className={`${
            pathMatch(`/account/orderHistory`) && "activeAccountNav"
          }`}
        >
          <BsReceiptCutoff />
        </Link>
        <Link
          to="settings"
          className={`${pathMatch(`/account/settings`) && "activeAccountNav"}`}
        >
          <AiOutlineSetting />
        </Link>
      </div>

      <Outlet />
    </div>
  );
}
