import express from "express";
import { Message } from "../../db/schemas/Message";
export const routerMessages = express.Router();

routerMessages
  .get("/", async (req, res) => {
    const messages = await Message.find({chatId: req.query.chatId});
    res.status(200).send(messages);
  })
