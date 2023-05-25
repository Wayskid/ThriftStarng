import "../sassStyles/notFound.scss"
import { useContext, useEffect } from "react";
import AppContext from "../contexts/AppContext";
import { REDUCER_ACTION_TYPES } from "../reducers/ReducerActionsTypes";

export default function notFound() {

  const { state, dispatch } = useContext(AppContext);

  useEffect(() => {
    dispatch({
      type: REDUCER_ACTION_TYPES.PAGE_TITLE,
      payload: "Error 404 not found - ThriftStarng",
    });
  }, [state.pageTitle]);

  return (
    <div className="notFound">
        <h1>Oops</h1>
        <p>Sorry, it looks like that page doesn't exist</p>
        <a href="/">Go Back to Homepage</a>
    </div>
  )
}
