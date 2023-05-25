import { useContext } from "react";
import ItemCard from "./ItemCard";
import AppContext from "../contexts/AppContext";

export default function ShopList() {
  const { state } = useContext(AppContext);

  return (
    <ul className="shopList">
      {state.products.slice(0, state.pagenation).map((product): JSX.Element => {
        return <ItemCard key={product._id} product={product} />;
      })}
    </ul>
  );
}
