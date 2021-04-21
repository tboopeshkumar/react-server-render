import React from 'react';
export const App = ({questions, answers, handleModifiyAnswerVotes}) => ( 
    <div>
        <h1>Q and A Tool</h1>
        {
            questions.map(({questionId, content}) => (
                <div key={questionId}>
                    <h3>{content}</h3>
                    <div>
                        {
                            answers.filter(a => a.questionId == questionId)
                            .map(({content, upvotes, answerId}) => (
                                <div key={answerId}>
                                    <span> { content } - { upvotes}</span>
                                    <button onClick={()=> handleModifiyAnswerVotes(answerId, 1)}>+</button>
                                    <button onClick={()=> handleModifiyAnswerVotes(answerId, -1)}>-</button>
                                 </div>
                            ))
                        }
                    </div>
                </div>
            ))
        }
    </div>
)
