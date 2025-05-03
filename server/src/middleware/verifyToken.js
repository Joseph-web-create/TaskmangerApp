import createHttpError from "http-errors";
import jwt from "jsonwebtoken";

const verifyToken = (req, res, next) => {
  const { authorization: token } = req.headers;

  if (!token) {
    return next(createHttpError(403, "You're unathenticated"));
  }

  if (!token.startsWith("Bearer")) {
    return next(createHttpError(401, "Token format is invalid"));
  }

  try {
    const extraction = token.split(" ")[1];

    const decodeToken = jwt.verify(extraction, process.env.SECRET_ACESS_KEY);
    req.user = decodeToken;
    next();
  } catch (error) {
    if (error.name === "JsonWebTokenError") {
      return next(createHttpError(401, "Invalid or malformed token"));
    } else if (error.name === "TokenExpiredError") {
      return next(createHttpError(401, "Token has expired"));
    } else {
      return next(createHttpError(500, "Authentication failed"));
    }
  }
};

export default verifyToken;
