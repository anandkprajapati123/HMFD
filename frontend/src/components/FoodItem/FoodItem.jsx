// The FoodItem component is a functional component that represents an individual food item in the application. It receives props such as id, name, price, description, and image to display the details of the food item. The component also utilizes the StoreContext to manage the state of the cart items, allowing users to add or remove items from their cart. The UI includes an image of the food item, its name, description, price, and buttons to add or remove the item from the cart. The styling is handled through an external CSS file, 'FoodItem.css', to enhance the visual presentation of the component. Overall, the FoodItem component provides an interactive way for users to view and manage their food selections within the application.Used in FoodDisplay.jsx to render each food item in the list of food items based on the selected category.
// Used in: FoodDisplay.jsx to render each food item in the list of food items based on the selected category.


import React, { useContext } from "react";
import "./FoodItem.css";
import { assets } from "../../assets/assets";
import { StoreContext } from "../../Context/StoreContext";

const FoodItem = ({ id, name, price, description, image }) => {
  const { cartItems, addToCart, removeFromCart, url } = useContext(StoreContext);

  // ✅ safe fallback
  const itemCount = cartItems?.[id] || 0;

  return (
    <div className="food-item">
      <div className="food-item-img-container">
        <img
          className="food-item-image"
          src={url + "/images/" + image}
          alt={name}
        />

        {itemCount === 0 ? (
          <img
            className="add"
            onClick={() => addToCart(id)}
            src={assets.add_icon_white}
            alt="add"
          />
        ) : (
          <div className="food-item-counter">
            <img
              onClick={() => removeFromCart(id)}
              src={assets.remove_icon_red}
              alt="remove"
            />
            <p>{itemCount}</p>
            <img
              onClick={() => addToCart(id)}
              src={assets.add_icon_green}
              alt="add"
            />
          </div>
        )}
      </div>

      <div className="food-item-info">
        <div className="food-item-top">
          <p className="food-item-name">{name}</p>
          <img src={assets.rating_starts} alt="rating" />
        </div>

        <p className="food-item-description">{description}</p>

        <div className="food-item-bottom">
          <p className="food-item-price">₹{price}</p>
        </div>
      </div>
    </div>
  );
};

export default FoodItem;