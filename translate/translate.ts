import axios from "axios";
import express from "express";
import {Request, Response} from 'express'
const app = express();
app.get("/", (req:Request,res:Response) => {
  const encodedParams = new URLSearchParams();
  encodedParams.append("q", req.query.word as string);
  encodedParams.append("target", req.query.target as string);
  encodedParams.append("source", req.query.source as string);

  const options = {
    method: "POST",
    url: "https://google-translate1.p.rapidapi.com/language/translate/v2",
    headers: {
      "content-type": "application/x-www-form-urlencoded",
      "Accept-Encoding": "application/gzip",
      "X-RapidAPI-Key": "8629fe3a32mshfde932adf8f0559p15ca32jsnf3a20f36fd3b",
      "X-RapidAPI-Host": "google-translate1.p.rapidapi.com",
    },
    data: encodedParams,
  };

  axios.request(options)
    .then((response) => { res.send(response.data.data.translations[0].translatedText);})
    .catch((error) => {console.error(error);});
});

app.listen(3030,() => {
  console.log('3030 is listening')
})