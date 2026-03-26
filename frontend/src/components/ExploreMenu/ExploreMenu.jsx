// The ExploreMenu component is a functional component that displays a menu of food categories for users to explore. It receives two props: 'category', which represents the currently selected food category, and 'setCategory', a function to update the selected category. The component renders a list of menu items, each represented by an image and a name. When a user clicks on a menu item, the 'setCategory' function is called to update the selected category. If the clicked category is already selected, it resets to "All". The component also includes styling through an external CSS file, 'ExploreMenu.css', to enhance its visual appeal and user experience. Overall, the ExploreMenu component provides an interactive way for users to navigate through different food categories and discover new dishes.
// Used in: Home.jsx



import React from 'react'
import './ExploreMenu.css'
import { menu_list } from '../../assets/assets'

const ExploreMenu = ({ category, setCategory }) => {
  return (
    <div className="explore-menu" id='explore-menu'>
      <div className="explore-menu-container">
        <div className="explore-menu-header">
          <h1>Categories</h1>
        </div>
        <div className="explore-menu-list">
          {menu_list.map((item, index) => {
            return (
              <div
                key={index}
                onClick={() => {
                  setCategory(prev => prev === item.menu_name ? "All" : item.menu_name)
                }}
                className={`explore-menu-list-item ${category === item.menu_name ? "active" : ""}`}
              >
                {item.menu_name}
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}

export default ExploreMenu