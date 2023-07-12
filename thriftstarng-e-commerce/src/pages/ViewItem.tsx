import "../sassStyles/viewItem.scss";
import { useContext, useEffect } from "react";
import AppContext from "../contexts/AppContext";
import { REDUCER_ACTION_TYPES } from "../reducers/ReducerActionsTypes";
import { useParams } from "react-router-dom";
import { INITIAL_STATE } from "../reducers/InitialState";
import Loader from "../components/Loader";
// import { ComboBox, Item } from "@adobe/react-spectrum";
import axios from "axios";

export default function ViewItem() {
  const { state, dispatch, addToCart, addToWish } =
    useContext(AppContext);

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
    async function getSingleProduct(id: String | undefined) {
      try {
        dispatch({
          type: REDUCER_ACTION_TYPES.LOADING,
          payload: true,
        });
        const { data } = await axios.get(
          `http://localhost:3000/api/products/${id}`
        );
        dispatch({
          type: REDUCER_ACTION_TYPES.GET_SINGLE_PRODUCT,
          payload: data,
        });
        dispatch({
          type: REDUCER_ACTION_TYPES.LOADING,
          payload: false,
        });
      } catch (error: any) {
        dispatch({
          type: REDUCER_ACTION_TYPES.ERROR_MSG,
          payload: "Sorry, Product not found",
        });
        dispatch({
          type: REDUCER_ACTION_TYPES.LOADING,
          payload: false,
        });
      }
    }

    getSingleProduct(productId);
  }, [state.pageTitle, dispatch, productId]);

  return (
    <div className="viewItem">
      {state.isLoading ? (
        <Loader />
      ) : Object.keys(state.singleProduct).length === 0 ? (
        <h1 className="errMsg">{state.errorMsg}</h1>
      ) : (
        <>
          <div className="viewItemImage">
            <img src={state.singleProduct.image} alt="gown" />
          </div>
          <div className="viewItemDetails">
            <h1 className="itemTitle">{state.singleProduct.name}</h1>
            <p className="itemDescription">{state.singleProduct.description}</p>
            <div className="tableBtn">
              <ul className="detailsTable">
                <li className="detail">
                  <p className="sizeTitle">Size</p>
                  <h4 className="sizeVal">{state.singleProduct.size}</h4>
                </li>
                <li className="detail">
                  <p className="priceTitle">Price</p>
                  <h4 className="priceVal">#{state.singleProduct.price}</h4>
                </li>
                <li className="detail">
                  <p className="statusTitle">Status</p>
                  <h4 className="statusVal">
                    {state.singleProduct.stockCount > 0 ? "Available" : "Sold"}
                  </h4>
                </li>
              </ul>
              <button
                onClick={() =>
                  addToCart(state.qtySelected, state.singleProduct._id)
                }
                className="viewItemCartBtn"
              >
                Add To Cart
              </button>
              <button
                onClick={() =>
                  addToWish(state.qtySelected, state.singleProduct._id)
                }
                className="viewItemWishBtn"
              >
                Add To Wishlist
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
