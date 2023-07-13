import { ChangeEvent, useContext, useEffect } from "react";
import AppContext from "../../contexts/AppContext";
import axios from "axios";
import { REDUCER_ACTION_TYPES } from "../../reducers/ReducerActionsTypes";
import GiftBillingDetails from "./GiftBillingDetails";
import { ComboBox, Item } from "../../components/react-aria/MySelect";
import AppInput from "../../components/appInput/AppInput";
import AppButton from "../../components/appButton/AppButton";

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
        <AppInput
          type="text"
          id="fullName"
          name="fullName"
          version="formInput"
          required={true}
          value={state.billingDetails.fullName}
          onChange={(e: ChangeEvent<HTMLInputElement>) => {
            dispatch({
              type: REDUCER_ACTION_TYPES.BILLING_DETAILS,
              field: e.target.name,
              payload: e.target.value,
            });
          }}
          label="Full Name"
        />
        <div className="inputFlexNames">
          <AppInput
            type="text"
            id="email"
            name="email"
            version="formInput"
            required={true}
            value={state.billingDetails.email}
            onChange={(e: ChangeEvent<HTMLInputElement>) => {
              dispatch({
                type: REDUCER_ACTION_TYPES.BILLING_DETAILS,
                field: e.target.name,
                payload: e.target.value,
              });
            }}
            label="Email"
          />
          <AppInput
            type="text"
            id="phone"
            name="phone"
            version="formInput"
            required={true}
            value={state.billingDetails.phone}
            onChange={(e: ChangeEvent<HTMLInputElement>) => {
              dispatch({
                type: REDUCER_ACTION_TYPES.BILLING_DETAILS,
                field: e.target.name,
                payload: e.target.value,
              });
            }}
            label="Phone"
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
        <AppInput
          type="text"
          id="address"
          name="address"
          version="formInput"
          required={true}
          value={state.billingDetails.address}
          onChange={(e: ChangeEvent<HTMLInputElement>) => {
            dispatch({
              type: REDUCER_ACTION_TYPES.BILLING_DETAILS,
              field: e.target.name,
              payload: e.target.value,
            });
          }}
          label="Address"
        />
        <div className="inputFlex">
          <AppInput
            type="text"
            id="city"
            name="city"
            version="formInput"
            required={true}
            value={state.billingDetails.city}
            onChange={(e: ChangeEvent<HTMLInputElement>) => {
              dispatch({
                type: REDUCER_ACTION_TYPES.BILLING_DETAILS,
                field: e.target.name,
                payload: e.target.value,
              });
            }}
            label="Town / City"
          />
          <AppInput
            type="text"
            id="state"
            name="state"
            version="formInput"
            required={true}
            value={state.billingDetails.state}
            onChange={(e: ChangeEvent<HTMLInputElement>) => {
              dispatch({
                type: REDUCER_ACTION_TYPES.BILLING_DETAILS,
                field: e.target.name,
                payload: e.target.value,
              });
            }}
            label="State / Province"
          />
          <AppInput
            type="text"
            id="postcode"
            name="postcode"
            version="formInput"
            required={true}
            value={state.billingDetails.postcode}
            onChange={(e: ChangeEvent<HTMLInputElement>) => {
              dispatch({
                type: REDUCER_ACTION_TYPES.BILLING_DETAILS,
                field: e.target.name,
                payload: e.target.value,
              });
            }}
            label="Postcode"
          />
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
          <AppButton version="primaryBtn" label="Save and Continue" />
        </div>
      </div>
    </form>
  );
}
