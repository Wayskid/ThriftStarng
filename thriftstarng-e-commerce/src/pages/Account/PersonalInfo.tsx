import { ChangeEvent, useContext, useState } from "react";
import "./accountOutlet.scss";
import { AiOutlineContacts } from "react-icons/ai";
import { BiUserCircle, BiWorld } from "react-icons/bi";
import { FiEdit } from "react-icons/fi";
import { BsCalendar } from "react-icons/bs";
import axios from "axios";
import Loader from "../../components/Loader";
import AppButton from "../../components/appButton/AppButton";
import AppInput from "../../components/appInput/AppInput";
import AppContext from "../../contexts/AppContext";
import { REDUCER_ACTION_TYPES } from "../../reducers/ReducerActionsTypes";
import { motion } from "framer-motion";

export default function PersonalInfo() {
  const { state, dispatch } = useContext(AppContext);
  const [loading, setLoading] = useState(false);

  //Handle save inputs to state
  const [editedValue, setEditedValue] = useState({
    name: state.userInfo.name,
    dob: state.userInfo.personalInfo.dob,
    country: state.userInfo.personalInfo.country,
    contact: state.userInfo.personalInfo.phone,
  });
  function handleInputChange(e: ChangeEvent<HTMLInputElement>) {
    setEditedValue({
      ...editedValue,
      [e.target.name]: e.target.value,
    });
  }

  //Handle edit profile
  const [editMode, setEditMode] = useState(false);
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
          `https://thriftstarng.onrender.com/api/users/${state.userInfo._id}/settings/personalInfo`,
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
    <motion.div
      initial={{ translateX: 20 }}
      animate={{ translateX: 0 }} className="accountOutlet">
      <div className="headerEdit">
        <p className="outletHeader">Personal Info</p>
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
              id="name"
              name="name"
              version="formInput"
              required={true}
              value={editedValue.name}
              onChange={handleInputChange}
              placeholder="Name"
            />
          ) : (
            <p className="infoValue">{editedValue.name || "..."}</p>
          )}
        </div>
        <div className="info">
          <div className="infoFlex">
            <p className="infoTitle">Date of Birth</p>
            <BsCalendar className="infoIcon" />
          </div>
          {editMode ? (
            <AppInput
              type="text"
              id="dob"
              name="dob"
              version="formInput"
              required={true}
              value={editedValue.dob}
              onChange={handleInputChange}
              placeholder="DOB"
            />
          ) : (
            <p className="infoValue">{editedValue.dob || "..."}</p>
          )}
        </div>
        <div className="info">
          <div className="infoFlex">
            <p className="infoTitle">Country Region</p>
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
              placeholder="Country"
            />
          ) : (
            <p className="infoValue">{editedValue.country || "..."}</p>
          )}
        </div>
        <div className="info">
          <div className="infoFlex">
            <p className="infoTitle">Contact</p>
            <AiOutlineContacts className="infoIcon" />
          </div>
          {editMode ? (
            <AppInput
              type="text"
              id="contact"
              name="contact"
              version="formInput"
              required={true}
              value={editedValue.contact}
              onChange={handleInputChange}
              placeholder="Contact"
            />
          ) : (
            <p className="infoValue">{editedValue.contact || "..."}</p>
          )}
        </div>
      </ul>
    </motion.div>
  );
}
