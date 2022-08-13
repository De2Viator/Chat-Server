import express from 'express';
import fetch from 'isomorphic-fetch';

const app = express();

app.get('/',async (req,res) => {
    const news = await fetch('https://www.reddit.com/r/Wallstreetbets/top.json?limit=10&t=year').then(resp => resp.json());
    res.send(news.data);
})
app.listen(3030)