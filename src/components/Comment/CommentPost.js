import {useState, Fragment} from 'react'
import axios from 'axios'
import {Link, useHistory} from 'react-router-dom'
import {useSelector} from 'react-redux' 
import styles from './CommentPost.module.scss'

export const CommentPostQuestion = (id_q, func) => {
    const [content, setContent] = useState("")
    console.log(id_q.id);
    const history = useHistory();

    const isLoggedin = useSelector(state => state.isLoggedReducer.loggedin)
    const token = useSelector(state => state.userInfoReducer.user.token)

    if (!isLoggedin) {
        return (<div>
            Familiar Poblem? Sign in to leave a Comment
            <Link to="/signin">Signin</Link>
        </div>)
    }

    const instance = axios.create({
      baseURL: 'http://localhost:8000/api/',

      headers: {Authorization : 'Token ' + token}
    });

    const postCommentonQuestion = () => {
        console.log(content);
        instance.post(`comment/question/${id_q.id}/`, {content: content})
            .then(res => {
                console.log(res);
                history.go(0);
            })
            .catch(e =>{
                console.log(e);
            })
    }


    return(
        <Fragment>
        <div className={styles.board}>
        <div className="comment-content">   
            <input className="content-input" value={content} onChange={({target:{value}})=>setContent(value)}/>
        </div>
        <div className={styles.submit_button} onClick={() => {postCommentonQuestion()}}>
            Submit
        </div>
        </div>
    </Fragment>

    )
}


export const CommentPostAnswer = (id_a) => {
    const history = useHistory();
    const [content, setContent] = useState("")
    console.log(id_a.id);

    const isLoggedin = useSelector(state => state.isLoggedReducer.loggedin)
    const token = useSelector(state => state.userInfoReducer.user.token)


    const instance = axios.create({
      baseURL: 'http://localhost:8000/api/',

      headers: {Authorization : 'Token ' + token}
    });

    const postCommentonAnswer = () => {
        console.log(content);
        instance.post(`comment/answer/${id_a.id}/`, {content: content})
            .then(res => {
                console.log(res);
                // history.go(0)
            })
            .catch(e =>{
                console.log(e);
            })
    }


    return(
        <Fragment>
            <div className={styles.board}>
            <div className="comment-content">   
                <input className="content-input" value={content} onChange={({target:{value}})=>setContent(value)}/>
            </div>
            <div className={styles.submit_button} onClick={() => {postCommentonAnswer()}}>
                Submit
            </div>
            </div>
        </Fragment>
    )
}

