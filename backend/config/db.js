import mongoose from "mongoose";

export const connectDB = async () => {
  await mongoose.connect('mongodb://anandkprajapati321_db_user:Prajapati12345@ac-dptnuvs-shard-00-00.axykwyu.mongodb.net:27017,ac-dptnuvs-shard-00-01.axykwyu.mongodb.net:27017,ac-dptnuvs-shard-00-02.axykwyu.mongodb.net:27017/?ssl=true&replicaSet=atlas-gs48e5-shard-0&authSource=admin&appName=Cluster0').then(()=>console.log("DB Connected"));
};