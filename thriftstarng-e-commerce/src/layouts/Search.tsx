import "../sassStyles/search.scss";
import { ChangeEvent, useContext, useEffect } from "react";
import { motion } from "framer-motion";
import SearchResult from "../components/SearchResult";
import AppContext from "../contexts/AppContext";
import { REDUCER_ACTION_TYPES } from "../reducers/ReducerActionsTypes";
import { BsX } from "react-icons/bs";

export default function Search() {
  const { state, dispatch, handleSearch } = useContext(AppContext);

  const searchAnim = {
    initial: {
      opacity: 0,
      translateY: "100%",
      transitionEnd: {
        display: "none",
      },
    },

    anim: {
      opacity: 1,
      translateY: 0,
      display: "grid",
      transition: {
        type: "spring",
        duration: 0.5,
        bounce: 0,
      },
    },
  };

  useEffect(() => {
    if (state.openClose.isSearchOpen) {
      dispatch({ type: REDUCER_ACTION_TYPES.CLOSE_FILTER });
      dispatch({ type: REDUCER_ACTION_TYPES.CLOSE_MENU });
      dispatch({ type: REDUCER_ACTION_TYPES.CLOSE_CART });
    }
  }, [dispatch, state.openClose.isSearchOpen]);

  return (
    <motion.div
      className="search"
      variants={searchAnim}
      animate={state.openClose.isSearchOpen ? "anim" : "initial"}
    >
      <div className="searchTop">
        <h1>Search</h1>
        <form className="searchBtnInput">
          <input
            type="text"
            id="search"
            value={state.searchKeyword}
            onChange={(e: ChangeEvent<HTMLInputElement>) =>
              handleSearch(e.target.value)
            }
            placeholder="Type your search"
          />
        </form>
        {state.searchKeyword.length < 3 && (
          <p className="inputUnderNote">
            Please enter at least 3 characters to search
          </p>
        )}
        {state.searchKeyword.length >= 3 && state.searchResult.length > 0 && (
          <p className="inputUnderNote">
            Showing {state.searchResult.length} result
            {state.searchResult.length > 1 ? "s" : ""} matching "
            {state.searchKeyword}"
          </p>
        )}
      </div>
      <SearchResult />

      <button
        className="closeSearch"
        onClick={() =>
          dispatch({
            type: REDUCER_ACTION_TYPES.CLOSE_SEARCH,
          })
        }
      >
        <BsX />
      </button>
    </motion.div>
  );
}
