import express from 'express';
import { readFileSync } from 'fs';
import React from 'react';
import { renderToString } from 'react-dom/server';

import { App } from '../client/App';
import { handleModifiyAnswerUpVotes } from '../shared/utility';

const app = new express();

const data = {
    questions: [
        { questionId: 'Q1', content: 'Should we use Jquery or Fetch for Ajax ?'},
        { questionId: 'Q2', content: 'What is the best feature of React ?'}
    ],
    answers: [{
        answerId: "A1",
        questionId: "Q1",
        upvotes: 2,
        content: "JQuery"
    },
    {
        answerId: "A2",
        questionId: "Q1",
        upvotes: 1,
        content: "Fetch"
    },
    {
        answerId: "A3",
        questionId: "Q2",
        upvotes: 3,
        content: "Peformance"
    },
    {
        answerId: "A4",
        questionId: "Q2",
        upvotes: 2,
        content: "Component Based"
    }
]
}

app.use(express.static("dist"));

app.get('/', async(_req, res) => {
    const index = readFileSync(`public/index.html`, 'utf-8');
    const render = renderToString(<App  {...data}/>);
    res.send(index.replace("{{rendered}}", render));
    // res.send(`<h1>REACT IS EXCELLENT</h1>`);
});

app.get('/data', async (_req, res) => {
    res.json(data);
});

app.get("/vote/:answerId", (req, res)  =>{

    const { query, params } = req;
    data.answers = handleModifiyAnswerUpVotes(data.answers, params.answerId, +query.increment);
    res.send("OK");
});

app.listen(7777);
console.log("Server is listening");