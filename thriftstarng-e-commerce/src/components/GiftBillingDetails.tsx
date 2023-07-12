import { ChangeEvent, useContext } from "react";
import AppContext from "../contexts/AppContext";
import { REDUCER_ACTION_TYPES } from "../reducers/ReducerActionsTypes";
import { ComboBox, Item } from "./react-aria/MySelect";
import AppInput from "./appInput/AppInput";

export default function GiftBillingDetails() {
  const { state, dispatch } = useContext(AppContext);

  return (
    <>
      <AppInput
        type="text"
        id="giftFullName"
        name="giftFullName"
        version="formInput"
        required={true}
        value={state.billingDetails.giftFullName}
        onChange={(e: ChangeEvent<HTMLInputElement>) => {
          dispatch({
            type: REDUCER_ACTION_TYPES.BILLING_DETAILS,
            field: e.target.name,
            payload: e.target.value,
          });
        }}
        label="Full Name"
      />
      <ComboBox
        label="Country / Region"
        name="Country"
        selectedKey={state.billingDetails.giftCountry}
        onSelectionChange={(key) =>
          dispatch({
            type: REDUCER_ACTION_TYPES.BILLING_DETAILS,
            field: "giftCountry",
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
        id="giftAddress"
        name="giftAddress"
        version="formInput"
        required={true}
        value={state.billingDetails.giftAddress}
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
          id="giftCity"
          name="giftCity"
          version="formInput"
          required={true}
          value={state.billingDetails.giftCity}
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
          id="giftState"
          name="giftState"
          version="formInput"
          required={true}
          value={state.billingDetails.giftState}
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
          id="giftPostcode"
          name="giftPostcode"
          version="formInput"
          required={true}
          value={state.billingDetails.giftPostcode}
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
    </>
  );
}
