import { INITIAL_STATE_TYPES } from "../Types";
import { ActionTypes, REDUCER_ACTION_TYPES } from "./ReducerActionsTypes";

export function AppReducer(state: INITIAL_STATE_TYPES, action: ActionTypes) {
  switch (action.type) {
    case REDUCER_ACTION_TYPES.GET_PRODUCTS_LIST:
      return {
        ...state,
        products: action.payload,
      };
    case REDUCER_ACTION_TYPES.GET_SINGLE_PRODUCT:
      return {
        ...state,
        singleProduct: action.payload,
      };
    case REDUCER_ACTION_TYPES.QTY_SELECTED:
      return {
        ...state,
        qtySelected: action.payload,
      };
    case REDUCER_ACTION_TYPES.ADD_TO_CART:
      return {
        ...state,
        cartList: [...state.cartList, action.payload],
      };
    case REDUCER_ACTION_TYPES.DELETE_FROM_CART:
      return {
        ...state,
        cartList: state.cartList.filter(
          (cartItem) => cartItem.product !== action.payload
        ),
      };
    case REDUCER_ACTION_TYPES.ADD_TO_WISH:
      return {
        ...state,
        wishList: [...state.wishList, action.payload],
      };
    case REDUCER_ACTION_TYPES.DELETE_FROM_WISH:
      return {
        ...state,
        wishList: state.wishList.filter(
          (wishItem) => wishItem.product !== action.payload
        ),
      };
    case REDUCER_ACTION_TYPES.LOADING:
      return {
        ...state,
        isLoading: action.payload,
      };
    case REDUCER_ACTION_TYPES.PAGE_TITLE:
      return {
        ...state,
        pageTitle: action.payload,
      };
    case REDUCER_ACTION_TYPES.COUNTRY_LIST:
      return {
        ...state,
        countryList: action.payload,
      };
    case REDUCER_ACTION_TYPES.BILLING_DETAILS:
      return {
        ...state,
        billingDetails: {
          ...state.billingDetails,
          [action.field]: action.payload,
        },
      };
    case REDUCER_ACTION_TYPES.SIGNUP_INPUTS:
      return {
        ...state,
        signUpInputs: {
          ...state.signUpInputs,
          [action.field]: action.payload,
        },
      };
    case REDUCER_ACTION_TYPES.SIGNIN_INPUTS:
      return {
        ...state,
        signInInputs: {
          ...state.signInInputs,
          [action.field]: action.payload,
        },
      };
    case REDUCER_ACTION_TYPES.GET_USER_INFO:
      return {
        ...state,
        userInfo: action.payload,
      };
    case REDUCER_ACTION_TYPES.CLEAR_PASSWORD_INPUT:
      return {
        ...state,
        signInInputs: {
          ...state.signInInputs,
          password: "",
        },
      };
    case REDUCER_ACTION_TYPES.SHOW_HIDE_PASSWORD:
      return {
        ...state,
        isPasswordShown: !state.isPasswordShown,
      };
    case REDUCER_ACTION_TYPES.CALC_TOTAL:
      return {
        ...state,
        cartAmounts: {
          ...state.cartAmounts,
          itemsAmount: action.payload,
          totalAmount:
            state.cartAmounts.itemsAmount +
            state.cartAmounts.shippingFee +
            state.cartAmounts.tax,
        },
      };
    case REDUCER_ACTION_TYPES.OPEN_CLOSE_NAVMENU:
      return {
        ...state,
        openClose: {
          ...state.openClose,
          isNavMenuOpen: !state.openClose.isNavMenuOpen,
        },
      };
    case REDUCER_ACTION_TYPES.CLOSE_NAVMENU:
      return {
        ...state,
        openClose: {
          ...state.openClose,
          isNavMenuOpen: false,
        },
      };
    case REDUCER_ACTION_TYPES.OPEN_CLOSE_SEARCH:
      return {
        ...state,
        openClose: {
          ...state.openClose,
          isSearchOpen: !state.openClose.isSearchOpen,
        },
      };
    case REDUCER_ACTION_TYPES.CLOSE_SEARCH:
      return {
        ...state,
        openClose: {
          ...state.openClose,
          isSearchOpen: false,
        },
      };
    case REDUCER_ACTION_TYPES.OPEN_CLOSE_MENU:
      return {
        ...state,
        openClose: {
          ...state.openClose,
          isMenuOpen: !state.openClose.isMenuOpen,
        },
      };
    case REDUCER_ACTION_TYPES.CLOSE_MENU:
      return {
        ...state,
        openClose: {
          ...state.openClose,
          isMenuOpen: false,
        },
      };
    case REDUCER_ACTION_TYPES.OPEN_CLOSE_CART:
      return {
        ...state,
        openClose: {
          ...state.openClose,
          isCartOpen: !state.openClose.isCartOpen,
        },
      };
    case REDUCER_ACTION_TYPES.CLOSE_CART:
      return {
        ...state,
        openClose: {
          ...state.openClose,
          isCartOpen: false,
        },
      };
    case REDUCER_ACTION_TYPES.OPEN_CLOSE_ORDER_SUMMARY:
      return {
        ...state,
        openClose: {
          ...state.openClose,
          isOrderSummaryOpen: !state.openClose.isOrderSummaryOpen,
        },
      };
    case REDUCER_ACTION_TYPES.CLOSE_ORDER_SUMMARY:
      return {
        ...state,
        openClose: {
          ...state.openClose,
          isOrderSummaryOpen: action.payload,
        },
      };
    case REDUCER_ACTION_TYPES.OPEN_CLOSE_BILLING_DET:
      return {
        ...state,
        openClose: {
          ...state.openClose,
          isBillingDetailsOpen: action.payload,
        },
      };
    case REDUCER_ACTION_TYPES.OPEN_CLOSE_PAYMENT:
      return {
        ...state,
        openClose: {
          ...state.openClose,
          isPaymentOpen: action.payload,
        },
      };
    case REDUCER_ACTION_TYPES.OPEN_CLOSE_ORDER_COMPLETE:
      return {
        ...state,
        openClose: {
          ...state.openClose,
          isOrderCompleteOpen: action.payload,
        },
      };
    case REDUCER_ACTION_TYPES.OPEN_CLOSE_FILTER:
      return {
        ...state,
        openClose: {
          ...state.openClose,
          isFilterOpen: !state.openClose.isFilterOpen,
        },
      };
    case REDUCER_ACTION_TYPES.CLOSE_FILTER:
      return {
        ...state,
        openClose: {
          ...state.openClose,
          isFilterOpen: false,
        },
      };
    case REDUCER_ACTION_TYPES.CLOSE_CART:
      return {
        ...state,
        openClose: {
          ...state.openClose,
          isFilterOpen: false,
        },
      };
    case REDUCER_ACTION_TYPES.CLEAR_CART:
      return {
        ...state,
        cartList: [],
      };
    case REDUCER_ACTION_TYPES.PAGENATION:
      return {
        ...state,
        pagenation: state.pagenation + 10,
      };
    case REDUCER_ACTION_TYPES.ERROR_MSG:
      return {
        ...state,
        errorMsg: action.payload,
      };
    case REDUCER_ACTION_TYPES.SEARCH_KEYWORD:
      return {
        ...state,
        searchKeyword: action.payload,
      };
    case REDUCER_ACTION_TYPES.SEARCH_RESULT:
      return {
        ...state,
        searchResult: action.payload,
      };
    case REDUCER_ACTION_TYPES.CATEGORY:
      return {
        ...state,
        productFilterSort: {
          ...state.productFilterSort,
          [action.field]: action.payload,
        },
      };
    case REDUCER_ACTION_TYPES.SORT:
      return {
        ...state,
        productFilterSort: {
          ...state.productFilterSort,
          [action.field]: action.payload,
        },
      };
    case REDUCER_ACTION_TYPES.CLEAR_FILTER:
      return {
        ...state,
        productFilterSort: {
          category: "",
          sort: "",
        },
      };
    case REDUCER_ACTION_TYPES.OPEN_CLOSE_ALERT:
      return {
        ...state,
        openClose: {
          ...state.openClose,
          isAlertOpen: !state.openClose.isAlertOpen,
        },
      };
    case REDUCER_ACTION_TYPES.CLOSE_ALERT:
      return {
        ...state,
        openClose: {
          ...state.openClose,
          isAlertOpen: false,
        },
      };
    case REDUCER_ACTION_TYPES.ALERT_MESSAGE:
      return {
        ...state,
        alertMessage: action.payload,
      };

    default:
      return state;
  }
}
