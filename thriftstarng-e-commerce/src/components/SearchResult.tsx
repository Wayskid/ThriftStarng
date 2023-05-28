import ItemCard from "./ItemCard";
import AppContext from "../contexts/AppContext";
import { useContext } from "react";
import Loader from "./Loader";

export default function SearchResult() {
  const { state } = useContext(AppContext);
  return (
    <div className="searchResult">
      {state.isLoading ? (
        <Loader />
      ) : (
        <ul className="shopList">
          {state.searchResult.map((product): JSX.Element => {
              return <ItemCard key={product._id} product={product} />;
            })}
        </ul>
      )}

      {!state.isLoading && !state.searchResult.length ? (
        state.searchKeyword.length < 3 ? (
          <h1>Tell us the type of clothes you're looking for</h1>
        ) : (
          <h1>No Clothes found</h1>
        )
      ) : null}
      {/*The code above says: if after loading stops and your search isn't found, show "Clothes not found" only if the search input is more than 2 characters, else  Show "Tell us the type of clothes..."*/}
    </div>
  );
}
