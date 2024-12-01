const mongoose = require('mongoose');
const uri = "mongodb+srv://vermaaman714600:Aman%40600@cluster0.9o1c3rp.mongodb.net/employees?retryWrites=true&w=majority";
const clientOptions = {
  serverApi: {
    version: '1',
    strict: true,
    deprecationErrors: true
  },
  useNewUrlParser: true,
  useUnifiedTopology: true
};

async function connectDB() {
  try {
    await mongoose.connect(uri, clientOptions);
    console.log("Connected to MongoDB Atlas!");
  } catch (error) {
    console.error("MongoDB connection error:", error);
    process.exit(1); 
  }
}

connectDB();

module.exports = connectDB;


