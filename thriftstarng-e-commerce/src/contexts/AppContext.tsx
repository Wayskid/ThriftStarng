import {
  FormEvent,
  ReactElement,
  createContext,
  useEffect,
  useReducer,
} from "react";
import { AppReducer } from "../reducers/AppReducer";
import { UseAppContextType } from "../Types";
import { REDUCER_ACTION_TYPES } from "../reducers/ReducerActionsTypes";
import axios from "axios";
import moment from "moment";
import { INITIAL_STATE } from "../reducers/InitialState";
import { useLocation, useNavigate } from "react-router-dom";

const AppContext = createContext<UseAppContextType>({} as UseAppContextType);

export function AppProvider({
  children,
}: {
  children: ReactElement | undefined;
}): JSX.Element {
  const [state, dispatch] = useReducer(AppReducer, INITIAL_STATE);
  const {
    billingDetails,
    cartList,
    cartAmounts,
    token,
    userInfo,
    wishList,
    pageTitle,
    openClose,
  } = state;
  const navigate = useNavigate();

  // Active Link
  const location = useLocation();
  function pathMatch(route: string): boolean {
    if (route === location.pathname) {
      return true;
    }
    return false;
  }

  //Add to Cart
  async function addToCart(qty: Number, id: String) {
    const { data } = await axios.get(
      `http://localhost:3000/api/products/${id}`
    );

    if (cartList.find((item) => item.product === id)) {
      dispatch({ type: REDUCER_ACTION_TYPES.OPEN_CLOSE_ALERT });
      dispatch({
        type: REDUCER_ACTION_TYPES.ALERT_MESSAGE,
        payload: "Already in Cart",
      });
      setTimeout(() => {
        dispatch({ type: REDUCER_ACTION_TYPES.OPEN_CLOSE_ALERT });
      }, 1000);
    } else {
      dispatch({
        type: REDUCER_ACTION_TYPES.ADD_TO_CART,
        payload: {
          product: data._id,
          name: data.name,
          image: data.image,
          price: data.price,
          color: data.color,
          size: data.size,
          qty,
        },
      });
      dispatch({ type: REDUCER_ACTION_TYPES.OPEN_CLOSE_ALERT });
      dispatch({
        type: REDUCER_ACTION_TYPES.ALERT_MESSAGE,
        payload: "Added to Cart",
      });
      setTimeout(() => {
        dispatch({ type: REDUCER_ACTION_TYPES.OPEN_CLOSE_ALERT });
      }, 1000);
    }
  }

  //Add to Wishlist
  async function addToWish(qty: Number, id: String) {
    const { data } = await axios.get(
      `http://localhost:3000/api/products/${id}`
    );

    if (wishList.find((item) => item.product === id)) {
      dispatch({ type: REDUCER_ACTION_TYPES.OPEN_CLOSE_ALERT });
      dispatch({
        type: REDUCER_ACTION_TYPES.ALERT_MESSAGE,
        payload: "Added to Wishlist",
      });
      setTimeout(() => {
        dispatch({ type: REDUCER_ACTION_TYPES.OPEN_CLOSE_ALERT });
      }, 1000);
    } else {
      //DO added alert alert and icon should change
      dispatch({
        type: REDUCER_ACTION_TYPES.ADD_TO_WISH,
        payload: {
          product: data._id,
          name: data.name,
          image: data.image,
          price: data.price,
          color: data.color,
          size: data.size,
          stockCount: data.stockCount,
          qty,
        },
      });
      dispatch({ type: REDUCER_ACTION_TYPES.OPEN_CLOSE_ALERT });
      dispatch({
        type: REDUCER_ACTION_TYPES.ALERT_MESSAGE,
        payload: "Already in Wishlist",
      });
      setTimeout(() => {
        dispatch({ type: REDUCER_ACTION_TYPES.OPEN_CLOSE_ALERT });
      }, 1000);
    }
  }

  //Get user profile
  async function getProfile() {
    try {
      dispatch({
        type: REDUCER_ACTION_TYPES.LOADING,
        payload: true,
      });

      const config = {
        headers: {
          Authorization: `Bearer ${state.token}`,
        },
      };

      const { data } = await axios.get(
        `http://localhost:3000/api/users/${state.userInfo._id}`,
        config
      );

      dispatch({ type: REDUCER_ACTION_TYPES.GET_USER_INFO, payload: data });
      dispatch({
        type: REDUCER_ACTION_TYPES.LOADING,
        payload: false,
      });
    } catch (error) {
      console.log(error);
      dispatch({ type: REDUCER_ACTION_TYPES.LOADING, payload: false });
    }
  }

  //SignOut
  async function signOut() {
    localStorage.removeItem("userInfo");
    localStorage.removeItem("token");

    dispatch({ type: REDUCER_ACTION_TYPES.GET_USER_INFO, payload: {} });
    dispatch({ type: REDUCER_ACTION_TYPES.GET_TOKEN, payload: "" });
    dispatch({ type: REDUCER_ACTION_TYPES.CLEAR_PASSWORD_INPUT });
  }

  //Handle Billing Details
  function handleBillingDetails(e: FormEvent) {
    e.preventDefault();
    const paymentDiv = document.querySelector(".payment");

    paymentDiv?.scrollIntoView({
      behavior: "smooth",
      block: "end",
      inline: "nearest",
    });

    dispatch({
      type: REDUCER_ACTION_TYPES.OPEN_CLOSE_BILLING_DET,
      payload: false,
    });
    dispatch({
      type: REDUCER_ACTION_TYPES.OPEN_CLOSE_PAYMENT,
      payload: true,
    });
  }

  //Create Order
  async function handleOrder(reference: any) {
    try {
      dispatch({
        type: REDUCER_ACTION_TYPES.LOADING,
        payload: true,
      });
      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };

      const { data } = await axios.post(
        "http://localhost:3000/api/orders",
        {
          orderItems: cartList,
          userInfo: {
            name: billingDetails.fullName,
            email: billingDetails.email,
            phone: billingDetails.phone,
          },
          userId: userInfo._id,
          shippingDetails: {
            name: billingDetails.gift
              ? billingDetails.giftFullName
              : billingDetails.fullName,
            address: billingDetails.gift
              ? billingDetails.giftAddress
              : billingDetails.address,
            city: billingDetails.gift
              ? billingDetails.giftCity
              : billingDetails.city,
            state: billingDetails.gift
              ? billingDetails.giftState
              : billingDetails.state,
            country: billingDetails.gift
              ? billingDetails.giftCountry
              : billingDetails.country,
            postcode: billingDetails.gift
              ? billingDetails.giftPostcode
              : billingDetails.postcode,
            orderNote: billingDetails.orderNote,
          },
          itemsAmount: cartAmounts.itemsAmount,
          shippingFee: cartAmounts.shippingFee,
          tax: cartAmounts.tax,
          totalAmount: cartAmounts.totalAmount,
          isPaid: reference.status === "success" && true,
          paidAt: moment().format("Do MMM YYYY"),
        },
        config
      );

      navigate(`/orders/${data._id}`);

      dispatch({
        type: REDUCER_ACTION_TYPES.OPEN_CLOSE_PAYMENT,
        payload: false,
      });

      dispatch({
        type: REDUCER_ACTION_TYPES.OPEN_CLOSE_ORDER_COMPLETE,
        payload: true,
      });

      dispatch({
        type: REDUCER_ACTION_TYPES.LOADING,
        payload: false,
      });

      setTimeout(() => {
        dispatch({ type: REDUCER_ACTION_TYPES.CLEAR_CART });

        localStorage.removeItem("cartItems");
      }, 3000);
    } catch (error) {
      console.log(error);
    }
  }

  //Handle Filter
  async function handleFilter() {
    try {
      const { data } = await axios.get(
        `http://localhost:3000/api/products?c=${
          state.productFilterSort.category === "All"
            ? ""
            : state.productFilterSort.category
        }&sort=${
          state.productFilterSort.sort === "priceAsc" || "priceDesc"
            ? "price"
            : "createdAt"
        }&order=${state.productFilterSort.sort === "priceDesc" ? -1 : 1}`
      );

      dispatch({ type: REDUCER_ACTION_TYPES.GET_PRODUCTS_LIST, payload: data });
    } catch (error) {
      console.log(error);
    }
  }

  //UseEffects
  useEffect(() => {
    //Change page title
    document.title = pageTitle;

    //Add cart list to local storage
    localStorage.setItem("cartList", JSON.stringify(cartList));

    //Add wish list to Local Storage
    localStorage.setItem("wishList", JSON.stringify(wishList));

    //Add user info to Local Storage
    localStorage.setItem("userInfo", JSON.stringify(userInfo));

    //Add token to Local Storage
    localStorage.setItem("token", JSON.stringify(token));

    //Add billing Details info to Local Storage
    localStorage.setItem("billingDetails", JSON.stringify(billingDetails));

    //Calculate cart total
    let total = 0;
    state.cartList.forEach((item) => {
      total += item.qty * item.price;
    });
    dispatch({
      type: REDUCER_ACTION_TYPES.CALC_TOTAL,
      payload: total,
    });

    //Body Scroll
    if (
      openClose.isCartOpen ||
      openClose.isMenuOpen ||
      openClose.isSearchOpen ||
      openClose.isFilterOpen
    ) {
      document.body.style.overflowY = "hidden";
    } else {
      document.body.style.overflowY = "unset";
    }
  }, [
    pageTitle,
    cartList,
    wishList,
    userInfo,
    billingDetails,
    openClose,
    dispatch,
  ]);

  return (
    <AppContext.Provider
      value={{
        state,
        dispatch,
        pathMatch,
        addToCart,
        addToWish,
        getProfile,
        signOut,
        handleBillingDetails,
        handleOrder,
        handleFilter,
      }}
    >
      {children}
    </AppContext.Provider>
  );
}

export default AppContext;
