const express = require('express');
const cors = require('cors');
const db = require('./dbConfig'); 
const { v4: uuidv4 } = require('uuid'); 
const cookieParser = require('cookie-parser');  
require('dotenv').config();

// Create an instance of Express
const app = express();

app.use(cookieParser());
app.use(cors());
app.use(express.json());

//Routes
const messgeRouter = require("../routes/Messages");
const homeRouter = require("../routes/LoginSignup");

app.use("/messages", messgeRouter);
app.use("/home", homeRouter);


// Start the server
const port = 3500;
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});


