import express from "express";
import { Message } from "../../db/schemas/Message";
export const routerMessages = express.Router();

routerMessages
  .get("/:chatId", async (req, res) => {
    const messages = await Message.find({ chatId: req.params.chatId });
    res.status(200).send(messages);
  })
  .post("/:chatId", async (req, res) => {
    const addedMessage = await Message.create({
      name: req.body.name,
      message: req.body.message,
      chatId: req.params.chatId,
    });
    res.send(addedMessage);
  })
  .put("/:id", async (req, res) => {
    const updatedMessage = await Message.findByIdAndUpdate(req.params.id, {
      name: req.body.name,
      message: req.body.message,
    });
    res.status(200).send(updatedMessage);
  })
  .delete("/:id", async (req, res) => {
    const deletedMessage = await Message.findByIdAndDelete(req.params.id);
    res.send(deletedMessage);
  });
