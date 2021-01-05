import {useState, Fragment} from 'react'
import axios from 'axios'
import {Link} from 'react-router-dom'
import {useSelector} from 'react-redux' 

export const CommentPostQuestion = (id_q) => {
    const [content, setContent] = useState("")
    console.log(id_q.id);

    const isLoggedin = useSelector(state => state.isLoggedReducer.loggedin)
    const token = useSelector(state => state.userInfoReducer.token)

    if (!isLoggedin) {
        return (<div>
            Familiar Poblem? Sign in to leave a Comment
            <Link to="/signin">Signin</Link>
        </div>)
    }

    const instance = axios.create({
      baseURL: 'http://localhost:8000/api/',

      Authorization : 'Token ' + token
    });

    const postCommentonQuestion = () => {
        instance.post(`comment/question/${id_q.id}/`, {content: content})
            .then(res => {
                console.log(res);
            })
            .catch(e=>{
                console.log(e);
            })
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
            Something to say about the Answer? Sign in to leave a Comment 
            <Link to="/signin">Signin</Link>
        </div>)
    }

    const instance = axios.create({
      baseURL: 'http://localhost:8000/api/',

      headers: { 'Authorization' : 'Token ' + token },
    });

    const postCommentonAnswer = () => {
        instance.post(`comment/answer/${id_ans.id}/`, {content: content})
            .then(res => {
                console.log();
            })
            .catch(e =>{
                console.log(e);
            })
    }

    return(
        <Fragment>
            <div className="comment-content">   
                <input className="content-input" value={content} onChange={({target:{value}})=>setContent(value)}/>
            </div>
            <button className="comment-submit-btn" onClick={e => {postCommentonAnswer()}}>

                POST Comment to Answer
            </button>
        </Fragment>
    )
}