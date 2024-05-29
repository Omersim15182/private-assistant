const express = require('express');
const router = express.Router();
const db = require('../server/dbConfig'); 
const pool = require('../server/dbConfig');

router.post('/login', async (req, res) => {
    const { name, password } = req.body;
    try {
        const query = 'SELECT * FROM users WHERE name = $1 AND password = $2';
        const result = await pool.query(query, [name, password]);
        const user = result.rows[0];
        if (!user) {
            return res.status(401).json({ message: 'Invalid credentials' });
        }
        const token = 'test';
        res.status(200).json({ token });
    } catch (error) {
        console.error('Error during login:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
});
router.post('/Sign-in',(req,res)=>{

})


module.exports = router;