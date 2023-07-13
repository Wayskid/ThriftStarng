import { ChangeEvent, useContext, useState } from "react";
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
import { FiEdit } from "react-icons/fi";
import AppInput from "../components/appInput/AppInput";
import Loader from "../components/Loader";
import { REDUCER_ACTION_TYPES } from "../reducers/ReducerActionsTypes";
import axios from "axios";
import AppButton from "../components/appButton/AppButton";

export default function Billing() {
  const { state, dispatch } = useContext(AppContext);
  const {
    fullName,
    email,
    phone,
    country,
    address,
    city,
    state: stateRegion,
    postcode,
  } = state.userInfo.billingDetails;
  const [loading, setLoading] = useState(false);

  //Handle edit billing
  const [editMode, setEditMode] = useState(false);

  //Handle save inputs to state
  const [editedValue, setEditedValue] = useState({
    fullName,
    email,
    phone,
    country,
    address,
    city,
    stateRegion,
    postcode,
  });

  function handleInputChange(e: ChangeEvent<HTMLInputElement>) {
    setEditedValue({
      ...editedValue,
      [e.target.name]: e.target.value,
    });
  }

  //Save updated billing details
  async function handleSaveEdits() {
    if (Object.values(editedValue).some((value) => value.length > 0)) {
      try {
        setLoading(true);
        const config = {
          headers: {
            Authorization: `Bearer ${state.token}`,
            "Content-Type": "application/json",
          },
        };
        const { data } = await axios.patch(
          `https://thriftstarng.onrender.com/api/users/${state.userInfo._id}/settings/billingDetails`,
          { ...editedValue },
          config
        );
        dispatch({ type: REDUCER_ACTION_TYPES.GET_USER_INFO, payload: data });
        setLoading(false);
      } catch (error) {
        console.log(error);
        setLoading(false);
      }
    }
  }

  return (
    <div className="accountOutlet">
      <div className="headerEdit">
        <p className="outletHeader">Billing Details</p>
        {loading ? (
          <Loader />
        ) : (
          <>
            {editMode ? (
              <AppButton
                version="textOnly"
                label="save"
                onClick={() => {
                  setEditMode(!editMode);
                  handleSaveEdits();
                }}
              />
            ) : (
              <FiEdit
                className="outletHeaderIcon"
                onClick={() => setEditMode(!editMode)}
              />
            )}
          </>
        )}
      </div>
      <ul className="infoList">
        <div className="info">
          <div className="infoFlex">
            <p className="infoTitle">Name</p>
            <BiUserCircle className="infoIcon" />
          </div>
          {editMode ? (
            <AppInput
              type="text"
              id="fullName"
              name="fullName"
              version="formInput"
              required={true}
              value={editedValue.fullName}
              onChange={handleInputChange}
            />
          ) : (
            <p className="infoValue">{editedValue.fullName || "..."}</p>
          )}
        </div>
        <div className="info">
          <div className="infoFlex">
            <p className="infoTitle">Email</p>
            <HiMail className="infoIcon" />
          </div>
          {editMode ? (
            <AppInput
              type="text"
              id="email"
              name="email"
              version="formInput"
              required={true}
              value={editedValue.email}
              onChange={handleInputChange}
            />
          ) : (
            <p className="infoValue">{editedValue.email || "..."}</p>
          )}
        </div>
        <div className="info">
          <div className="infoFlex">
            <p className="infoTitle">Phone</p>
            <BiPhone className="infoIcon" />
          </div>
          {editMode ? (
            <AppInput
              type="text"
              id="phone"
              name="phone"
              version="formInput"
              required={true}
              value={editedValue.phone}
              onChange={handleInputChange}
            />
          ) : (
            <p className="infoValue">{editedValue.phone || "..."}</p>
          )}
        </div>
        <div className="info">
          <div className="infoFlex">
            <p className="infoTitle">Country/Region</p>
            <BiWorld className="infoIcon" />
          </div>
          {editMode ? (
            <AppInput
              type="text"
              id="country"
              name="country"
              version="formInput"
              required={true}
              value={editedValue.country}
              onChange={handleInputChange}
            />
          ) : (
            <p className="infoValue">{editedValue.country || "..."}</p>
          )}
        </div>
        <div className="info">
          <div className="infoFlex">
            <p className="infoTitle">Address</p>
            <HiLocationMarker className="infoIcon" />
          </div>
          {editMode ? (
            <AppInput
              type="text"
              id="address"
              name="address"
              version="formInput"
              required={true}
              value={editedValue.address}
              onChange={handleInputChange}
            />
          ) : (
            <p className="infoValue">{editedValue.address || "..."}</p>
          )}
        </div>
        <div className="info">
          <div className="infoFlex">
            <p className="infoTitle">City</p>
            <BiLandscape className="infoIcon" />
          </div>
          {editMode ? (
            <AppInput
              type="text"
              id="city"
              name="city"
              version="formInput"
              required={true}
              value={editedValue.city}
              onChange={handleInputChange}
            />
          ) : (
            <p className="infoValue">{editedValue.city || "..."}</p>
          )}
        </div>
        <div className="info">
          <div className="infoFlex">
            <p className="infoTitle">State</p>
            <BiLocationPlus className="infoIcon" />
          </div>
          {editMode ? (
            <AppInput
              type="text"
              id="state"
              name="state"
              version="formInput"
              required={true}
              value={editedValue.stateRegion}
              onChange={handleInputChange}
            />
          ) : (
            <p className="infoValue">{editedValue.stateRegion || "..."}</p>
          )}
        </div>
        <div className="info">
          <div className="infoFlex">
            <p className="infoTitle">Postcode</p>
            <BiFlag className="infoIcon" />
          </div>
          {editMode ? (
            <AppInput
              type="text"
              id="postcode"
              name="postcode"
              version="formInput"
              required={true}
              value={editedValue.postcode}
              onChange={handleInputChange}
            />
          ) : (
            <p className="infoValue">{editedValue.postcode || "..."}</p>
          )}
        </div>
      </ul>
    </div>
  );
}
