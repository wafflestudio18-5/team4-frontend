import React from 'react';
import QuestionItem from './QuestionItem'

const QuestionList = ({Questions}) => {
    const QuestionsMapped = Questions.map(Question => {return <QuestionItem key={Question.id} Question_info={Question}/>})
    return (<div className = "questionList">{QuestionsMapped}</div>)
}

export default QuestionList;