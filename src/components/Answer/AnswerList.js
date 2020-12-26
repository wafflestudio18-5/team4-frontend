import React from 'react';
import AnswerBox from './AnswerBox'

const AnswerList = (Answers) => {
    const AnswersMapped = Answers.map(Answer => {return <AnswerBox Answer = {Answer}/>})
    return (<div className = "answer-list">{AnswersMapped}</div>)
}

export default AnswerList;