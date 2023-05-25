import "../sassStyles/signIn.scss";
import { ChangeEvent, useContext, useEffect } from "react";
import AppContext from "../contexts/AppContext";
import { REDUCER_ACTION_TYPES } from "../reducers/ReducerActionsTypes";
import { Link } from "react-router-dom";
import ButtonLoader from "../components/ButtonLoader";

export default function SignIn() {
  const { state, dispatch, signIn } = useContext(AppContext);

  useEffect(() => {
    dispatch({
      type: REDUCER_ACTION_TYPES.PAGE_TITLE,
      payload: "Sign In - ThriftStarng",
    });
  }, [state.pageTitle]);

  return (
    <div className="signIn">
      <h1 className="signInHeader">
        Sign In <br />
        to your Account
      </h1>
      <div className="signInBody">
        <form className="signInForm" onSubmit={signIn}>
          <div className="signInInputDIv">
            <label htmlFor="email">Email</label>
            <input
              required
              type="text"
              id="email"
              name="email"
              value={state.signInInputs.email}
              onChange={(e: ChangeEvent<HTMLInputElement>) =>
                dispatch({
                  type: REDUCER_ACTION_TYPES.SIGNIN_INPUTS,
                  field: e.target.name,
                  payload: e.target.value,
                })
              }
            />
          </div>
          <div className="signInInputDIv">
            <label htmlFor="password">Password</label>
            <input
              required
              type="password"
              id="password"
              name="password"
              value={state.signInInputs.password}
              onChange={(e: ChangeEvent<HTMLInputElement>) =>
                dispatch({
                  type: REDUCER_ACTION_TYPES.SIGNIN_INPUTS,
                  field: e.target.name,
                  payload: e.target.value,
                })
              }
            />
          </div>
          <button
            className={`signInBtn ${state.isLoading && "buttonLoad"}`}
            disabled={state.isLoading}
          >
            <p>Sign In</p>
            {state.isLoading && <ButtonLoader />}
          </button>
          <div className="elseSignUp">
            Don't have an account? <Link to="/SignUp">Create One</Link>
          </div>
        </form>
      </div>
    </div>
  );
}
