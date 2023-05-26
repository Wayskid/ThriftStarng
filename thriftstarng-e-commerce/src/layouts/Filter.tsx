import AppContext from "../contexts/AppContext";
import { useContext, useEffect } from "react";
import "../sassStyles/filter.scss";
import { REDUCER_ACTION_TYPES } from "../reducers/ReducerActionsTypes";
import { motion } from "framer-motion";
import { BsX } from "react-icons/bs";

export default function Filter() {
  const { state, dispatch, handleFilter, getProducts } = useContext(AppContext);

  const filterAnim = {
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
    if (state.openClose.isFilterOpen) {
      dispatch({ type: REDUCER_ACTION_TYPES.CLOSE_SEARCH });
      dispatch({ type: REDUCER_ACTION_TYPES.CLOSE_MENU });
      dispatch({ type: REDUCER_ACTION_TYPES.CLOSE_CART });
    }
  }, [dispatch, state.openClose.isFilterOpen]);

  return (
    <motion.div
      className="filter"
      variants={filterAnim}
      animate={state.openClose.isFilterOpen ? "anim" : "initial"}
    >
      <div className="category">
        <h2>Category</h2>
        <div className="radioDiv">
          <label htmlFor="all">
            <input
              type="radio"
              checked={state.productFilterSort.category === "All"}
              name="category"
              id="all"
              value="All"
              onChange={(e) =>
                dispatch({
                  type: REDUCER_ACTION_TYPES.CATEGORY,
                  field: e.target.name,
                  payload: e.target.value,
                })
              }
            />
            All
          </label>
        </div>
        <div className="radioDiv">
          <label htmlFor="tops">
            <input
              type="radio"
              checked={state.productFilterSort.category === "Top"}
              name="category"
              id="tops"
              value="Top"
              onChange={(e) =>
                dispatch({
                  type: REDUCER_ACTION_TYPES.CATEGORY,
                  field: e.target.name,
                  payload: e.target.value,
                })
              }
            />
            Tops
          </label>
        </div>
        <div className="radioDiv">
          <label htmlFor="gowns">
            <input
              type="radio"
              checked={state.productFilterSort.category === "Gown"}
              name="category"
              id="gowns"
              value="Gown"
              onChange={(e) =>
                dispatch({
                  type: REDUCER_ACTION_TYPES.CATEGORY,
                  field: e.target.name,
                  payload: e.target.value,
                })
              }
            />
            Gowns
          </label>
        </div>
        <div className="radioDiv">
          <label htmlFor="skirts">
            <input
              type="radio"
              checked={state.productFilterSort.category === "Skirt"}
              name="category"
              id="skirts"
              value="Skirt"
              onChange={(e) =>
                dispatch({
                  type: REDUCER_ACTION_TYPES.CATEGORY,
                  field: e.target.name,
                  payload: e.target.value,
                })
              }
            />
            Skirts
          </label>
        </div>
        <div className="radioDiv">
          <label htmlFor="shorts">
            <input
              type="radio"
              checked={state.productFilterSort.category === "Short"}
              name="category"
              id="shorts"
              value="Short"
              onChange={(e) =>
                dispatch({
                  type: REDUCER_ACTION_TYPES.CATEGORY,
                  field: e.target.name,
                  payload: e.target.value,
                })
              }
            />
            Shorts
          </label>
        </div>
      </div>
      <div className="sort">
        <h2>Sort By</h2>
        <div className="radioDiv">
          <label htmlFor="new">
            <input
              type="radio"
              checked={state.productFilterSort.sort === "createdAt"}
              name="sort"
              id="new"
              value="createdAt"
              onChange={(e) =>
                dispatch({
                  type: REDUCER_ACTION_TYPES.SORT,
                  field: e.target.name,
                  payload: e.target.value,
                })
              }
            />
            Newest
          </label>
        </div>
        <div className="radioDiv">
          <label htmlFor="asc">
            <input
              type="radio"
              checked={state.productFilterSort.sort === "priceAsc"}
              name="sort"
              id="asc"
              value="priceAsc"
              onChange={(e) =>
                dispatch({
                  type: REDUCER_ACTION_TYPES.SORT,
                  field: e.target.name,
                  payload: e.target.value,
                })
              }
            />
            Price Asc
          </label>
        </div>
        <div className="radioDiv">
          <label htmlFor="desc">
            <input
              type="radio"
              checked={state.productFilterSort.sort === "priceDesc"}
              name="sort"
              id="desc"
              value="priceDesc"
              onChange={(e) =>
                dispatch({
                  type: REDUCER_ACTION_TYPES.SORT,
                  field: e.target.name,
                  payload: e.target.value,
                })
              }
            />
            Price Desc
          </label>
        </div>
      </div>
      <div className="filterBtns">
        <button
          className="clearBtn"
          onClick={() => {
            dispatch({ type: REDUCER_ACTION_TYPES.CLEAR_FILTER });
            dispatch({
              type: REDUCER_ACTION_TYPES.OPEN_CLOSE_FILTER,
            });
            getProducts();
          }}
        >
          Clear
        </button>
        <button
          className="applyBtn"
          onClick={() => {
            handleFilter();
            dispatch({
              type: REDUCER_ACTION_TYPES.OPEN_CLOSE_FILTER,
            });
          }}
        >
          Apply
        </button>
      </div>
      <button
        className="closeFilter"
        onClick={() =>
          dispatch({
            type: REDUCER_ACTION_TYPES.OPEN_CLOSE_FILTER,
          })
        }
      >
        <BsX />
      </button>
    </motion.div>
  );
}
