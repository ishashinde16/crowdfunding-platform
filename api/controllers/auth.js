import { db } from "../db.js"
import bcrypt from "bcryptjs"
import jwt from "jsonwebtoken"

export const register = (req, res) => {
  // Check existing user
  const q = "SELECT * FROM users WHERE email = ? OR name = ?";

  db.query(q, [req.body.email, req.body.name], (err, data) => {
    if (err) return res.json(err);
    if (data.length) return res.status(409).json("User already exists!");

    // Hash the password and create a user
    const salt = bcrypt.genSaltSync(10); // FIX: Typo corrected
    const hash = bcrypt.hashSync(req.body.password, salt);

    const insertQuery = "INSERT INTO users(`name`, `email`, `password`) VALUES (?)";

    const values = [
      req.body.name,    // FIX: name instead of username
      req.body.email,
      hash,
    ];

    db.query(insertQuery, [values], (err, data) => {
      if (err) return res.json(err);
      return res.status(200).json("User has been created.");
    });
  });
};

export const login = (req, res) => {
  
  //CHECK USER
  const q = "SELECT * from users WHERE email=?"
  db.query(q, [req.body.email], (err, data) => {
    if (err) return res.json(err);
    if(data.length === 0) return res.status(404).json("User not found!");

    //check password
    const isPasswordCorrect = bcrypt.compareSync(req.body.password, data[0].password);

    if(!isPasswordCorrect) return res.status(400).json("Wrong email or password!");

    const token = jwt.sign({user_id:data[0].user_id}, "jwtkey");
    const {password, ...other} = data[0]

    res.cookie("access_token", token, {httpOnly:true}).status(200).json(other)
  });
};

export const logout = (req, res) => {
  // Implement logout later
};
