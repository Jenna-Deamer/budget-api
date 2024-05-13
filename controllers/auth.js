const express = require('express');
const router = express.Router();
const passport = require('passport');
const User = require('../models/user');

// Get all users
router.get("/", async (req, res, next) => {
    try {
      let users = await User.find().sort({ date: -1 });
      return res.json(users).status(200); //200: OK
    } catch (err) {
      return res.json({ error: 'Could not retrieve users' }).status(500);
    }
});

// Register Route
router.post('/register', async (req, res) => {
    try {
        // Check if the username already exists
        const existingUser = await User.findOne({ username: req.body.username });
        if (existingUser) {
            return res.status(400).json({ error: 'Username already exists' });
        }

        // passport-local-mongoose will automatically hash the password
        await User.register(new User({ username: req.body.username }), req.body.password);
        return res.status(201).json({ message: 'User created successfully' });
    } catch (err) {
        console.error(err);
        return res.status(500).json({ error: 'Could not create user' });
    }
});

// Login Route
router.post('/login', (req, res, next) => {
    passport.authenticate('local', (err, user, info) => {
        if (err) {
            return res.status(500).json({ error: err });
        }
        if (!user) {
            return res.status(401).json({ error: 'Invalid login' });
        }
        req.logIn(user, (err) => {
            if (err) {
                return res.status(500).json({ error: 'Could not log in user' });
            }
            return res.status(200).json({ message: 'Login successful' });
        });
    })(req, res, next);
});

// Logout Route
router.get('/logout', (req, res) => {
    req.logout();
    res.status(200).json({ message: 'Logout successful' });
});

module.exports = router;
