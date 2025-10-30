import jwt from "jsonwebtoken";

export const generateAppToken = () => {
  return jwt.sign( 
    {app: process.env.APP_NAME },
    process.env.APP_SECRET
  );
}

export const generateUserToken = (user) => {
  return jwt.sign(
    { id: user._id, email: user.email },
    process.env.JWT_SECRET,
    { expiresIn: "30d" }
  );
};

