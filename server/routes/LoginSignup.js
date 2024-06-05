const express = require('express');
const router = express.Router();
const pool = require('../dbConfig');
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
const cookieParser = require('cookie-parser');

dotenv.config();



// Function to generate JWT access token
function generateAccessToken(username) {
    return jwt.sign({ username: username.name }, process.env.TOKEN_SECRET, { expiresIn: '1800s' });
}

router.post('/login', async (req, res) => {
    const { name, password } = req.body;
    try {
        const query = 'SELECT * FROM users WHERE name = $1 AND password = $2';
        const result = await pool.query(query, [name, password]);
        const user = result.rows[0];
        if (!user) {
            return res.status(401).json({ message: 'Invalid credentials' });
        }
        const token = jwt.sign({ name: user.name, password: user.password }, process.env.TOKEN_SECRET, { expiresIn: '1h' });
        res.cookie('token', token, {
            secure: process.env.NODE_ENV === 'production', 
            sameSite: 'Strict',
            path:'/',
            maxAge: 3600000 ,
            httpOnly:true,
        });
        res.status(200).json({ token });
    } catch (error) {
        console.error('Error during login:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
});

router.post('/signup', async (req, res) => {
  const {email , name , password} = req.body;
  try{
   const result = await pool.query('INSERT INTO users (email , name , password) VALUES ($1,$2,$3)',[email,name,password]);
   res.status(200).json({Signup : 'Sign up success'})
  }catch(error){
    console.error('Error :',error);
  }
})



module.exports = router;