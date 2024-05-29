const express = require('express');
const cors = require('cors');
const db = require('./dbConfig'); 
const { v4: uuidv4 } = require('uuid'); 

// Create an instance of Express
const app = express();

app.use(cors());
app.use(express.json());

//Routes
const router = require("../routes/Messages");
app.use("/messages", router);

// Start the server
const port = 3500;
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
