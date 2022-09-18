import { Chat } from ".././../db/schemas/Chat";
import express from "express";

export const routerChat = express.Router();

routerChat
  .get("/:id", async (req, res) => {
    const chats = await Chat.find({userId: req.params.id});
    res.status(200).send(chats);
  })
  .delete("/:id", async (req, res) => {
    const deleted = await Chat.findByIdAndDelete(req.params.id);
    res.status(204).send(deleted);
  });
