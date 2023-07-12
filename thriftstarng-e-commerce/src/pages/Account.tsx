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
      <p className="accountHeader">Account</p>
      <div className="accountFlex">
        <div className="introRoutes">
          <div className="accountIntro">
            <div className="userPic">
              {state.userInfo.personalInfo.profilePic && (
                <img
                  src={state.userInfo.personalInfo.profilePic}
                  alt="profile"
                />
              )}
            </div>
            <p className="userName">{state.userInfo.name}</p>
            <p className="userEmail">{state.userInfo.email}</p>
          </div>
          <div className="accountRoutes">
            <Link
              to="."
              className={`${pathMatch(`/account`) && "activeAccountRoute"}`}
            >
              Personal Info
            </Link>
            <Link
              to="billing"
              className={`${
                pathMatch(`/account/billing`) && "activeAccountRoute"
              }`}
            >
              Billing Details
            </Link>
            <Link
              to="orderHistory"
              className={`${
                pathMatch(`/account/orderHistory`) && "activeAccountRoute"
              }`}
            >
              Order History
            </Link>
            <Link
              to="settings"
              className={`${
                pathMatch(`/account/settings`) && "activeAccountRoute"
              }`}
            >
              Settings
            </Link>
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
            className={`${
              pathMatch(`/account/settings`) && "activeAccountNav"
            }`}
          >
            <AiOutlineSetting />
          </Link>
        </div>
        <Outlet />
      </div>
    </div>
  );
}
