import { ChangeEvent, useContext, useEffect } from "react";
import AppContext from "../contexts/AppContext";
import axios from "axios";
import { REDUCER_ACTION_TYPES } from "../reducers/ReducerActionsTypes";
import GiftBillingDetails from "./GiftBillingDetails";
import { ComboBox, Item } from "./react-aria/MySelect";

export default function BillingDetails() {
  const { state, dispatch, handleBillingDetails } = useContext(AppContext);

  //Get List of countries
  useEffect(() => {
    async function getCountryList() {
      const { data } = await axios.get("https://restcountries.com/v3.1/all");
      const list = data
        .sort((a: typeof data, b: typeof data) => {
          if (a.name.common < b.name.common) {
            return -1;
          }
          if (a.name.common > b.name.common) {
            return 1;
          }
          return 0;
        })
        .map((x: typeof data) => x.name.common);

      dispatch({ type: REDUCER_ACTION_TYPES.COUNTRY_LIST, payload: list });
    }

    getCountryList();
  }, []);

  return (
    <form className="billingDetails" onSubmit={handleBillingDetails}>
      <div className="billingDetailsForm">
        <div className="inputFlexNames">
          <div className="formInputDiv">
            <label className="fstName" htmlFor="firstname">
              First Name
            </label>
            <input
              required
              type="text"
              name="firstName"
              value={state.billingDetails.firstName}
              onChange={(e: ChangeEvent<HTMLInputElement>) => {
                console.log(typeof e.target.name);
                dispatch({
                  type: REDUCER_ACTION_TYPES.BILLING_DETAILS,
                  field: e.target.name,
                  payload: e.target.value,
                });
              }}
            />
          </div>
          <div className="formInputDiv">
            <label htmlFor="lastname">Last Name</label>
            <input
              required
              type="text"
              name="lastName"
              value={state.billingDetails.lastName}
              onChange={(e: ChangeEvent<HTMLInputElement>) =>
                dispatch({
                  type: REDUCER_ACTION_TYPES.BILLING_DETAILS,
                  field: e.target.name,
                  payload: e.target.value,
                })
              }
            />
          </div>
        </div>
        <div className="formInputDiv">
          <label htmlFor="email">Email</label>
          <input
            required
            type="email"
            name="email"
            value={state.billingDetails.email}
            onChange={(e: ChangeEvent<HTMLInputElement>) =>
              dispatch({
                type: REDUCER_ACTION_TYPES.BILLING_DETAILS,
                field: e.target.name,
                payload: e.target.value,
              })
            }
          />
        </div>
        <div className="inputFlexNames">
          <div className="formInputDiv">
            <label htmlFor="phone">Phone</label>
            <input
              required
              type="number"
              name="phone"
              value={state.billingDetails.phone}
              onChange={(e: ChangeEvent<HTMLInputElement>) =>
                dispatch({
                  type: REDUCER_ACTION_TYPES.BILLING_DETAILS,
                  field: e.target.name,
                  payload: e.target.value,
                })
              }
            />
          </div>
          <ComboBox
            label="Country / Region"
            name="Country"
            selectedKey={state.billingDetails.country}
            onSelectionChange={(key) =>
              dispatch({
                type: REDUCER_ACTION_TYPES.BILLING_DETAILS,
                field: "country",
                payload: key,
              })
            }
          >
            {state.countryList &&
              state.countryList.map((country) => {
                return <Item key={country}>{country}</Item>;
              })}
          </ComboBox>
        </div>
        <div className="formInputDiv">
          <label htmlFor="address">Address</label>
          <input
            required
            type="text"
            name="address"
            value={state.billingDetails.address}
            onChange={(e: ChangeEvent<HTMLInputElement>) =>
              dispatch({
                type: REDUCER_ACTION_TYPES.BILLING_DETAILS,
                field: e.target.name,
                payload: e.target.value,
              })
            }
          />
        </div>
        <div className="inputFlex">
          <div className="formInputDiv">
            <label htmlFor="city">Town / City</label>
            <input
              required
              type="text"
              name="city"
              value={state.billingDetails.city}
              onChange={(e: ChangeEvent<HTMLInputElement>) =>
                dispatch({
                  type: REDUCER_ACTION_TYPES.BILLING_DETAILS,
                  field: e.target.name,
                  payload: e.target.value,
                })
              }
            />
          </div>
          <div className="formInputDiv">
            <label htmlFor="state">State / Province</label>
            <input
              required
              type="text"
              name="state"
              value={state.billingDetails.state}
              onChange={(e: ChangeEvent<HTMLInputElement>) =>
                dispatch({
                  type: REDUCER_ACTION_TYPES.BILLING_DETAILS,
                  field: e.target.name,
                  payload: e.target.value,
                })
              }
            />
          </div>
          <div className="formInputDiv">
            <label htmlFor="postcode" className="postcode">
              Postcode
            </label>
            <input
              required
              type="text"
              name="postcode"
              value={state.billingDetails.postcode}
              onChange={(e: ChangeEvent<HTMLInputElement>) =>
                dispatch({
                  type: REDUCER_ACTION_TYPES.BILLING_DETAILS,
                  field: e.target.name,
                  payload: e.target.value,
                })
              }
            />
          </div>
        </div>
        <div className="checkAllow">
          <input
            type="checkBox"
            name="createAccount"
            checked={state.billingDetails.createAccount}
            onChange={(e: ChangeEvent<HTMLInputElement>) =>
              dispatch({
                type: REDUCER_ACTION_TYPES.BILLING_DETAILS,
                field: e.target.name,
                payload: e.target.checked,
              })
            }
          />
          <label htmlFor="createAccount">Create an Account</label>
        </div>
        <div className="checkAllow">
          <input
            type="checkBox"
            name="gift"
            checked={state.billingDetails.gift}
            onChange={(e: ChangeEvent<HTMLInputElement>) =>
              dispatch({
                type: REDUCER_ACTION_TYPES.BILLING_DETAILS,
                field: e.target.name,
                payload: e.target.checked,
              })
            }
          />
          <label htmlFor="gift">Ship to a different address</label>
        </div>
        {state.billingDetails.gift && <GiftBillingDetails />}
        <div className="formInputDiv">
          <label htmlFor="orderNote" className="messageLabel">
            Order Notes
          </label>
          <textarea
            name="orderNote"
            rows={6}
            value={state.billingDetails.orderNote}
            onChange={(e: ChangeEvent<HTMLTextAreaElement>) =>
              dispatch({
                type: REDUCER_ACTION_TYPES.BILLING_DETAILS,
                field: e.target.name,
                payload: e.target.value,
              })
            }
          ></textarea>
        </div>
        <div className="billingDetailsBtn">
          <button className="contToPayment">Save and Continue</button>
        </div>
      </div>
    </form>
  );
}
