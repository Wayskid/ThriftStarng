import "./about.scss";
import { useContext, useEffect } from "react";
import AppContext from "../../contexts/AppContext";
import { REDUCER_ACTION_TYPES } from "../../reducers/ReducerActionsTypes";

export default function About() {
  const { state, dispatch } = useContext(AppContext);

  useEffect(() => {
    dispatch({
      type: REDUCER_ACTION_TYPES.PAGE_TITLE,
      payload: "About - ThriftStarng",
    });
  }, [state.pageTitle]);

  return (
    <div className="about">
      <h1 className="aboutHeader">About Us</h1>
      <p className="aboutWriteUp">
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Expedita,
        beatae in quam architecto obcaecati ut magni odit delectus similique
        dolor adipisci culpa porro, accusantium harum illo laudantium ad
        explicabo deleniti mollitia assumenda tempora et inventore dolorem
        accusamus? Cum dignissimos, nisi placeat voluptatem omnis minima quia a
        animi quasi. Suscipit voluptatum nesciunt temporibus nemo molestiae ex
        quos explicabo architecto ipsa laudantium, aliquid, deleniti, reiciendis
        non neque corrupti ad exercitationem placeat distinctio ratione.
        Pariatur, magni, sunt ratione ad eveniet excepturi dolores obcaecati
        deserunt dolore error quam voluptatibus facere, aliquid molestias
        distinctio similique a ipsa consequatur dicta atque nobis minima
        consectetur cumque? Accusantium?
      </p>
    </div>
  );
}
