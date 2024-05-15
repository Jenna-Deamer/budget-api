const express = require('express');
const router = express.Router();
const passport = require('passport');
const User = require('../models/user');  

// Get all users
router.get("/", async (req, res) => {
    try {
        const users = await User.find().sort({ date: -1 });
        res.status(200).json(users); // 200: OK
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Could not retrieve users' });
    }
});

// Register Route
router.post('/register', async (req, res) => {
    //check if username already exists
    try {
        const existingUser = await User.findOne({ username: req.body.username });
        if (existingUser) {
            return res.status(400).json({ error: 'Username already exists' });
        }
        // Register the user if no matching username found
        await User.register(new User({ username: req.body.username }), req.body.password);
        res.status(201).json({ message: 'User created successfully' });
        //handle any errors
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Could not create user' });
    }
});

// Login Route
router.post('/login', async (req, res, next) => {
    try {
        passport.authenticate('local', (err, user, info) => {
            if (err) {
                console.error(err);
                return res.status(500).json({ error: 'Internal Server Error' });
            }
            if (!user) {
                return res.status(401).json({ error: 'Invalid login credentials' });
            }
            req.logIn(user, (err) => {
                if (err) {
                    console.error(err);
                    return res.status(500).json({ error: 'Could not log in user' });
                }
                return res.status(200).json({ message: 'Login successful' });
            });
        })(req, res, next);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

// Logout Route
router.get('/logout', (req, res) => {
    req.logout();
    res.status(200).json({ message: 'Logout successful' });
});

module.exports = router;
