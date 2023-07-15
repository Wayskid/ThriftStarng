import { useContext, useEffect, useState } from "react";
import "./account.scss";
import { Link, Outlet } from "react-router-dom";
import { AiOutlineSetting, AiOutlineUser } from "react-icons/ai";
import { BiDetail, BiEdit, BiX } from "react-icons/bi";
import { BsReceiptCutoff } from "react-icons/bs";
import AppContext from "../../contexts/AppContext";
import AppButton from "../../components/appButton/AppButton";
import axios from "axios";
import { REDUCER_ACTION_TYPES } from "../../reducers/ReducerActionsTypes";

export default function Account() {
  const { state, dispatch, pathMatch } = useContext(AppContext);
  const [imgUpload, setImgUpload] = useState<FileList | null>(null);
  const [imgPreview, setImgPreview] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (imgUpload) {
      const imgFile = imgUpload![0];
      setImgPreview(URL.createObjectURL(imgFile));
    }
  }, [imgUpload]);

  async function handleUpdateProfilePic() {
    try {
      if (imgPreview) {
        setLoading(true);

        const config = {
          headers: {
            Authorization: `Bearer ${state.token}`,
            "Content-Type": "application/json",
          },
        };

        const imgData = new FormData();
        imgData.append("file", imgUpload![0]);
        imgData.append("upload_preset", "ThriftStarng");
        imgData.append("cloud_name", import.meta.env.VITE_CLOUD_NAME);

        await axios
          .post(
            `https://api.cloudinary.com/v1_1/${
              import.meta.env.VITE_CLOUD_NAME
            }/image/upload`,
            imgData
          )
          .then((res) => {
            axios
              .patch(
                `https://thriftstarng.onrender.com/api/users/${state.userInfo._id}/settings/profilePic`,
                { newImg: res.data.secure_url },
                config
              )
              .then((result) => {
                dispatch({
                  type: REDUCER_ACTION_TYPES.GET_USER_INFO,
                  payload: result.data,
                });
                setLoading(false);
                setImgPreview("");
                setImgUpload(null);
              });
          });
      }
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  }

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

              <label htmlFor="accountImg" className="accountImgLabel">
                <BiEdit className="imgEditIcon" />
              </label>

              <input
                type="file"
                className="accountImgInput"
                id="accountImg"
                onChange={(e) => setImgUpload(e.target.files)}
                accept="image/*"
              />
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

      {imgPreview && (
        <div className="imgPreviewDialog">
          <div className="imgPreview">
            <img src={imgPreview} />
            <AppButton
              version="primaryBtn"
              label="Save"
              onClick={handleUpdateProfilePic}
              isLoading={loading}
            />
            <BiX
              className="imgPreviewDialogIcon"
              onClick={() => {
                setImgPreview("");
                setImgUpload(null);
              }}
            />
          </div>
        </div>
      )}
    </div>
  );
}
