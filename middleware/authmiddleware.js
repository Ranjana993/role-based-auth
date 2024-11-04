const jwt = require("jsonwebtoken");

const verifyToken = async (req, res, next) => {
  // Retrieve token from body, query, or headers
  const token = req.body.token || req.query.token || req.headers["authorization"];
// console.log(token);

  // Check if token is provided
  if (!token) {
    return res.status(403).json({ success: false, message: "Token is required" });
  }

  try {
    // Check if token follows 'Bearer <token>' format
    const bearer = token.split(" ");
    // console.log(bearer);
    
    if (bearer[0] !== "Bearer" || !bearer[1]) {
      return res.status(400).json({ success: false, message: "Invalid token format" });
    }

    // Verify the token
    const decodedData = await jwt.verify(bearer[1], process.env.ACESS_SECRET_TOKEN);
    req.user = decodedData.user;
  } catch (error) {
    return res.status(401).json({ success: false, message: "Invalid token", error });
  }

  return next();
};

module.exports = verifyToken;
