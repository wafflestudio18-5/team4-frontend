import {Fragment, useState} from 'react'
import styles from './Comments.module.scss'
import {useSelector, useDispatch} from 'react-redux' 
import axios from 'axios'
import { deleteComment, editComment } from '../../axios'
import {useHistory} from 'react-router-dom'

export const CommentBox =  (comment) => {
    const history = useHistory();
    const dispatch = useDispatch();
    const isLoggedin = useSelector(state => state.isLoggedReducer.loggedin)
    const [editting, setEdit] = useState(false)
    const [editval, setEditVal] = useState("")
    const token = useSelector(state => state.userInfoReducer.user.token)
    const user = useSelector(state => state.userInfoReducer.user)

    const instance = axios.create({
        baseURL: 'http://localhost:8000/api/',
        headers: { 'Authorization' : 'Token ' + token},
      });

    console.log(comment);   
    const upvote = () => {
        instance.put(`rate/comment/${comment.comment.id}/`, {rating: 1})
            .then(res => {
                console.log(res);
            })
            .catch(e => {
                console.log(e);
            })
    }

    const downvote= () => {
        instance.put(`rate/comment/${comment.comment.id}/`, {rating: -1})
            .then(res => {
                console.log(res);
                history.go(0)
            })
            .catch(e => {
                console.log(e);
            })
    }

    const deleteCommentBox = () => {
        instance.delete(`/comment/${comment.comment.id}/`)
            .then(res => {
                console.log(res);
                history.go(0)
            })
            .catch(e => {
                console.log(e);
            })
    }

    const editCommentBox = () => {
        setEdit(true);
        setEditVal(comment.comment.content)
    }

    const editSubmit = () => {
        instance.put(`/comment/${comment.comment.id}/`, {content: editval})
            .then (res => {
                console.log(res);
                history.go(0)
            })
            .catch(e => {
                console.log(e);
            })
    }
    

    return(
        <>
        {editting? 
        <div className={styles.comment_content}>
            <input value={editval} onChange = {e => {setEditVal(e.target.value)}}></input>
            <span className = {styles.date} onClick={() => {editSubmit()}}>
                Submit
            </span>
        </div>

:
       <div className={styles.board}>
        <div className={styles.comment_vote_box}>
            <div onClick={() => {upvote()}}>
                upVote
            </div>
            <div onClick={() => {downvote()}}>
                downVote
            </div>
        </div>
        <span className={styles.comment_content}>
            {comment.comment.content}
            {' -- '} 
            <span className={styles.author}>{comment.comment.author.nickname.toString()}</span>
            <span className={styles.date}>
                {comment.comment.created_at.substring(0,10)}
            </span>
            <span className={styles.date} onClick={() => {editCommentBox()}}>
                Edit
            </span>
            <span className={styles.date} onClick={() => {deleteCommentBox()}}>
                Delete
            </span>
        </span>

       </div> 
}
       </>
    )
}

export const CommentList = (comments_all) => {
    console.log(comments_all);
    const comment_list = comments_all.comments_all
    console.log(comment_list);
    return (<div className = "comment-list">{comment_list.map(comment => {return <CommentBox comment = {comment}/>})}</div>)
} 
