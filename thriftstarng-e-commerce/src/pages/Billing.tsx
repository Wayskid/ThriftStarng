import { useContext } from "react";
import {
  BiFlag,
  BiLandscape,
  BiLocationPlus,
  BiPhone,
  BiUserCircle,
  BiWorld,
} from "react-icons/bi";
import AppContext from "../contexts/AppContext";
import { HiLocationMarker, HiMail } from "react-icons/hi";

export default function Billing() {
  const { state } = useContext(AppContext);
  const {
    firstName,
    lastName,
    email,
    phone,
    country,
    address,
    city,
    state: stateRegion,
    postcode,
  } = state.billingDetails;
  return (
    <div className="accountOutlet">
      <p className="outletHeader">Billing Details</p>
      <div className="info">
        <div className="infoFlex">
          <p className="infoTitle">Name</p>
          <BiUserCircle className="infoIcon" />
        </div>
        <p className="infoValue">{firstName + " " + lastName}</p>
      </div>
      <div className="info">
        <div className="infoFlex">
          <p className="infoTitle">Email</p>
          <HiMail className="infoIcon" />
        </div>
        <p className="infoValue">{email}</p>
      </div>
      <div className="info">
        <div className="infoFlex">
          <p className="infoTitle">Phone</p>
          <BiPhone className="infoIcon" />
        </div>
        <p className="infoValue">{phone}</p>
      </div>
      <div className="info">
        <div className="infoFlex">
          <p className="infoTitle">Country/Region</p>
          <BiWorld className="infoIcon" />
        </div>
        <p className="infoValue">{country}</p>
      </div>
      <div className="info">
        <div className="infoFlex">
          <p className="infoTitle">Address</p>
          <HiLocationMarker className="infoIcon" />
        </div>
        <p className="infoValue">{address}</p>
      </div>
      <div className="info">
        <div className="infoFlex">
          <p className="infoTitle">City</p>
          <BiLandscape className="infoIcon" />
        </div>
        <p className="infoValue">{city}</p>
      </div>
      <div className="info">
        <div className="infoFlex">
          <p className="infoTitle">State</p>
          <BiLocationPlus className="infoIcon" />
        </div>
        <p className="infoValue">{stateRegion}</p>
      </div>
      <div className="info">
        <div className="infoFlex">
          <p className="infoTitle">Postcode</p>
          <BiFlag className="infoIcon" />
        </div>
        <p className="infoValue">{postcode}</p>
      </div>
    </div>
  );
}
