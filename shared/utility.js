export function handleModifiyAnswerUpVotes(answers, answerId, increment){
    return answers = answers.map(a =>{
        if(a.answerId !== answerId)
            return a;
         else 
            return {...a, upvotes: a.upvotes + increment}  
    });
   
}
