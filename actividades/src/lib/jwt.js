import "dotenv/config";

export const verifyToken = (token) => jwt.verify(token, process.env.JWT_SECRET);
