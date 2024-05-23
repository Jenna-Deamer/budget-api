const authenticateUser = (req, res, next) => {
  // Check if the 'user' header exists in the request headers
  if (!req.headers.user) {
    return res.status(401).json({ error: "Unauthorized: User header missing" });
  }

  let userInfo;
  try {
    // Attempt to parse the 'user' header as JSON
    userInfo = JSON.parse(req.headers.user);
  } catch (error) {
    // If parsing fails, return a 400 Bad Request error
    return res
      .status(400)
      .json({ error: "Invalid user information in header" });
  }

  // Attach the user information to req.user
  req.user = userInfo;

  // Call the next middleware in the chain
  next();
};

module.exports = authenticateUser;
