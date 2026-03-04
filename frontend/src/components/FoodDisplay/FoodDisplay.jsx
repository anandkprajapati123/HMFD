// The FoodDisplay component is a functional component that displays a list of food items based on the selected category. It uses the useContext hook to access the food list from the StoreContext. The component receives a 'category' prop, which is used to filter the food items displayed. If the category is "All", it displays all food items; otherwise, it only displays items that match the selected category. Each food item is rendered using the FoodItem component, which receives props such as id, name, description, price, and image for each item. The component is styled using an external CSS file, 'FoodDisplay.css', to enhance its visual appeal and user experience. Overall, the FoodDisplay component provides a dynamic way to showcase food items based on user preferences and selections.
// Used in: Home.jsx to display a list of food items based on the selected category from the ExploreMenu component.


import React, { useContext } from 'react'
import './FoodDisplay.css'
import { StoreContext } from '../../Context/StoreContext'
import FoodItem from '../FoodItem/FoodItem'

const FoodDisplay = ({category}) => {

  const {food_list} = useContext(StoreContext)

  return (
    <div className='food-display' id='food-display'>
      <h2>Top dishes near you</h2>
      <div className="food-display-list">
        {food_list.map((item,index)=>{
          if(category==="All" || category===item.category) {
            return <FoodItem key={index} id={item._id} name={item.name} description={item.description} price={item.price} image={item.image}/>
          }
          return null;
        })}
      </div>
    </div>
  )
}

export default FoodDisplay