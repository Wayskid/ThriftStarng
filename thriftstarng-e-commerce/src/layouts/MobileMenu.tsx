import "../sassStyles/cartMenu.scss";
import { Link, useLocation } from "react-router-dom";
import { BsFacebook, BsInstagram, BsWhatsapp, BsX } from "react-icons/bs";
import { useContext, useEffect } from "react";
import AppContext from "../contexts/AppContext";
import { motion } from "framer-motion";
import { REDUCER_ACTION_TYPES } from "../reducers/ReducerActionsTypes";

export default function MobileMenu() {
  const { dispatch, state, signOut } = useContext(AppContext);
  const location = useLocation();

  // Active Link
  function pathMatch(route: string): boolean {
    if (route === location.pathname) {
      return true;
    }
    return false;
  }

  // Animations
  const mobileMenu: {} = {
    showMenu: {
      opacity: 1,
      visibility: "visible",
    },
    hideMenu: {
      opacity: 0,
      transitionEnd: {
        visibility: "hidden",
      },
    },
  };

  const mobileLink = {
    showLeftMobileMenu: {
      translateX: 0,
      opacity: 1,
      transition: {
        type: "spring",
        duration: 1,
        bounce: 0,
        delay: 0.1,
      },
    },

    hideLeftMobileMenu: {
      opacity: 0,
      translateX: -90,
      transition: {
        type: "spring",
        restSpeed: 0.5,
      },
    },
  };

  useEffect(() => {
    if (state.openClose.isMenuOpen) {
      dispatch({ type: REDUCER_ACTION_TYPES.CLOSE_SEARCH });
      dispatch({ type: REDUCER_ACTION_TYPES.CLOSE_FILTER });
      dispatch({ type: REDUCER_ACTION_TYPES.CLOSE_CART });
    }
  }, [dispatch, state.openClose.isMenuOpen]);

  return (
    <motion.div
      className="mobileMenu"
      variants={mobileMenu}
      animate={state.openClose.isMenuOpen ? "showMenu" : "hideMenu"}
    >
      <div
        className="rightMobileMenu"
        onClick={() => dispatch({ type: REDUCER_ACTION_TYPES.CLOSE_MENU })}
      ></div>
      <motion.div
        className="leftMobileMenu"
        variants={mobileLink}
        animate={
          state.openClose.isMenuOpen
            ? "showLeftMobileMenu"
            : "hideLeftMobileMenu"
        }
      >
        <div className="menuLinks">
          {!state.userInfo ? (
            <Link
              to="/signIn"
              className={`${pathMatch("/signIn") && "activeNavLeft"}`}
              onClick={() =>
                dispatch({ type: REDUCER_ACTION_TYPES.CLOSE_MENU })
              }
            >
              Sign In
            </Link>
          ) : (
            <Link
              to="/signIn"
              className={`${pathMatch("/signIn") && "activeNavLeft"}`}
              onClick={() => {
                dispatch({ type: REDUCER_ACTION_TYPES.CLOSE_MENU });
                signOut();
              }}
            >
              Sign Out
            </Link>
          )}
          <Link
            to="/new_arrivals"
            className={`${pathMatch("/new_arrivals") && "activeNavLeft"}`}
            onClick={() => dispatch({ type: REDUCER_ACTION_TYPES.CLOSE_MENU })}
          >
            New Arrivals
          </Link>
          <Link
            to="/sales"
            className={`${pathMatch("/sales") && "activeNavLeft"}`}
            onClick={() => dispatch({ type: REDUCER_ACTION_TYPES.CLOSE_MENU })}
          >
            Sales
          </Link>
          <p
            onClick={() =>
              dispatch({ type: REDUCER_ACTION_TYPES.OPEN_CLOSE_SEARCH })
            }
            className={`mobileSearchBtn ${
              state.openClose.isSearchOpen && "activeNavLeft"
            }`}
          >
            Search
          </p>
        </div>
        <div className="socialsLinks">
          <a href="https://wa.me/2347080598310" target="_blank">
            <BsWhatsapp />
            <p>(+234) 07080598310</p>
          </a>
          <a href="https://www.instagram.com/thriftstarng/" target="_blank">
            <BsInstagram />
            <p>ThriftStarng</p>
          </a>
          <a href="#">
            <BsFacebook />
            <p>ThriftStarng</p>
          </a>
        </div>
        <motion.button
          className="closeMenuBtn"
          onClick={() =>
            dispatch({ type: REDUCER_ACTION_TYPES.OPEN_CLOSE_MENU })
          }
          whileTap={{ scale: 0.95 }}
        >
          <BsX />
        </motion.button>
      </motion.div>
    </motion.div>
  );
}
