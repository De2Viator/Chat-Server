import { User } from ".././../db/schemas/User";
import express from "express";
import fs from "fs";

export const routerUser = express.Router();

routerUser
.get("/", async (req, res) => {
  const users = await User.find({}, { nick: 1, id: 1, photo: 1 });
  users.forEach((user,i) => {
    users[i].photo.data = fs.readFileSync(`D:/Node/uploads/${user.photo.data}`,'base64'); 
  });
  res.status(200).send(users);
}).get('/search', async (req,res) => {
  const users = await User.find({nick: {$regex: `${req.query.nick}`}}, { nick: 1, id: 1, photo: 1 });
  users.forEach((user,i) => {
    users[i].photo.data = fs.readFileSync(`D:/Node/uploads/${user.photo.data}`,'base64'); 
  });
  res.status(200).send(users);
});
