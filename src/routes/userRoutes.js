const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const generateAccessToken = require('../utils/token');

router.post('/signup', async (req, res) => {
    try {
        const userData = req.body;
        const result = await userController.createUser(userData);
        return res.status(201).json(result);
    } catch (error) {
        if (error.message === 'Username already exists') {
            return res.status(400).json({ message: error.message });
        }
        console.error('Error in signup:', error);
        return res.status(500).json({ message: 'Internal server error' });
    }
});
router.post('/login', async (req, res) => {
    const { username, password } = req.body;
    debugger
    try {
        const result = await userController.getUserByUsername(username,password);
        return res.status(200).json({
            message: 'Log in successfully!',
            validAuthorization: generateAccessToken(username),
            wishList: result.wishList,
            firstName: result.firstName,
            lastName: result.lastName,
            profileImageURL: result.profileImageURL
        });
    } catch (error) {
        if (error.message === 'Password incorrect') {
            return res.status(401).json({ message: 'Password incorrect' });
        }
        else if (error.message === 'Invalid username or password'){
            return res.status(401).json({ message: 'Invalid username or password' });
        }
        console.error('Login error:', error);
        return res.status(500).send('Login error');
    }
});

module.exports = router;
