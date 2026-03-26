import mongoose from "mongoose";

const foodSchema = new mongoose.Schema({
  name: {type:String, required:true},
  description: {type:String, required:true},
  price: {type:Number, required:true},
  image: {type:String, required:true},
  category: {type:String, required:true}
})

// (1st statement) if model already there, it will used and (2nd statement) when if it will not there it will create a new model
const foodModel = mongoose.models.food || mongoose.model("food",foodSchema);

export default foodModel;