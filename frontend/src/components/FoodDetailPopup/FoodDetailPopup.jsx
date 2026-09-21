import React, { useContext } from 'react';
import './FoodDetailPopup.css';
import { StoreContext } from '../../Context/StoreContext';
import { assets } from '../../assets/assets';

const FoodDetailPopup = () => {
  const { selectedFood, setSelectedFood, url, cartItems, addToCart, removeFromCart } = useContext(StoreContext);

  if (!selectedFood) return null;

  const id = selectedFood._id;
  const itemCount = cartItems?.[id] || 0;

  return (
    <div className='food-popup'>
      <div className='food-popup-container'>
        <div className='food-popup-title'>
          <h2>{selectedFood.name}</h2>
          <img onClick={() => setSelectedFood(null)} src={assets.cross_icon} alt="Close" />
        </div>
        
        <div className='food-popup-content'>
          <img 
            className='food-popup-image' 
            src={url + "/images/" + selectedFood.image} 
            alt={selectedFood.name} 
          />
          
          <div className='food-popup-details'>
            <div className='food-popup-rating'>
              <img src={assets.rating_starts} alt="rating" />
            </div>
            
            <p className='food-popup-desc'>{selectedFood.description}</p>
            <p className='food-popup-price'>₹{selectedFood.price}</p>
            
            <div className='food-popup-action'>
              {!itemCount ? (
                <button className='food-popup-add-btn' onClick={() => addToCart(id)}>Add to Cart</button>
              ) : (
                <div className='food-popup-counter'>
                  <img onClick={() => removeFromCart(id)} src={assets.remove_icon_red} alt="Remove" />
                  <p>{itemCount}</p>
                  <img onClick={() => addToCart(id)} src={assets.add_icon_green} alt="Add" />
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FoodDetailPopup;
