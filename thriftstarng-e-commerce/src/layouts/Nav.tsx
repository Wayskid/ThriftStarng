import "../sassStyles/nav.scss";
import { Link, useLocation } from "react-router-dom";
import { BiLogOut, BiUser } from "react-icons/bi";
import { HiOutlineShoppingBag } from "react-icons/hi";
import { BsInstagram, BsWhatsapp } from "react-icons/bs";
import { AiOutlineHeart } from "react-icons/ai";
import { useContext } from "react";
import AppContext from "../contexts/AppContext";
import MobileMenu from "../components/MobileMenu";
import CartMenu from "../components/CartMenu";
import { REDUCER_ACTION_TYPES } from "../reducers/ReducerActionsTypes";

export default function Nav() {
  const {
    state,
    signOut,
    dispatch,
  } = useContext(AppContext);
  const location = useLocation();

  // Active Link
  function pathMatch(route: string): boolean {
    if (route === location.pathname) {
      return true;
    }
    return false;
  }

  return (
    <nav className="nav">
      <div className="navMain">
        <div className="burgerIg">
          <div
            className={`burger ${state.openClose.isMenuOpen && "moveBurger"}`}
            onClick={() =>
              dispatch({ type: REDUCER_ACTION_TYPES.OPEN_CLOSE_MENU })
            }
          >
            <div></div>
            <div></div>
            <div></div>
          </div>
          <a
            href="https://www.instagram.com/thriftstarng/"
            target="_blank"
            className="navIg"
          >
            <BsInstagram />
          </a>
        </div>
        <ul className="navMainLeft">
          <div className="linksWrapper">
            <Link
              to="/new_arrivals"
              className={`${pathMatch("/new_arrivals") && "activeNavLeft"}`}
              onClick={() =>
                dispatch({ type: REDUCER_ACTION_TYPES.OPEN_CLOSE_MENU })
              }
            >
              New Arrivals
            </Link>
            <Link
              to="/sales"
              className={`${pathMatch("/sales") && "activeNavLeft"}`}
              onClick={() =>
                dispatch({ type: REDUCER_ACTION_TYPES.OPEN_CLOSE_MENU })
              }
            >
              Sales
            </Link>
            <p
              onClick={() =>
                dispatch({ type: REDUCER_ACTION_TYPES.OPEN_CLOSE_SEARCH })
              }
              className={`showSearchBtn ${
                state.openClose.isSearchOpen && "activeNavLeft"
              }`}
            >
              Search
            </p>
          </div>
        </ul>
        <Link
          to="/"
          onClick={() => {
            dispatch({ type: REDUCER_ACTION_TYPES.CLOSE_SEARCH });
            dispatch({ type: REDUCER_ACTION_TYPES.CLOSE_FILTER });
          }}
        >
          <p className="logo">
            ThriftStar<small className="logoSmall">ng</small>
          </p>
        </Link>
        <ul className="navMainRight">
          {!state.userInfo ? (
            <Link
              to="/signIn"
              className={`${pathMatch("/signIn") && "activeNavRight"}`}
              onClick={() => {
                dispatch({ type: REDUCER_ACTION_TYPES.CLOSE_SEARCH });
                dispatch({ type: REDUCER_ACTION_TYPES.CLOSE_FILTER });
              }}
            >
              <BiUser className="navMainRightIcon" />
              <p>Sign In</p>
            </Link>
          ) : (
            <Link
              to="/signIn"
              className={`${pathMatch("/signIn") && "activeNavRight"}`}
              onClick={() => {
                signOut();
                dispatch({ type: REDUCER_ACTION_TYPES.CLOSE_SEARCH });
                dispatch({ type: REDUCER_ACTION_TYPES.CLOSE_FILTER });
              }}
            >
              <BiLogOut className="navMainRightIcon" />
              <p>Sign Out</p>
            </Link>
          )}
          <Link
            to="/wish"
            className={`${pathMatch("/wish") && "activeNavRight"}`}
            onClick={() => {
              dispatch({ type: REDUCER_ACTION_TYPES.CLOSE_SEARCH });
              dispatch({ type: REDUCER_ACTION_TYPES.CLOSE_FILTER });
            }}
          >
            <div className="iconBadge">
              <AiOutlineHeart className="navMainRightIcon" />
              <small className="navBadge">{state.wishList.length}</small>
            </div>
            <p>Wishlist</p>
          </Link>
          <div
            className={`openCart ${pathMatch("/cart") && "activeNavRight"}`}
            onClick={() =>
              dispatch({ type: REDUCER_ACTION_TYPES.OPEN_CLOSE_CART })
            }
          >
            <div className="iconBadge">
              <HiOutlineShoppingBag className="navMainRightIcon" />
              <small className="navBadge">{state.cartList.length}</small>
            </div>
            <p>Cart</p>
          </div>
        </ul>
      </div>

      {/* Mobile Menu */}
      <MobileMenu />

      {/* Cart Menu */}
      <CartMenu />

      <a
        href="https://wa.me/2347080598310"
        target="_blank"
        className="floatingWhatsapp"
      >
        <BsWhatsapp />
      </a>
    </nav>
  );
}
