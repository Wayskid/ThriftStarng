import "./home.scss";
import { useContext, useEffect, useState } from "react";
import AppContext from "../../contexts/AppContext";
import { REDUCER_ACTION_TYPES } from "../../reducers/ReducerActionsTypes";
import { useNavigate } from "react-router-dom";
import homeImg from "../../assets/blake-connally-CG4GE2c165M-unsplash.jpg";
import AppButton from "../../components/appButton/AppButton";
import { BsFilterLeft } from "react-icons/bs";
import ShopList from "../../components/ShopList";
import SkeletonLoader from "../../components/SkeletonLoader";
import axios from "axios";
import { ProductType } from "../../Types";

export default function Home() {
  const navigate = useNavigate();
  const { state, dispatch } = useContext(AppContext);
  const [result, setResult] = useState<ProductType[]>([] as ProductType[]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    dispatch({
      type: REDUCER_ACTION_TYPES.PAGE_TITLE,
      payload: "Home - ThriftStarng",
    });

    //Get Products
    async function getProducts() {
      try {
        setLoading(true);
        const { data } = await axios.get(
          "https://thriftstarng.onrender.com/api/products"
        );

        setResult(data);
        setLoading(false);
      } catch (error: any) {
        console.log(error.message);
      }
    }

    getProducts();
  }, [state.pageTitle]);

  return (
    <div className="home">
      <div className="showcase">
        <img src={homeImg} alt="woman gold dress" />
        <div className="showcaseDetails">
          <p className="showcaseSmallP">Be the first to checkout our</p>
          <p className="showcaseBigP">New Arrivals</p>
          <AppButton
            version="primaryBtn"
            label={"Shop Now"}
            onClick={() => navigate("/new_arrivals")}
          />
        </div>
      </div>
      <div className="shopSection">
        <div className="shopSectionTop">
          <div className="catSelected">
            <p>ThriftStarng</p>
            <b>{state.productFilterSort.category}</b>
          </div>
          <button
            onClick={() =>
              dispatch({
                type: REDUCER_ACTION_TYPES.OPEN_CLOSE_FILTER,
              })
            }
          >
            Filter
            <span>
              <BsFilterLeft />
            </span>
          </button>
        </div>
        {loading ? (
          <div className="skeletonLoaders">
            <SkeletonLoader />
            <SkeletonLoader />
            <SkeletonLoader />
            <SkeletonLoader />
          </div>
        ) : (
          <ShopList products={result} />
        )}
      </div>
    </div>
  );
}
