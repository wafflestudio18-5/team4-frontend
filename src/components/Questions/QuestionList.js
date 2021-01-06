import React from 'react';
import QuestionItem from './QuestionItem'

const QuestionList = (Questions) => {
    console.log(Questions);
    const QuestionsMapped = Questions.Questions.map(Question => {return <QuestionItem Question_info={Question}/>})

    return (<div style = {{width: '100%'}}>{QuestionsMapped}</div>)
}

export default QuestionList;