import React, { useEffect, useState } from 'react'
import './List.css'
import axios from "axios"
import { toast } from "react-toastify"

function List({ url }) {
  const [list, setList] = useState([]);

  const fetchList = async () => {
    const response = await axios.get(`${url}/api/food/list`)
    if (response.data.success) {
      setList(response.data.data)
    } else {
      toast.error("Failed to load food list")
    }
  }

  const removeFood = async (foodId) => {
    const response = await axios.post(`${url}/api/food/remove`, { id: foodId })
    await fetchList();
    if (response.data.success) {
      toast.success(response.data.message)
    } else {
      toast.error("Failed to remove item")
    }
  }

  useEffect(() => {
    fetchList();
  }, [])

  return (
    <div className='list-page'>
      <div className="list-header">
        <div className="page-header">
          <h1 className="page-title">Food Items</h1>
          <p className="page-subtitle">Manage all menu items from here</p>
        </div>
      </div>

      <div className="list-stats">
        <div className="stat-chip">
          Total Items: <strong>{list.length}</strong>
        </div>
      </div>

      <div className="list-table-wrapper">
        <div className="list-table-head">
          <span>Image</span>
          <span>Name</span>
          <span>Category</span>
          <span>Price</span>
          <span>Action</span>
        </div>

        <div className="list-table-body">
          {list.length === 0 ? (
            <div className="list-empty">
              <div className="list-empty-icon">🍽️</div>
              <p>No food items found. Add your first item!</p>
            </div>
          ) : (
            list.map((item, index) => (
              <div key={index} className='list-table-row'>
                <img src={`${url}/images/` + item.image} alt={item.name} />
                <span className="row-name">{item.name}</span>
                <span className="category-badge">{item.category}</span>
                <span className="row-price">₹{item.price}</span>
                <button
                  onClick={() => removeFood(item._id)}
                  className='delete-btn'
                  title="Delete item"
                >
                  ✕
                </button>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  )
}

export default List