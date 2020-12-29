import {useState, Fragment} from 'react'
import {commentOnQuestion, commentOnAnswer} from '../../axios.ts'


export const CommentPostQuestion = (id_q) => {
    const [content, setContent] = useState("")
    return(
        <Fragment className="question-comment-box">
            <div className="comment-content">
                <input className="content-input" value={content} onChange={({target:{value}})=>setContent(value)}/>
            </div>
            <button className="comment-submit-btn" onClick={commentOnQuestion(id_q, content)}>
                POST Comment
            </button>
        </Fragment>
    )
}

export const CommentPostAnswer = (id_ans) => {
    const [content, setContent] = useState("")
    return(
        <Fragment className="question-comment-box">
            <div className="comment-content">
                <input className="content-input" value={content} onChange={({target:{value}})=>setContent(value)}/>
            </div>
            <button className="comment-submit-btn" onClick={commentOnAnswer(id_ans, content)}>
                POST Comment
            </button>
        </Fragment>
    )
}