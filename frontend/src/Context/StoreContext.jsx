// This file is responsible for creating a context that will be used to share the food list across the application. It uses the createContext function from React to create a new context and provides a StoreContextProvider component that wraps the children components and provides the food list as a value to the context. This allows any component that consumes the StoreContext to access the food list without having to pass it down through props.Used in main.jsx to wrap the App component and in FoodDisplay.jsx to access the food list.
// Used in: main.jsx to wrap the App component and in FoodDisplay.jsx to access the food list.

import { createContext, useEffect, useState } from "react";
import { food_list } from "../assets/assets";

export const StoreContext = createContext(null);

import axios from "axios";

const StoreContextProvider = (props) => {
  const [cartItems, setCartItems] = useState({});
  const url = "http://localhost:5000";
  const [token, setToken] = useState("");
  const [food_list, setFoodList] = useState([]);

  const addToCart = async (itemId) => {
    setCartItems((prev) => {
      const updatedCart = prev || {}; // 🔥 fix

      if (!updatedCart[itemId]) {
        return { ...updatedCart, [itemId]: 1 };
      } else {
        return { ...updatedCart, [itemId]: updatedCart[itemId] + 1 };
      }
    });

    if (token) {
      try {
        await axios.post(
          url + "/api/cart/add",
          { itemId },
          { headers: { Authorization: `Bearer ${token}` } },
        );
      } catch (error) {
        console.log("ADD CART ERROR:", error);
      }
    }
  };

  const removeFromCart = async (itemId) => {
  setCartItems((prev) => {
    const updatedCart = prev || {};

    if (updatedCart[itemId] > 1) {
      return { ...updatedCart, [itemId]: updatedCart[itemId] - 1 };
    } else {
      const newCart = { ...updatedCart };
      delete newCart[itemId];
      return newCart;
    }
  });

  if (token) {
    try {
      await axios.post(
        url + "/api/cart/remove",
        { itemId },
        { headers: { Authorization: `Bearer ${token}` } },
      );
    } catch (error) {
      console.log("REMOVE CART ERROR:", error);
    }
  }
};

  const getTotalCartAmount = () => {
    let totalAmount = 0;
    for (const item in cartItems) {
      let itemInfo = food_list.find((product) => product._id === item);
      if (itemInfo) {
        totalAmount += itemInfo.price * cartItems[item];
      }
    }
    return totalAmount;
  };

  const fetchFoodList = async () => {
    const response = await axios.get(url + "/api/food/list");
    setFoodList(response.data.data);
  };

  const loadCartData = async (token) => {
    const response = await axios.post(
      url + "/api/cart/get",
      {},
      { headers: { Authorization: `Bearer ${token}` } },
    );
    setCartItems(response.data.cartData);
  };

  useEffect(() => {
    async function loadData() {
      await fetchFoodList();
      if (localStorage.getItem("token")) {
        setToken(localStorage.getItem("token"));
        await loadCartData(localStorage.getItem("token"));
      }
    }
    loadData();
  }, []);

  const contextValue = {
    food_list,
    cartItems,
    setCartItems,
    addToCart,
    removeFromCart,
    getTotalCartAmount,
    url,
    token,
    setToken,
  };

  return (
    <StoreContext.Provider value={contextValue}>
      {props.children}
    </StoreContext.Provider>
  );
};

export default StoreContextProvider;