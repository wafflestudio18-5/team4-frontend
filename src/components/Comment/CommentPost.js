import {useState, Fragment} from 'react'
import {postCommentQuestion, postCommentAnswer} from '../../axios.ts'


export const CommentPostQuestion = (id_q) => {
    const [content, setContent] = useState("")
    return(
        <Fragment>
            <div className="comment-content">
                <input className="content-input" value={content} onChange={({target:{value}})=>setContent(value)}/>
            </div>
            <button className="comment-submit-btn" onClick={postCommentQuestion(id_q, content)}>
                POST Comment
            </button>
        </Fragment>
    )
}

export const CommentPostAnswer = (id_ans) => {
    const [content, setContent] = useState("")
    return(
        <Fragment>
            <div className="comment-content">
                <input className="content-input" value={content} onChange={({target:{value}})=>setContent(value)}/>
            </div>
            <button className="comment-submit-btn" onClick={postCommentAnswer(id_ans, content)}>
                POST Comment
            </button>
        </Fragment>
    )
}