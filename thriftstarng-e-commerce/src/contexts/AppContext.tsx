import {
  FormEvent,
  ReactElement,
  createContext,
  useEffect,
  useReducer,
} from "react";
import { AppReducer } from "../reducers/AppReducer";
import { CartType, UseAppContextType } from "../Types";
import { REDUCER_ACTION_TYPES } from "../reducers/ReducerActionsTypes";
import axios from "axios";
import moment from "moment";
import { INITIAL_STATE } from "../reducers/InitialState";

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
    userInfo,
    wishList,
    signInInputs,
    signUpInputs,
    pageTitle,
    openClose,
  } = state;

  //Get Products
  async function getProducts() {
    try {
      dispatch({
        type: REDUCER_ACTION_TYPES.LOADING,
        payload: true,
      });
      const { data } = await axios.get("http://localhost:3000/api/products");
      dispatch({
        type: REDUCER_ACTION_TYPES.GET_PRODUCTS_LIST,
        payload: data,
      });
      dispatch({
        type: REDUCER_ACTION_TYPES.LOADING,
        payload: false,
      });
    } catch (error: any) {
      console.log(error.message);
    }
  }

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

  //Add to Cart
  async function addToCart(qty: Number, id: String) {
    const { data } = await axios.get(
      `http://localhost:3000/api/products/${id}`
    );

    if (cartList.find((item) => item.product === id)) {
      //DO already added alert and icon should change
    } else {
      //DO added alert alert and icon should change
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
    }
  }

  //Add to Wishlist
  async function addToWish(qty: Number, id: String) {
    const { data } = await axios.get(
      `http://localhost:3000/api/products/${id}`
    );

    if (wishList.find((item) => item.product === id)) {
      //DO already added alert and icon should change
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
    }
  }

  //SingUp
  async function signUp(e: FormEvent) {
    e.preventDefault();

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
        "http://localhost:3000/api/users",
        {
          name: signUpInputs.name,
          email: signUpInputs.email,
          password: signUpInputs.password,
        },
        config
      );

      dispatch({ type: REDUCER_ACTION_TYPES.GET_USER_INFO, payload: data });
      dispatch({ type: REDUCER_ACTION_TYPES.LOADING, payload: false });
    } catch (error: any) {
      console.log(error.message);
      dispatch({ type: REDUCER_ACTION_TYPES.LOADING, payload: false });
    }
  }

  //SingIn
  async function signIn(e: FormEvent) {
    e.preventDefault();

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
        "http://localhost:3000/api/users/signIn",
        {
          email: signInInputs.email,
          password: signInInputs.password,
        },
        config
      );

      dispatch({ type: REDUCER_ACTION_TYPES.GET_USER_INFO, payload: data });
      dispatch({
        type: REDUCER_ACTION_TYPES.LOADING,
        payload: false,
      });
    } catch (error: any) {
      console.log(error.message);
      dispatch({ type: REDUCER_ACTION_TYPES.LOADING, payload: false });
    }
  }

  //SingOut
  async function signOut() {
    localStorage.removeItem("userInfo");

    dispatch({ type: REDUCER_ACTION_TYPES.GET_USER_INFO, payload: null });

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

  //Handle Order
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
            name: billingDetails.firstName + " " + billingDetails.lastName,
            email: billingDetails.email,
            phone: billingDetails.phone,
          },
          shippingDetails: {
            name: billingDetails.gift
              ? billingDetails.giftFirstName + " " + billingDetails.giftLastName
              : billingDetails.firstName + " " + billingDetails.lastName,
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
      console.log(data);

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

  function loadMore() {
    dispatch({ type: REDUCER_ACTION_TYPES.PAGENATION });
  }

  async function handleSearch(searchVal: String) {
    dispatch({
      type: REDUCER_ACTION_TYPES.SEARCH_KEYWORD,
      payload: searchVal,
    });

    if (searchVal.length > 2) {
      try {
        dispatch({
          type: REDUCER_ACTION_TYPES.LOADING,
          payload: true,
        });
        const { data } = await axios.get(
          `http://localhost:3000/api/products?s=${searchVal.trim()}`
        );

        dispatch({
          type: REDUCER_ACTION_TYPES.LOADING,
          payload: false,
        });
        dispatch({ type: REDUCER_ACTION_TYPES.SEARCH_RESULT, payload: data });
      } catch (error) {
        dispatch({
          type: REDUCER_ACTION_TYPES.LOADING,
          payload: false,
        });
        console.log(error instanceof Error);
      }
    } else {
      dispatch({ type: REDUCER_ACTION_TYPES.SEARCH_RESULT, payload: [] });
    }
  }

  async function handleFilter() {
    console.log(state.productFilterSort.category);

    try {
      const { data } = await axios.get(
        `http://localhost:3000/api/products?c=${
          state.productFilterSort.category === "All"
            ? ""
            : state.productFilterSort.category
        }&sort=${
          state.productFilterSort.sort === "priceAsc" ||
          state.productFilterSort.sort === "priceDesc"
            ? "price"
            : "createdAt"
        }&order=${state.productFilterSort.sort === "priceAsc" ? 1 : -1}`
      );

      dispatch({ type: REDUCER_ACTION_TYPES.GET_PRODUCTS_LIST, payload: data });
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    //Change page title
    document.title = pageTitle;

    //Add cart list to local storage
    localStorage.setItem("cartList", JSON.stringify(cartList));

    //Add wish list to Local Storage
    localStorage.setItem("wishList", JSON.stringify(wishList));

    //Add user info to Local Storage
    localStorage.setItem("userInfo", JSON.stringify(userInfo));

    //Add billing Details info to Local Storage
    localStorage.setItem("billingDetails", JSON.stringify(billingDetails));

    //Calculate cart total
    dispatch({
      type: REDUCER_ACTION_TYPES.CALC_TOTAL,
      payload: cartList.reduce(
        (accumulator: number, object: CartType): Number => {
          return accumulator + object.qty * object.price;
        },
        0
      ),
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
        getProducts,
        getSingleProduct,
        addToCart,
        addToWish,
        signUp,
        signIn,
        signOut,
        handleBillingDetails,
        handleOrder,
        loadMore,
        handleSearch,
        handleFilter,
      }}
    >
      {children}
    </AppContext.Provider>
  );
}

export default AppContext;
