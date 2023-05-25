import { ChangeEvent, useContext } from "react";
import AppContext from "../contexts/AppContext";
import { REDUCER_ACTION_TYPES } from "../reducers/ReducerActionsTypes";
import { ComboBox, Item } from "./react-aria/MySelect";

export default function GiftBillingDetails() {
  const { state, dispatch } = useContext(AppContext);

  return (
    <>
      <div className="inputFlexNames">
        <div className="formInputDiv">
          <label className="firstName" htmlFor="giftFirstName">
            First Name
          </label>
          <input
            required
            type="text"
            name="giftFirstName"
            value={state.billingDetails.giftFirstName}
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
          <label htmlFor="giftLastName">Last Name</label>
          <input
            required
            type="text"
            name="giftLastName"
            value={state.billingDetails.giftLastName}
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
      <div className="formInputDiv">
        <label htmlFor="giftAddress">Address</label>
        <input
          required
          type="text"
          name="giftAddress"
          value={state.billingDetails.giftAddress}
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
          <label htmlFor="giftCity">Town / City</label>
          <input
            required
            type="text"
            name="giftCity"
            value={state.billingDetails.giftCity}
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
          <label htmlFor="giftState">State</label>
          <input
            required
            type="text"
            name="giftState"
            value={state.billingDetails.giftState}
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
          <label htmlFor="giftPostcode" className="postcode">
            Postcode
          </label>
          <input
            required
            type="text"
            name="giftPostcode"
            value={state.billingDetails.giftPostcode}
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
    </>
  );
}
