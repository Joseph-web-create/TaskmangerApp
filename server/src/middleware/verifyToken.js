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

  const extraction = token.split(" ")[1];

  try {
    const decodeToken =  jwt.verify(
      extraction,
      process.env.SECRET_ACESS_KEY
    );
    req.user = decodeToken;
    next();
  } catch (error) {
    next(error);
  }
};

export default verifyToken