import { BsXCircle } from "react-icons/bs";
import "../sassStyles/alerts.scss";
import { motion } from "framer-motion";
import { useContext } from "react";
import AppContext from "../contexts/AppContext";

export default function Alerts() {
  const { state, } = useContext(AppContext);

  const alertAnim = {
    showAlert: {
      translateY: 0,
      opacity: 1,
      transition: {
        type: "spring",
        duration: 1,
        bounce: 0,
        delay: 0.1,
      },
    },

    hideAlert: {
      opacity: 0,
      translateY: -5,
      transition: {
        type: "spring",
        restSpeed: 0.5,
      },
    },
  };

  return (
    <motion.div
      className="alerts"
      variants={alertAnim}
      animate={state.openClose.isAlertOpen ? "showAlert" : "hideAlert"}
    >
      <p>{state.alertMessage}</p>
      <button className="closeAlertBtn">
        <BsXCircle />
      </button>
    </motion.div>
  );
}
