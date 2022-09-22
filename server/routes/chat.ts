import { Chat } from ".././../db/schemas/Chat";
import express from "express";
import fs from 'fs';

export const routerChat = express.Router();

routerChat
  .get("/:id", async (req, res) => {
    let chats = await Chat.find({$or:[{userId: req.params.id}, {partnerId:req.params.id}]});
    for(const chat of chats) {
      chat.partner.photo.data = fs.readFileSync(`D:/Node/uploads/${chat.partner.photo.data }`,'base64');
      chat.user.photo.data = fs.readFileSync(`D:/Node/uploads/${chat.user.photo.data }`,'base64');
    }
    res.status(200).send(chats ?? []);
  })
  .delete("/:id", async (req, res) => {
    const deleted = await Chat.findByIdAndDelete(req.params.id);
    res.status(204).send(deleted);
  });
