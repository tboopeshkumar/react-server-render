import React from 'react';
import ReactDOM from 'react-dom';
import { App } from './App';
import { handleModifiyAnswerUpVotes } from '../shared/utility';

// ReactDOM.render( <App /> , document.querySelector('#Container'))

let state = undefined;

fetch("http://localhost:7777/data")
.then(data => data.json())
.then(json =>{
    state = json;
    console.log("got the state", state);
    render();
})

function handleVote(answerId, increment) {
    state.answers = handleModifiyAnswerUpVotes(state.answers, answerId, increment);
    fetch(`vote/${answerId}?increment=${increment}`);
    render();
}

function render () {
    ReactDOM.hydrate( <App {...state} handleModifiyAnswerVotes={handleVote} /> , document.querySelector('#Container'))
}

