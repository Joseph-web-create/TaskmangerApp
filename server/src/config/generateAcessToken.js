import jwt from "jsonwebtoken";

const generateToken = (id) => {
  return jwt.sign({ id }, process.env.SECRET_ACESS_KEY, {
    expiresIn: "1h",
  });
};

export default generateToken;
