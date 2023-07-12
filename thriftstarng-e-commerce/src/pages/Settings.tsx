import { FormEvent, useContext, useState } from "react";
import AppContext from "../contexts/AppContext";
import { HiLockClosed, HiMail } from "react-icons/hi";
import { FiEdit } from "react-icons/fi";
import axios from "axios";
import { REDUCER_ACTION_TYPES } from "../reducers/ReducerActionsTypes";
import Loader from "../components/Loader";
import AppInput from "../components/appInput/AppInput";
import AppButton from "../components/appButton/AppButton";

export default function Settings() {
  const { state, dispatch } = useContext(AppContext);
  const [loading, setLoading] = useState(false);

  //Handle save inputs to state
  const [editedValue, setEditedValue] = useState({
    email: state.userInfo.email,
  });

  //Handle edit profile
  const [editMode, setEditMode] = useState(false);
  async function handleChangeEmail() {
    if (Object.values(editedValue).some((value) => value.length > 0)) {
      try {
        setLoading(true);
        setChangePassMode(!changePassMode);

        const config = {
          headers: {
            Authorization: `Bearer ${state.token}`,
            "Content-Type": "application/json",
          },
        };
        const { data } = await axios.patch(
          `http://localhost:3000/api/users/${state.userInfo._id}/settings/personalInfo`,
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

  //Handle change password
  const [changePassMode, setChangePassMode] = useState(false);
  const [editPassVal, setEditPassVal] = useState({
    currentPass: "",
    newPass: "",
    confirmPass: "",
  });
  async function handleChangePass(e: FormEvent) {
    e.preventDefault();
    try {
      const config = {
        headers: {
          Authorization: `Bearer ${state.token}`,
          "Content-Type": "application/json",
        },
      };
      const { data } = await axios.patch(
        `http://localhost:3000/api/users/${state.userInfo._id}/settings/password`,
        { currentPass: editPassVal.currentPass, newPass: editPassVal.newPass },
        config
      );

      setChangePassMode(false);
      setEditPassVal({
        currentPass: "",
        newPass: "",
        confirmPass: "",
      });

      dispatch({ type: REDUCER_ACTION_TYPES.GET_USER_INFO, payload: data });
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div className="accountOutlet">
      <div className="headerEdit">
        <p className="outletHeader">Settings</p>
        {loading ? (
          <Loader />
        ) : (
          <>
            {editMode ? (
              <div className="saveCancel">
                <AppButton
                  version="textOnly"
                  label="save"
                  onClick={() => {
                    handleChangeEmail();
                    setEditMode(!editMode);
                  }}
                />
                {editedValue.email === state.userInfo.email && (
                  <AppButton
                    version="textOnly"
                    label="cancel"
                    onClick={() => setEditMode(!editMode)}
                  />
                )}
              </div>
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
        <div className="info emailInfo">
          <div className="infoFlex">
            <p className="infoTitle">Email</p>
            <HiMail className="infoIcon" />
          </div>
          {editMode ? (
            <AppInput
              type="text"
              id="dob"
              name="dob"
              version="formInput"
              required={true}
              value={editedValue.email}
              onChange={(e) => setEditedValue({ email: e.target.value })}
              placeholder="Email"
            />
          ) : (
            <p className="infoValue">{editedValue.email}</p>
          )}
        </div>
        <div className="info">
          <div className="infoFlex">
            <p className="infoTitle">Password</p>
            <HiLockClosed className="infoIcon" />
          </div>
          <form className="changePassForm" onSubmit={handleChangePass}>
            <div className={`inputDiv ${changePassMode && "showInputDiv"}`}>
              <div className="inputWraps">
                <AppInput
                  type="password"
                  id="password"
                  name="currentPass"
                  version="formInput"
                  required={true}
                  value={editPassVal.currentPass}
                  onChange={(e) =>
                    setEditPassVal({
                      ...editPassVal,
                      currentPass: e.target.value,
                    })
                  }
                  label="Current Password"
                  showHidePass={true}
                />
                <AppInput
                  type="password"
                  id="newPass"
                  name="newPass"
                  version="formInput"
                  required={true}
                  value={editPassVal.newPass}
                  onChange={(e) =>
                    setEditPassVal({ ...editPassVal, newPass: e.target.value })
                  }
                  label="New Password"
                  showHidePass={true}
                />
                <AppInput
                  type="password"
                  id="confirmPass"
                  name="confirmPass"
                  version="formInput"
                  required={true}
                  pattern={editPassVal.newPass}
                  value={editPassVal.confirmPass}
                  onChange={(e) =>
                    setEditPassVal({
                      ...editPassVal,
                      confirmPass: e.target.value,
                    })
                  }
                  label="Confirm Password"
                  showHidePass={true}
                />
              </div>
            </div>
            {changePassMode ? (
              <div className="saveCancel">
                <AppButton version="textOnly" label="save" />
                <AppButton
                  type="button"
                  version="textOnly"
                  label="cancel"
                  onClick={() => setChangePassMode(!changePassMode)}
                />
              </div>
            ) : (
              <AppButton
                type="button"
                version="textOnly"
                label="Change password"
                onClick={() => setChangePassMode(!changePassMode)}
              />
            )}
          </form>
        </div>
      </ul>
    </div>
  );
}
