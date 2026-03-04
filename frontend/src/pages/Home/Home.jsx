// The Home component is a functional component that serves as the main page of the application. It imports and renders several child components, including Header, ExploreMenu, FoodDisplay, and AppDownload. The Home component also manages the state of the selected food category using the useState hook. When a user selects a category from the ExploreMenu, the selected category is passed down to the FoodDisplay component, which updates the displayed food items accordingly. The Home component provides a cohesive structure for the main page of the application, allowing users to explore different food categories and access additional features such as downloading the app.
// used in: App.jsx to render the main page of the application, which includes the header, explore menu, food display, and offers sections. The Home component manages the state of the selected food category and passes it down to the ExploreMenu and FoodDisplay components to update the displayed content based on user interactions.

import React, { useState } from 'react'
import './Home.css'
import Header from '../../components/Header/Header'
import ExploreMenu from '../../components/ExploreMenu/ExploreMenu'
import FoodDisplay from '../../components/FoodDisplay/FoodDisplay'
import Offers from '../../components/Offers/Offers'


const Home = () => {

  const [category, setcategory] =  useState('All');

  return (
    <div>
      <Header/>
      <ExploreMenu category={category} setCategory={setcategory}/>
      <FoodDisplay category={category}/>
      <Offers/>
    </div>
  )
}

export default Home