const express = require('express');
const cors = require('cors');
const db = require('./dbConfig'); 
const { v4: uuidv4 } = require('uuid'); 

// Create an instance of Express
const app = express();

app.use(cors());
app.use(express.json());

//Get request to create key for each new contact
app.get('/createContactId',(req, res) => {
  const newId = { id: uuidv4() };
  res.json(newId);
})

//Post request to create a new message
app.post('/createMessage',async(req,res)=>{
  try{
    console.log(req.body);
    const {messages} = req.body;
    const message = messages[0];
    console.log(message);
    await db.query('INSERT INTO messages (user_id, name,message, date) VALUES ($1, $2, $3,$4)', [message.id,message.name, message.message, message.date]);
    res.status(200).json({message:'Message created seccessfully'});
  }  catch(error){
    console.error('Error creating message:',error);
    res.status(500).json({ error: 'An internal server error occurred' });
  }

})

//Get request to choose the contact's messages order the key
app.get('/messages/:userId',async(req,res)=>{
  try{
    const userId = req.params.userId;
    console.log(userId);
    const data = await db.query('SELECT * FROM messages WHERE user_id = $1', [userId]);
    res.json(data.rows);
  } catch(error) {
    console.error('Error in fetch messages oreder the key: ',error)
  }
})

//Get request to retrieve contacts from db
// app.get('/retrieveContact',async(req,res)=>{
//   try  {
//   const data = await db.query('SELECT DISTINCT user_id, name FROM messages')
//   res.json(data.rows);
//   } catch (error){
//     console.error('Error fetching contacts:', error);
//     res.status(500).json({ error: 'An internal server error occurred' });
//   }
// }) 

// Define a route
app.get('/', (req, res) => {
  res.send('Hello, World!');
});


// Start the server
const port = 3500;
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
