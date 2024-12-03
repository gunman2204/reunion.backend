const express = require('express');
// const dotenv = require('dotenv');
const connectDB = require('./config/db');
const cors = require('cors');
const authRoutes=require('./routes/authRoutes')

// dotenv.config();
connectDB();

const app = express();

app.use(cors({
  origin: 'http://localhost:3001' // Allow requests from this origin
}));

app.use(express.json());
app.use('/',authRoutes);
app.use('/delete',authRoutes)
app.use('/tasks',authRoutes)
app.use('/add',authRoutes)
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
