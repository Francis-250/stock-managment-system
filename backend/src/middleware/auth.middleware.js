import jwt from "jsonwebtoken";

export const verifyToken = async (req, res, next) => {
  console.log("🔍 VerifyToken - Checking cookies:", req.cookies);
  console.log("🔍 VerifyToken - Headers:", req.headers);

  const token = req.cookies?.token;

  if (!token) {
    console.log("❌ No token found in cookies");
    console.log("🍪 All cookies:", req.cookies);
    return res.status(401).json({ message: "No User Login Again" });
  }

  try {
    const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
    console.log("✅ Token verified for user:", decodedToken.id);
    req.user = decodedToken;
    next();
  } catch (error) {
    console.log("❌ Token verification failed:", error.message);
    return res.status(401).json({ message: "Invalid token" });
  }
};

export const authorizedRole = (roles) => {
  return (req, res, next) => {
    const userRole = req.user?.role;
    if (!userRole || !roles.includes(userRole)) {
      return res.status(403).json({ message: "Unauthorized" });
    }
    next();
  };
};
