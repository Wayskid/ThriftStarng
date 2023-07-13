import "./newArrivals.scss";
import { useContext, useEffect, useState } from "react";
import AppContext from "../../contexts/AppContext";
import { REDUCER_ACTION_TYPES } from "../../reducers/ReducerActionsTypes";
import axios from "axios";
import { ProductType } from "../../Types";
import Loader from "../../components/Loader";
import ShopList from "../../components/ShopList";

export default function NewArrivals() {
  const { state, dispatch } = useContext(AppContext);
  const [salesProducts, setSalesProducts] = useState<ProductType[]>(
    [] as ProductType[]
  );
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    dispatch({
      type: REDUCER_ACTION_TYPES.PAGE_TITLE,
      payload: "New Arrivals - ThriftStarng",
    });

    //Get Products
    async function getNewProducts() {
      try {
        setLoading(true);

        const { data } = await axios.get(
          "https://thriftstarng.onrender.com/api/products/new"
        );

        setLoading(false);
        setSalesProducts(data);
      } catch (error: any) {
        console.log(error.message);
        setLoading(false);
      }
    }

    getNewProducts();
  }, [state.pageTitle]);

  return (
    <div className="newArrivals">
      <div className="newArrivalsHeader">
        <h1>New Arrivals</h1>
        <h3>Shop ThriftStarng Newest Designs</h3>
      </div>
      <div className="newArrivalsShopSec">
        {loading ? <Loader /> : <ShopList products={salesProducts} />}
      </div>
    </div>
  );
}
