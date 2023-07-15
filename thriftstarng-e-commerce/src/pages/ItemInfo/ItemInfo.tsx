import "./itemInfo.scss";
import { useContext, useEffect, useState } from "react";
import AppContext from "../../contexts/AppContext";
import { REDUCER_ACTION_TYPES } from "../../reducers/ReducerActionsTypes";
import { useParams } from "react-router-dom";
import axios, { AxiosError } from "axios";
import AppButton from "../../components/appButton/AppButton";
import { ProductType } from "../../Types";
import ItemInfoLoader from "../../components/skeletonLoaders/ItemInfoLoader";
import AppInputSelect from "../../components/appInput/AppInputSelect";

export default function ItemInfo() {
  const { state, dispatch, addToCart, addToWish } = useContext(AppContext);
  const [itemQty, setItemQty] = useState(0);
  const [itemInfo, setItemInfo] = useState<ProductType>({} as ProductType);
  const [loading, setLoading] = useState(true);
  const [errMsg, setErrMsg] = useState("");

  const { productId } = useParams();

  useEffect(() => {
    loading && setErrMsg("");
  }, [loading]);

  useEffect(() => {
    dispatch({
      type: REDUCER_ACTION_TYPES.PAGE_TITLE,
      payload: "View Item - ThriftStarng",
    });

    //Get single product
    async function getSingleProduct() {
      try {
        setLoading(true);
        const { data } = await axios.get(
          `https://thriftstarng.onrender.com/api/products/${productId}`
        );
        setItemInfo(data);
        setLoading(false);
      } catch (error) {
        if (error instanceof AxiosError) {
          setErrMsg(error?.response?.data);
        }
        setLoading(false);
      }
    }

    getSingleProduct();
  }, [state.pageTitle, dispatch, productId]);

  return (
    <div className="itemInfo">
      {errMsg ? (
        <p style={{ color: "grey", marginInline: "auto", fontSize: 40, marginTop: 80 }}>
          {errMsg}
        </p>
      ) : loading ? (
        <ItemInfoLoader />
      ) : (
        <>
          <div className="itemInfoImage">
            <img src={itemInfo.image} alt="gown" />
          </div>
          <div className="itemInfoDetails">
            <h1 className="itemTitle">{itemInfo.name}</h1>
            <p className="itemDescription">{itemInfo.description}</p>
            <div className="tableBtn">
              <ul className="detailsTable">
                <li className="detail">
                  <p className="sizeTitle">Size</p>
                  <h4 className="sizeVal">{itemInfo.size}</h4>
                </li>
                <li className="detail">
                  <p className="priceTitle">Price</p>
                  <h4 className="priceVal">#{itemInfo.price}</h4>
                </li>
                <li className="detail">
                  <p className="priceTitle">Quantity</p>
                  <AppInputSelect
                    version="stock"
                    list={[...Array(itemInfo.stockCount).keys()]}
                    value={itemQty.toString()}
                    name="qty"
                    onChange={(e) => setItemQty(Number(e.target.value))}
                  />
                </li>
                <li className="detail">
                  <p className="statusTitle">Status</p>
                  <h4 className="statusVal">
                    {itemInfo.stockCount > 0 ? "Available" : "Sold"}
                  </h4>
                </li>
              </ul>
              <AppButton
                version="primaryBtn"
                label="Add To Cart"
                onClick={() => addToCart(itemQty, itemInfo._id)}
              />
              <AppButton
                version="secondaryBtn"
                label="Add To Wishlist"
                onClick={() => addToWish(itemQty, itemInfo._id)}
              />
            </div>
          </div>
        </>
      )}
    </div>
  );
}
