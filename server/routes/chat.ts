import { Chat } from ".././../db/schemas/Chat";
import express from "express";

export const routerChat = express.Router();

routerChat
  .get("/", async (req, res) => {
    const chats = await Chat.find();
    res.status(200).send(chats);
  })
  .post("/", async (req, res) => {
    const create = await Chat.create({
      name: req.body.name,
      users: [...JSON.parse(req.body.users)]
    });
    res.status(201).send(create);
  })
  .put("/:id", async (req, res) => {
    const updated = await Chat.findByIdAndUpdate(req.params.id, {
      name: req.body.name,
      users: [...req.body.users]
    });
    res.status(200).send(updated);
  })
  .delete("/:id", async (req, res) => {
    const deleted = await Chat.findByIdAndDelete(req.params.id);
    res.status(204).send(deleted);
  });
