const express = require("express");
const router = express.Router();
const passport = require("passport");
const User = require("../models/user");

// Get all users
router.get("/", async (req, res) => {
  try {
    const users = await User.find().sort({ date: -1 });
    res.status(200).json(users); // 200: OK
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Could not retrieve users" });
  }
});

// Register Route
router.post("/register", async (req, res) => {
  //check if username already exists
  try {
    const existingUser = await User.findOne({ username: req.body.username });
    if (existingUser) {
      return res.status(400).json({ error: "Username already exists" });
    }
    // Register the user if no matching username found
    await User.register(
      new User({ username: req.body.username }),
      req.body.password
    );
    res.status(201).json({ message: "User created successfully" });
    //handle any errors
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Could not create user" });
  }
});


// Check Username Availability 
router.get("/checkUsername/:username", async (req, res) => {
  try {
    const existingUser = await User.findOne({ username: req.params.username });
    res.status(200).json({ available: !existingUser }); // Return true if username is available, false otherwise
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Server error" });
  }
});

// Login Route
router.post("/login", async (req, res, next) => {
  try {
    // Authenticate the user using Passport's 'local' strategy
    passport.authenticate("local", (err, user, info) => {
        // Handle any errors that occur during authentication
      if (err) {
        console.error(err);
        return res.status(500).json({ error: "Internal Server Error" });
      }
      // If authentication fails, return a 401 Unauthorized status with an error message
      if (!user) {
        return res.status(401).json({ error: "Invalid login credentials" });
      }
      //log user in
      req.logIn(user, (err) => {
        //handle other errors during login
        if (err) {
          console.error(err);
          return res.status(500).json({ error: "Could not log in user" });
        }
        // On successful login, return a 200 OK status with a success message and the user object
        return res.status(200).json({
          message: "Login successful",
          user: {
            id: user._id,
            username: user.username,
          },
        });
      });
    })(req, res, next); // Invoke the authenticate function with req, res, and next
  } catch (err) {
     // Handle any other errors that occur
    console.error(err);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// Logout Route
exports.logout = (req, res) => {
    req.logout((err) => {
        if (err) {
            return res.status(500).json({ message: 'An error occurred while logging out.' });
        }
        res.json({ message: 'Logout successful.' });
    });
};


module.exports = router;
