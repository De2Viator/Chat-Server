import express from 'express';
const app = express();

app
.get('/chats',(req,res) => {
    res.send('chat was getted')
})
.post('/chats', (req,res) => {
    res.send('chat was posted')
})
.put('/chats/:id',(req,res) => {
    res.send('chat was updated')
})
.delete('/chats/:id',(req,res) => {
    res.send('chat was deleted')
})

app
.get('/messages',(req,res) => {
    res.send('chat was getted')
})
.post('/messages/:chatId', (req,res) => {
    res.send('chat was posted')
})
.put('/messages/:id',(req,res) => {
    res.send('chat was updated')
})
.delete('/messages/:id',(req,res) => {
    res.send('chat was deleted')
})

app.use(express.json());
app.use(express.urlencoded({
    extended:true
}));

app.listen(3000, () => {
  console.log("Listen port 3000");
});