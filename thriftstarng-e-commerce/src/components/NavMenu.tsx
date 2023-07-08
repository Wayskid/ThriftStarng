import "../sassStyles/navMenu.scss";
import { useContext } from "react";
import { Link } from "react-router-dom";
import AppContext from "../contexts/AppContext";
import { REDUCER_ACTION_TYPES } from "../reducers/ReducerActionsTypes";
import { motion } from "framer-motion";

export default function NavMenu() {
  const { getProfile, signOut, dispatch } = useContext(AppContext);
  return (
    <motion.div
      initial={{ opacity: 0, translateY: -20 }}
      animate={{ opacity: 1, translateY: 0 }}
      className="navMenu"
    >
      <Link
        to="/account"
        onClick={() => {
          getProfile();
          dispatch({ type: REDUCER_ACTION_TYPES.CLOSE_NAVMENU });
        }}
      >
        Account
      </Link>
      <Link
        to="/signIn"
        onClick={() => {
          signOut();
          dispatch({ type: REDUCER_ACTION_TYPES.CLOSE_NAVMENU });
        }}
      >
        Sign Out
      </Link>
    </motion.div>
  );
}
