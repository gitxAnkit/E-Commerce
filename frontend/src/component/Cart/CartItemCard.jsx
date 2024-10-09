import React from "react";
import "./CartItemCard.css";
import { Link } from "react-router-dom";

const CartItemCard = ({ item, deleteCartItems }) => {
  return (
    <div className="CartItemCard">
      <img src={item.image} alt={`${item.name}`} />
      <div>
        <Link to={`/product/${item.product}`}>{item.name}</Link>
        <span>{`Price: ₹${item.price}`}</span>
        <button
          className="removeBtn"
          onClick={() => deleteCartItems(item.product)}
        >
          Remove
        </button>
      </div>
    </div>
  );
};

export default CartItemCard;
