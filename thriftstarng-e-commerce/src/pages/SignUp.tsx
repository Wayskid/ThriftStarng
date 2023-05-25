import "../sassStyles/signup.scss"
import { ChangeEvent, useContext, useEffect } from "react";
import AppContext from "../contexts/AppContext";
import { REDUCER_ACTION_TYPES } from "../reducers/ReducerActionsTypes";
import { Link } from "react-router-dom";
import ButtonLoader from "../components/ButtonLoader";
import { AiOutlineEye } from "react-icons/ai";
import { AiOutlineEyeInvisible } from "react-icons/ai";

export default function SignUp() {
  const { state, dispatch, signUp } = useContext(AppContext);

  useEffect(() => {
    dispatch({
      type: REDUCER_ACTION_TYPES.PAGE_TITLE,
      payload: "Sign Up - ThriftStarng",
    });
  }, [state.pageTitle]);

  return (
    <div className="signUp">
      <h1 className="signUpHeader">
        Sign Up <br />
        to your Account
      </h1>
      <div className="signUpBody">
        <form className="signUpForm" onSubmit={signUp}>
          <div className="signUpInputDIv">
            <label htmlFor="name">Name</label>
            <input
              required
              type="text"
              id="name"
              name="name"
              value={state.signUpInputs.name}
              onChange={(e: ChangeEvent<HTMLInputElement>) =>
                dispatch({
                  type: REDUCER_ACTION_TYPES.SIGNUP_INPUTS,
                  field: e.target.name,
                  payload: e.target.value,
                })
              }
            />
          </div>
          <div className="signUpInputDIv">
            <label htmlFor="email">Email</label>
            <input
              required
              type="email"
              id="email"
              name="email"
              value={state.signUpInputs.email}
              onChange={(e: ChangeEvent<HTMLInputElement>) =>
                dispatch({
                  type: REDUCER_ACTION_TYPES.SIGNUP_INPUTS,
                  field: e.target.name,
                  payload: e.target.value,
                })
              }
            />
          </div>
          <div className="signUpInputDIv">
            <label htmlFor="password">Password</label>
            <div className="passShow">
              <input
                required
                type={state.isPasswordShown ? "text" : "password"}
                id="password"
                name="password"
                value={state.signUpInputs.password}
                onChange={(e: ChangeEvent<HTMLInputElement>) =>
                  dispatch({
                    type: REDUCER_ACTION_TYPES.SIGNUP_INPUTS,
                    field: e.target.name,
                    payload: e.target.value,
                  })
                }
              />
              <button
                type="button"
                onClick={() =>
                  dispatch({ type: REDUCER_ACTION_TYPES.SHOW_HIDE_PASSWORD })
                }
              >
                {!state.isPasswordShown ? (
                  <AiOutlineEyeInvisible />
                ) : (
                  <AiOutlineEye />
                )}
              </button>
            </div>
          </div>
          <button
            className={`signUpBtn ${state.isLoading && "buttonLoad"}`}
            disabled={state.isLoading}
          >
            <p>Create Account</p>
            {state.isLoading && <ButtonLoader />}
          </button>
          <div className="elseSignUp">
            Already have an account? <Link to="/SignIn">Sign In</Link>
          </div>
        </form>
      </div>
    </div>
  );
}
