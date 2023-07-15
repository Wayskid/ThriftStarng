import "../sassStyles/itemCard.scss";
import { AiOutlineHeart } from "react-icons/ai";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { ProductType } from "../Types";
import { useContext } from "react";
import AppContext from "../contexts/AppContext";

export default function ItemCard({ product }: { product: ProductType }) {
  const { addToCart, addToWish } = useContext(AppContext);
  const navigate = useNavigate();

  return (
    <motion.li
      initial={{ scale: 1 }}
      whileHover={{ scale: 1.03 }}
      transition={{ duration: 0.3 }}
      className="itemCard"
    >
      <div className="itemCardTop">
        <div
          onClick={() => navigate(`/products/${product._id}`)}
          className="imgWrapper"
        >
          <img src={product.image} alt={product.description} />
        </div>
        <div className="itemCardDetailsWrap">
          <div className="nameSize">
            <p className="itemCategory">{product.name}</p> &#8211;
            <p className="itemCategory">Size: {product.size}</p>
          </div>
          <p className="price">#{product.price.toLocaleString("en-US")}</p>
        </div>
      </div>
      <button
        onClick={() => addToWish(1, product._id)}
        className="addToWishlistBtn"
      >
        <AiOutlineHeart />
      </button>
      <button
        className="addToCartBtn"
        onClick={() => addToCart(1, product._id)}
      >
        Add To Bag
      </button>
      {product.stockCount === 0 && <div className="badgeSoldOut">SOLD</div>}
    </motion.li>
  );
}
