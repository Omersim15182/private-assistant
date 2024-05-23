const express = require('express');
const cors = require('cors');
const db = require('./dbConfig'); // Assuming dbConfig.js contains the database configuration

// Create an instance of Express
const app = express();

app.use(cors());
app.use(express.json()); 

// POST endpoint for creating a new message
app.post('/createMessage',async(req,res) => {
  try {
    console.log(req.body);
    const {id , name, messages} = req.body;
    const message = messages[0].message;
    const date = new Date(messages[0].date).toISOString();
    
    await db.query('INSERT INTO users (id, name) VALUES ($1, $2)', [id, name]);
    await db.query('INSERT INTO messages (user_id, message, date) VALUES ($1, $2, $3)', [id, message, date]);


    res.status(200).json({message:'Message created seccessfully'});
  } catch(error) {
    console.error('Error creating message:',error);
    res.status(500).json({ error: 'An internal server error occurred' });
  }
})

// Define a route
app.get('/', (req, res) => {
  res.send('Hello, World!');
});


// Start the server
const port = 3500;
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
