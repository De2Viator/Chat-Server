import express from "express";
import { Chat } from "../../db/schemas/Chat";
export const routerMessages = express.Router();

routerMessages
  .get("/", async (req, res) => {
    const messages = await Chat.find({chatId: req.query.chatId});
    res.status(200).send(messages);
  })
