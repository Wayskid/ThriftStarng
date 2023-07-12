import "../sassStyles/search.scss";
import { ChangeEvent, useContext, useEffect, useState } from "react";
import { motion } from "framer-motion";
import AppContext from "../contexts/AppContext";
import { REDUCER_ACTION_TYPES } from "../reducers/ReducerActionsTypes";
import { BsX } from "react-icons/bs";
import axios from "axios";
import Loader from "../components/Loader";
import { ProductType } from "../Types";
import ShopList from "../components/ShopList";

export default function Search() {
  const { state, dispatch } = useContext(AppContext);
  const [searchVal, setSearchVal] = useState("");
  const [searchResult, setSearchResult] = useState<ProductType[]>(
    [] as ProductType[]
  );
  const [loading, setLoading] = useState(false);

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

  //Handle Search
  async function handleSearch(e: ChangeEvent<HTMLInputElement>) {
    setSearchVal(e.target.value);
    if (e.target.value.trim()) {
      try {
        setLoading(true);

        const { data } = await axios.get(
          `http://localhost:3000/api/products/q/search?keyword=${e.target.value.trim()}`
        );

        setLoading(false);
        setSearchResult(data);
      } catch (error) {
        console.log(error);
        setLoading(false);
      }
    }
  }

  return (
    <motion.div
      className="search"
      variants={searchAnim}
      animate={state.openClose.isSearchOpen ? "anim" : "initial"}
    >
      <div className="searchTop">
        <h1>Search ThriftStarng</h1>
        <form className="searchBtnInput">
          <input
            type="text"
            id="search"
            value={searchVal}
            onChange={handleSearch}
            placeholder="Type your search"
          />
        </form>
        {searchVal.trim() && (
          <p className="inputUnderNote">Showing result for "{searchVal}"</p>
        )}
      </div>
      <div className="searchResult">
        {searchVal.trim() ? (
          loading ? (
            <Loader />
          ) : (
            <ShopList products={searchResult} />
          )
        ) : (
          <h1>Tell us the type of clothes you're looking for</h1>
        )}
        {!loading && !searchResult.length && searchVal.trim() && (
          <h1>No Clothes found</h1>
        )}
      </div>
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
