import express from 'express';
import fetch from 'isomorphic-fetch';

const app = express();

app.use(express.json());
app.use(express.urlencoded({
    extended:true
}));

app
.get('/chats',async (req,res) => {
    const info = await fetch('http://localhost:3000/users').then(resp => resp.json());
    res.send(info)
})
.post('/chats',async (req,res) => {
    const info = await fetch('http://localhost:3000/users', {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(req.body)
    })
    res.send(info)
})
.put('/chats/:id',async (req,res) => {
    const info = await fetch('http://localhost:3000/users/'+ req.params.id, {
        method: 'PUT',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(req.body)
    })
    res.send(info)
})
.delete('/chats/:id',async (req,res) => {
    const info = await fetch('http://localhost:3000/users/' + req.params.id, {
        method: 'DELETE',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
    })
    res.send(info)
})

app
.get('/messages/:chatId',async (req,res) => {
    const info = await fetch('http://localhost:3000/users/'+req.params.chatId).then(resp => resp.json());
    res.send(info)
})
.post('/messages/:chatId',async (req,res) => {
    const info = await fetch('http://localhost:3000/users/'+req.params.chatId+'/chats', {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(req.body)
    }).then(resp => resp.json());
    res.send(info)
})
.put('/messages/:id',async (req,res) => {
    const info = await fetch('http://localhost:3000/users/'+ req.params.id, {
        method: 'PUT',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(req.body)
    })
    res.send(info)
})
.delete('/messages/:id',async (req,res) => {
    const info = await fetch('http://localhost:3000/users/' + req.params.id, {
        method: 'DELETE',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
    })
    res.send(info)
})

app.use(express.json());
app.use(express.urlencoded({
    extended:true
}));

app.listen(3030, () => {
  console.log("Listen port 3030");
});