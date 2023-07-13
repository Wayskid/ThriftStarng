import "./signIn.scss";
import { ChangeEvent, FormEvent, useContext, useEffect, useState } from "react";
import AppContext from "../../contexts/AppContext";
import { REDUCER_ACTION_TYPES } from "../../reducers/ReducerActionsTypes";
import { Link } from "react-router-dom";
import axios from "axios";
import AppButton from "../../components/appButton/AppButton";
import AppInput from "../../components/appInput/AppInput";

export default function SignIn() {
  const { state, dispatch } = useContext(AppContext);
  const { signInInputs } = state;
  const [loading, setLoading] = useState(false);

  //Page title
  useEffect(() => {
    dispatch({
      type: REDUCER_ACTION_TYPES.PAGE_TITLE,
      payload: "Sign In - ThriftStarng",
    });
  }, [state.pageTitle]);

  //SignIn
  async function signIn(e: FormEvent) {
    e.preventDefault();
    try {
      setLoading(true);

      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };

      const { data } = await axios.post(
        "https://thriftstarng.onrender.com/api/users/signIn",
        {
          email: signInInputs.email,
          password: signInInputs.password,
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
    <div className="signIn">
      <div className="header">
        <h1 className="signInHeader">My ThriftStar Account</h1>
        <p className="signInWriteUp">
          Sign in with your ThriftStar email and password or create a profile if
          you are new.
        </p>
      </div>
      <div className="signInBody">
        <form className="signInForm" onSubmit={signIn}>
          <div className="signInInputDIv">
            <AppInput
              type="text"
              id="email"
              name="email"
              version="formInput"
              required={true}
              value={state.signInInputs.email}
              onChange={(e?: ChangeEvent<HTMLInputElement>) =>
                dispatch({
                  type: REDUCER_ACTION_TYPES.SIGNIN_INPUTS,
                  field: e?.target.name,
                  payload: e?.target.value,
                })
              }
              label="Email"
            />
          </div>
          <div className="signInInputDIv">
            <AppInput
              type="password"
              id="password"
              name="password"
              version="formInput"
              required={true}
              value={state.signInInputs.password}
              onChange={(e?: ChangeEvent<HTMLInputElement>) =>
                dispatch({
                  type: REDUCER_ACTION_TYPES.SIGNIN_INPUTS,
                  field: e?.target.name,
                  payload: e?.target.value,
                })
              }
              label="Password"
              showHidePass={true}
            />
          </div>
          <AppButton
            version={"primaryBtn"}
            label={"Sign In"}
            isLoading={loading}
            isDisabled={
              !signInInputs.email || !signInInputs.password || loading
            }
          />
          <div className="elseSignUp">
            Don't have an account? <Link to="/SignUp">Create One</Link>
          </div>
        </form>
      </div>
    </div>
  );
}
