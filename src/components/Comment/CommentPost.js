import {useState, Fragment} from 'react'
import {commentOnQuestion, commentOnAnswer} from '../../axios.ts'
import axios from 'axios'
import {useSelector, useDispatch} from 'react-redux' 

export const CommentPostQuestion = (id_q) => {
    const [content, setContent] = useState("")
    console.log(id_q.id);

    const isLoggedin = useSelector(state => state.isLoggedReducer.loggedin)
    const token = useSelector(state => state.userInfoReducer.token)

    if (!isLoggedin) {
        return (<div>
            You are not Logged in!
        </div>)
    }

    const instance = axios.create({
      baseURL: 'http://localhost:8000/',
      headers: { 'Authorization' : 'Token ' + token },
    });

    const postCommentonQuestion = () => {
        instance.post(`comment/question/${id_q.id}/`, {content: content})
    }

    return(
        <Fragment>
            <div className="comment-content">
                <input className="content-input" value={content} onChange={({target:{value}})=>setContent(value)}/>
            </div>
            <button className="comment-submit-btn" onClick={e => {postCommentonQuestion()}}>
                POST Comment to Question
            </button>
        </Fragment>
    )
}

export const CommentPostAnswer = (id_ans) => {

    console.log(id_ans.id);
    const [content, setContent] = useState("")

    const isLoggedin = useSelector(state => state.isLoggedReducer.loggedin)
    const token = useSelector(state => state.userInfoReducer.token)

    if (!isLoggedin) {
        return (<div>
            You are not Logged in!
        </div>)
    }

    const instance = axios.create({
      baseURL: 'http://localhost:8000/',
      headers: { 'Authorization' : 'Token ' + token },
    });

    const postCommentonAnswer = () => {
        instance.post(`comment/answer/${id_ans.id}/`, {content: content})
    }

    return(
        <Fragment>
            <div className="comment-content">
                <input className="content-input" value={content} onChange={({target:{value}})=>setContent(value)}/>
            </div>
            <button className="comment-submit-btn" onClick={postCommentonAnswer()}>
                POST Comment to Answer
            </button>
        </Fragment>
    )
}