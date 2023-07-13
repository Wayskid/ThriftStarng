import "./itemInfo.scss";
import { useContext, useEffect, useState } from "react";
import AppContext from "../../contexts/AppContext";
import { REDUCER_ACTION_TYPES } from "../../reducers/ReducerActionsTypes";
import { useParams } from "react-router-dom";
import { INITIAL_STATE } from "../../reducers/InitialState";
// import { ComboBox, Item } from "@adobe/react-spectrum";
import axios from "axios";
import AppButton from "../../components/appButton/AppButton";
import { ProductType } from "../../Types";
import ItemInfoLoader from "../../components/skeletonLoaders/ItemInfoLoader";

export default function ItemInfo() {
  const { state, dispatch, addToCart, addToWish } = useContext(AppContext);
  const [itemInfo, setItemInfo] = useState<ProductType>({} as ProductType);
  const [loading, setLoading] = useState(true);

  const { productId } = useParams();

  useEffect(() => {
    dispatch({
      type: REDUCER_ACTION_TYPES.PAGE_TITLE,
      payload: "View Item - ThriftStarng",
    });

    dispatch({
      type: REDUCER_ACTION_TYPES.QTY_SELECTED,
      payload: INITIAL_STATE.qtySelected,
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
        console.log(error);
        setLoading(false);
      }
    }

    getSingleProduct();
  }, [state.pageTitle, dispatch, productId]);

  return (
    <div className="itemInfo">
      {loading ? (
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
                  <p className="statusTitle">Status</p>
                  <h4 className="statusVal">
                    {itemInfo.stockCount > 0 ? "Available" : "Sold"}
                  </h4>
                </li>
              </ul>
              <AppButton
                version="primaryBtn"
                label="Add To Cart"
                onClick={() => addToCart(state.qtySelected, itemInfo._id)}
              />
              <AppButton
                version="secondaryBtn"
                label="Add To Wishlist"
                onClick={() => addToWish(state.qtySelected, itemInfo._id)}
              />
            </div>
          </div>
        </>
      )}
    </div>
  );
}
