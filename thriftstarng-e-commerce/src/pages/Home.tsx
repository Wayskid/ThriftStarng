import "../sassStyles/home.scss";
import { useContext, useEffect } from "react";
import AppContext from "../contexts/AppContext";
import { REDUCER_ACTION_TYPES } from "../reducers/ReducerActionsTypes";
import { Link } from "react-router-dom";
import ShopSection from "../components/ShopSection";
import homeImg from "../assets/blake-connally-CG4GE2c165M-unsplash.jpg";

export default function Home() {
  const { state, dispatch } = useContext(AppContext);

  useEffect(() => {
    dispatch({
      type: REDUCER_ACTION_TYPES.PAGE_TITLE,
      payload: "Home - ThriftStarng",
    });
  }, [state.pageTitle]);

  return (
    <div className="home">
      <div className="showcase">
        <img src={homeImg} alt="woman gold dress" />
        <div className="showcaseDetails">
          <p className="showcaseSmallP">Be the first to checkout our</p>
          <p className="showcaseBigP">New Arrivals</p>
          <Link to="/new_arrivals">
            <button className="showcaseBtn">Shop Now</button>
          </Link>
        </div>
      </div>
      <ShopSection />
    </div>
  );
}
