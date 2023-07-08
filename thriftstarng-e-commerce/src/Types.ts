import { FormEvent } from "react";
import { ActionTypes } from "./reducers/ReducerActionsTypes";

export interface ProductType {
  _id: string;
  color: String;
  description: String;
  image: string;
  name: String;
  price: number;
  size: String;
  stockCount: number;
}

export type CartType = {
  _id: string;
  color: String;
  description: String;
  image: string;
  name: String;
  price: number;
  size: String;
  stockCount: number;
  product: String;
  qty: number;
};

export interface INITIAL_STATE_TYPES {
  products: ProductType[];
  singleProduct: ProductType;
  cartList: CartType[];
  wishList: CartType[];
  qtySelected: number;
  isLoading: boolean;
  openClose: {
    isNavMenuOpen: boolean;
    isSearchOpen: boolean;
    isMenuOpen: boolean;
    isCartOpen: boolean;
    isOrderSummaryOpen: boolean;
    isBillingDetailsOpen: boolean;
    isPaymentOpen: boolean;
    isOrderCompleteOpen: boolean;
    isFilterOpen: boolean;
    isAlertOpen: boolean;
  };
  pageTitle: String;
  countryList: string[];
  billingDetails: {
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    country: string;
    address: string;
    city: string;
    state: string;
    postcode: string;
    createAccount: boolean;
    gift: boolean;
    orderNote: string;
    giftFirstName?: string;
    giftLastName?: string;
    giftCountry?: string;
    giftAddress?: string;
    giftCity?: string;
    giftState?: string;
    giftPostcode?: string;
  };
  cartAmounts: {
    itemsAmount: number;
    shippingFee: number;
    tax: number;
    totalAmount: number;
  };
  signUpInputs: {
    name: string;
    email: string;
    password: string;
  };
  signInInputs: {
    email: string;
    password: string;
  };
  userInfo: {
    _id: string;
    name: string;
    email: string;
    isAdmin: boolean;
    token: string;
  };
  isPasswordShown: boolean;
  pagenation: number;
  errorMsg: String;
  searchKeyword: string;
  searchResult: ProductType[];
  productFilterSort: {
    category: String;
    sort: String;
  };
  alertMessage: String;
}

export interface OrderInfoTypes {
  _id: string;
  orderItems: CartType[];
  userInfo: {
    name: string;
    email: string;
    phone: string;
  };
  userId: string;
  shippingDetails: {
    name: string;
    address: string;
    city: string;
    state: string;
    country: string;
    postcode: string;
    orderNote: string;
  };
  itemsAmount: number;
  shippingFee: number;
  tax: number;
  totalAmount: number;
  isPaid: boolean;
  paidAt: number;
}

export type UseAppContextType = {
  state: INITIAL_STATE_TYPES;
  dispatch: React.Dispatch<ActionTypes>;
  pathMatch: (route: string) => boolean;
  getProducts: () => void;
  getSingleProduct: (id: String | undefined) => void;
  addToCart: (qty: Number, id: String) => void;
  addToWish: (qty: Number, id: String) => void;
  signUp: (e: FormEvent) => void;
  signIn: (e: FormEvent) => void;
  getProfile: () => void;
  signOut: () => void;
  handleBillingDetails: (e: FormEvent) => void;
  handleOrder: (reference: Object) => void;
  handleSearch: (e: String) => void;
  handleFilter: () => void;
};
