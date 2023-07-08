import "../sassStyles/accountOutlet.scss"
import { AiFillContacts } from "react-icons/ai";
import { BiUserCircle, BiWorld } from "react-icons/bi";
import { BsCalendarDate } from "react-icons/bs";

export default function PersonalInfo() {
  return (
    <div className="accountOutlet">
      <p className="outletHeader">Personal Information</p>
      <div className="info">
        <div className="infoFlex">
          <p className="infoTitle">Name</p>
          <BiUserCircle className="infoIcon" />
        </div>
        <p className="infoValue">User</p>
      </div>
      <div className="info">
        <div className="infoFlex">
          <p className="infoTitle">Date of Birth</p>
          <BsCalendarDate className="infoIcon" />
        </div>
        <p className="infoValue">27 July 1992</p>
      </div>
      <div className="info">
        <div className="infoFlex">
          <p className="infoTitle">Country Region</p>
          <BiWorld className="infoIcon" />
        </div>
        <p className="infoValue">United Kingdom</p>
      </div>
      <div className="info">
        <div className="infoFlex">
          <p className="infoTitle">Contact</p>
          <AiFillContacts className="infoIcon" />
        </div>
        <p className="infoValue">User</p>
        <p className="infoValue">Phone no.</p>
      </div>
    </div>
  );
}
