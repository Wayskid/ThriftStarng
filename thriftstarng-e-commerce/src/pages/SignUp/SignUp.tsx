import "./signup.scss";
import { ChangeEvent, FormEvent, useContext, useEffect, useState } from "react";
import AppContext from "../../contexts/AppContext";
import { REDUCER_ACTION_TYPES } from "../../reducers/ReducerActionsTypes";
import { Link } from "react-router-dom";
import axios from "axios";
import AppButton from "../../components/appButton/AppButton";
import AppInput from "../../components/appInput/AppInput";

export default function SignUp() {
  const { state, dispatch } = useContext(AppContext);
  const { signUpInputs } = state;
  const [loading, setLoading] = useState(false);

  //Page title
  useEffect(() => {
    dispatch({
      type: REDUCER_ACTION_TYPES.PAGE_TITLE,
      payload: "Sign Up - ThriftStarng",
    });
  }, [state.pageTitle]);

  //SingUp
  async function signUp(e: FormEvent) {
    e.preventDefault();

    try {
      setLoading(true);
      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };

      const { data } = await axios.post(
        "https://thriftstarng.onrender.com/api/users/signUp",
        {
          name: signUpInputs.name,
          email: signUpInputs.email,
          password: signUpInputs.password,
        },
        config
      );

      dispatch({ type: REDUCER_ACTION_TYPES.GET_USER_INFO, payload: data });
      dispatch({ type: REDUCER_ACTION_TYPES.GET_TOKEN, payload: data.token });
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  }

  return (
    <div className="signUp">
      <div className="header">
        <h1 className="signUpHeader">My ThriftStar Account</h1>
        <p className="signUpWriteUp">
          Set up a ThriftStar profile or login an existing one.
        </p>
      </div>
      <div className="signUpBody">
        <form className="signUpForm" onSubmit={signUp}>
          <AppInput
            type="text"
            id="name"
            name="name"
            version="formInput"
            required={true}
            value={state.signUpInputs.name}
            onChange={(e: ChangeEvent<HTMLInputElement>) =>
              dispatch({
                type: REDUCER_ACTION_TYPES.SIGNUP_INPUTS,
                field: e.target.name,
                payload: e.target.value,
              })
            }
            label="Name"
          />
          <AppInput
            type="email"
            id="email"
            name="email"
            version="formInput"
            required={true}
            value={state.signUpInputs.email}
            onChange={(e: ChangeEvent<HTMLInputElement>) =>
              dispatch({
                type: REDUCER_ACTION_TYPES.SIGNUP_INPUTS,
                field: e.target.name,
                payload: e.target.value,
              })
            }
            label="Email"
          />
          <AppInput
            type="password"
            id="password"
            name="password"
            version="formInput"
            required={true}
            value={state.signUpInputs.password}
            onChange={(e: ChangeEvent<HTMLInputElement>) =>
              dispatch({
                type: REDUCER_ACTION_TYPES.SIGNUP_INPUTS,
                field: e.target.name,
                payload: e.target.value,
              })
            }
            label="Password"
            showHidePass={true}
          />
          <AppButton
            version={"primaryBtn"}
            label={"Create Account"}
            isLoading={loading}
            isDisabled={
              !signUpInputs.name ||
              !signUpInputs.email ||
              !signUpInputs.password ||
              loading
            }
          />
          <div className="elseSignIn">
            Already have an account? <Link to="/SignIn">Sign In</Link>
          </div>
        </form>
      </div>
    </div>
  );
}
