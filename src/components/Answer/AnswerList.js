import React from 'react';
import AnswerBox from './AnswerBox'

const AnswerList = (Answers, num, is_author) => {
    console.log(num);
    console.log(is_author);
    console.log(Answers.Answers);
    console.log(Answers.Answers.length);
    const len = Answers.Answers.length
    var L = new Array()
    var i;
    for (i=0; i < len; i++) {
        L.push(i)
    }
    console.log(L);
    return (<div className = "answer-list">{L.map((number) => (<AnswerBox Answer = {Answers.Answers[number]}/>))}</div>)
}

export default AnswerList;