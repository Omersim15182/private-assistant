const express = require('express');
const router = express.Router();
const db = require('../dbConfig'); 
const { v4: uuidv4 } = require('uuid'); 
const checkAuth = require('../middlewares/checkAuth');

router.use(checkAuth);
//Get request to create key for each new contact
router.get('/createContactId',(req, res) => {
    const newId = { id: uuidv4() };
    res.json(newId);
  })
  
  //Post request to create a new message
router.post('/createMessage',async(req,res)=>{
    try{
      const {messages} = req.body;
      const message = messages[0];
      console.log('message:',message);
      await db.query('INSERT INTO messages (from_id, to_id,message, date) VALUES ($1, $2, $3,$4)', [message.from,message.to, message.message, message.date]);
      res.status(200).json({message:'Message created seccessfully'});
    }  catch(error){
      console.error('Error creating message:',error);
      res.status(500).json({ error: 'An internal server error occurred' });
    }
  
  })
  
  //Get request to choose the contact's messages order the key
  router.get('/:userId',async(req,res)=>{
    try{
      const userId = req.params.userId;
      const data = await db.query('SELECT * FROM messages WHERE id = $1', [userId]);
      res.json(data.rows);
    } catch(error) {
      console.error('Error in fetch messages oreder the key: ',error)
    }
  })
  
  //Get request to retrieve contacts from db
  router.get('/messages/retrieveContact',async(req,res)=>{
    try  {
      const data = await db.query('SELECT DISTINCT id, name FROM users');
      console.log('Data retrieved from DB:', data.rows);
      res.json(data.rows);
    } catch (error){
      console.error('Error fetching contacts:', error);
      res.status(500).json({ error: 'An internal server error occurred' });
    }
  }) 

  module.exports = router;