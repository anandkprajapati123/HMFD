import React, { useState } from "react";
import "./Add.css";
import { assets } from "../../assets/assets";
import axios from "axios";
import { toast } from "react-toastify";

const Add = ({ url }) => {
  const [image, setImage] = useState(false);
  const [data, setData] = useState({
    name: "",
    description: "",
    price: "",
    category: "Indian Food",
  });

  const onChangeHandler = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setData((data) => ({ ...data, [name]: value }));
  };

  const onSubmitHandler = async (event) => {
    event.preventDefault();
    const formData = new FormData();
    formData.append("name", data.name);
    formData.append("description", data.description);
    formData.append("price", Number(data.price));
    formData.append("category", data.category);
    formData.append("image", image);
    const response = await axios.post(`${url}/api/food/add`, formData);
    if (response.data.success) {
      setData({
        name: "",
        description: "",
        price: "",
        category: "Indian Food",
      });
      setImage(false);
      toast.success(response.data.message);
    } else {
      toast.error(response.data.message);
    }
  };

  return (
    <div className="add-page">
      <div className="page-header">
        <h1 className="page-title">Add New Food Item</h1>
        <p className="page-subtitle">Fill in the details to add a new item to the menu</p>
      </div>

      <div className="add-form-card">
        <form onSubmit={onSubmitHandler}>

          {/* Image Upload */}
          <div className="upload-area">
            <label className="upload-label">Product Image <span>*</span></label>
            <label htmlFor="image" className="upload-box">
              <img
                src={image ? URL.createObjectURL(image) : assets.upload_area}
                alt="Upload preview"
              />
            </label>
            <p className="upload-hint">Click to upload — PNG, JPG up to 5MB</p>
            <input
              onChange={(e) => setImage(e.target.files[0])}
              type="file"
              id="image"
              hidden
              required
            />
          </div>

          <div className="form-divider" />

          {/* Product Name */}
          <div className="form-group">
            <label className="form-label">Product Name <span>*</span></label>
            <input
              className="form-input"
              onChange={onChangeHandler}
              value={data.name}
              type="text"
              name="name"
              placeholder="e.g. Chicken Biryani"
              required
            />
          </div>

          {/* Description */}
          <div className="form-group">
            <label className="form-label">Description <span>*</span></label>
            <textarea
              className="form-textarea"
              onChange={onChangeHandler}
              value={data.description}
              name="description"
              placeholder="Write a short description of the dish..."
              required
            />
          </div>

          {/* Category & Price */}
          <div className="form-row">
            <div className="form-group">
              <label className="form-label">Category <span>*</span></label>
              <select
                className="form-select"
                onChange={onChangeHandler}
                name="category"
                value={data.category}
              >
                <option value="Indian Food">Indian Food</option>
                <option value="Salad">Salad</option>
                <option value="Non Veg">Non Veg</option>
                <option value="Sandwich">Sandwich</option>
                <option value="Cake">Cake</option>
                <option value="Pure Veg">Pure Veg</option>
                <option value="Pasta">Pasta</option>
                <option value="Noodles">Noodles</option>
              </select>
            </div>

            <div className="form-group">
              <label className="form-label">Price (₹) <span>*</span></label>
              <input
                className="form-input"
                onChange={onChangeHandler}
                value={data.price}
                type="number"
                name="price"
                placeholder="e.g. 120"
                min="1"
                required
              />
            </div>
          </div>

          <div className="form-divider" />

          <button type="submit" className="submit-btn">
            + Add Food Item
          </button>
        </form>
      </div>
    </div>
  );
};

export default Add;
