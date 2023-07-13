import "./sales.scss";
import { useContext, useEffect, useState } from "react";
import AppContext from "../../contexts/AppContext";
import { REDUCER_ACTION_TYPES } from "../../reducers/ReducerActionsTypes";
import axios from "axios";
import { ProductType } from "../../Types";
import ShopList from "../../components/ShopList";
import Loader from "../../components/Loader";

export default function Sales() {
  const { state, dispatch } = useContext(AppContext);
  const [salesProducts, setSalesProducts] = useState<ProductType[]>(
    [] as ProductType[]
  );
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    dispatch({
      type: REDUCER_ACTION_TYPES.PAGE_TITLE,
      payload: "Sales - ThriftStarng",
    });

    //Get Products
    async function getSalesProducts() {
      try {
        setLoading(true);

        const { data } = await axios.get(
          "https://thriftstarng.onrender.com/api/products"
        );

        setLoading(false);
        setSalesProducts(data);
      } catch (error: any) {
        console.log(error.message);
        setLoading(false);
      }
    }

    getSalesProducts();
  }, [state.pageTitle]);

  return (
    <div className="sales">
      <div className="salesHeader">
        <h1>ThriftStarng Sales</h1>
        <h3>Get 30%-50% off Designs</h3>
      </div>
      <div className="salesShopSec">
        {loading ? <Loader /> : <ShopList products={salesProducts} />}
      </div>
    </div>
  );
}
