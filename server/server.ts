import express from 'express';
import mongoose from 'mongoose';
import { Message } from '../db/schemas/Message';
import { Chat } from '../db/schemas/Chat';
mongoose.connect('mongodb://localhost:27017/local')

const app = express();

app.use(express.json());
app.use(express.urlencoded({
    extended:true
}));

app
.get('/chats',async (req,res) => {
    const chats = await Chat.find()
    res.status(200).send(chats)
})
.post('/chats',async (req,res) => {
    const create = await Chat.create({
        name:req.body.name
    })
    res.status(201).send(create)
})
.put('/chats/:id',async (req,res) => {
    const updated = await Chat.findByIdAndUpdate(req.params.id, {
        name:req.body.name
    });
    res.status(200).send(updated)
})
.delete('/chats/:id',async (req,res) => {
    const deleted = await Chat.findByIdAndDelete(req.params.id)
    res.status(204).send(deleted);
})


app
.get('/messages/:chatId',async (req,res) => {
    const messages = await Message.find({chatId:req.params.chatId})
    res.status(200).send(messages)
})
.post('/messages/:chatId',async (req,res) => {
    const addedMessage = await Message.create({
        name:req.body.name,
        message:req.body.message,
        chatId:req.params.chatId,
    })
    res.send(addedMessage)
})
.put('/messages/:id',async (req,res) => {
    const updatedMessage = await Message.findByIdAndUpdate(req.params.id, {
        name: req.body.name,
        message: req.body.message,
    });
    res.status(200).send(updatedMessage);
})
.delete('/messages/:id',async (req,res) => {
    const deletedMessage = await Message.findByIdAndDelete(req.params.id)
    res.send(deletedMessage)
})

app.listen(3030, () => {
  console.log("Application listen http://localhost:3030/");
});