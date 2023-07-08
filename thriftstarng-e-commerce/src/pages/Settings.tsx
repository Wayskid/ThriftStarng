import { useContext } from "react";
import { BiUserCircle } from "react-icons/bi";
import { BsCalendarDate } from "react-icons/bs";
import AppContext from "../contexts/AppContext";

export default function Settings() {
  const { state } = useContext(AppContext);
  return (
    <div className="accountOutlet">
      <p className="outletHeader">Account settings</p>
      <div className="info">
        <div className="infoFlex">
          <p className="infoTitle">Email</p>
          <BiUserCircle className="infoIcon" />
        </div>
        <p className="infoValue">{state.userInfo.email}</p>
      </div>
      <div className="info">
        <div className="infoFlex">
          <p className="infoTitle">Password</p>
          <BsCalendarDate className="infoIcon" />
        </div>
        <p className="infoValue">Change password</p>
      </div>
    </div>
  );
}
