import { motion } from "framer-motion";
import { BiCheckCircle } from "react-icons/bi";
import { Link } from "react-router-dom";

export default function OrderComplete() {
  return (
    <div className="orderComplete">
      <div className="receipt">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3, type: "spring", delay: 0.2 }}
        >
          <BiCheckCircle className="orderCompleteIcon" />
        </motion.div>
        <h2>Payment Successful</h2>
        <p>You will get an email with your order details</p>
        <Link to="/" className="toHomeBtn">
          Go to Homepage
        </Link>
      </div>
    </div>
  );
}
