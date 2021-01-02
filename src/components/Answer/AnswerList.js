import React from 'react';
import AnswerBox from './AnswerBox'

const AnswerList = (Answers) => {
    console.log(Answers);
    const Answer_num = Answers.length
    var res = (<div></div>)
    for (var i=0; i<Answer_num; i++) {
        res = res + (<AnswerBox Answer = {Answers.i.content}/>)
    }
    return (<div className = "answer-list">{res}</div>)
}

export default AnswerList;