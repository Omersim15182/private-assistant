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
    const { messages} = req.body;
    const message = messages[0];
    console.log(message);
    await db.query('INSERT INTO messages (user_id, name,message, date) VALUES ($1, $2, $3,$4)', [message.id,message.name, message.message, message.date]);


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
