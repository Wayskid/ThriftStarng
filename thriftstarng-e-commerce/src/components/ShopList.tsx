import "../sassStyles/shopList.scss";
import { useContext } from "react";
import ItemCard from "./ItemCard";
import AppContext from "../contexts/AppContext";
import { ProductType } from "../Types";
import { REDUCER_ACTION_TYPES } from "../reducers/ReducerActionsTypes";
import AppButton from "./appButton/AppButton";

export default function ShopList({ products }: { products: ProductType[] }) {
  const { state, dispatch } = useContext(AppContext);

  return (
    <>
      <ul className="shopList">
        {products.slice(0, state.pagenation).map((product): JSX.Element => {
          return <ItemCard key={product._id} product={product} />;
        })}
      </ul>
      <div className="shopListLoadMoreBtn">
        {state.pagenation <= products.length && (
          <AppButton
            version="primaryBtn"
            label="Load More"
            onClick={() => dispatch({ type: REDUCER_ACTION_TYPES.PAGENATION })}
          />
        )}
      </div>
    </>
  );
}
