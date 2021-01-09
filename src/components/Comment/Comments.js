import {Fragment, useState} from 'react'
import styles from './Comments.module.scss'
import {useSelector, useDispatch} from 'react-redux' 
import axios from 'axios'


export const CommentBox =  (comment) => {
    const dispatch = useDispatch();
    const isLoggedin = useSelector(state => state.isLoggedReducer.loggedin)
  
    const token = useSelector(state => state.userInfoReducer.user.token)
    const user = useSelector(state => state.userInfoReducer.user)

    const instance = axios.create({
        baseURL: 'https://www.wafflow.com/api/',
        headers: { 'Accept' : "application/json",'Authorization' : 'Token ' + token},
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
        instance.put(`rate/comment/${comment.comment.id}/`, {rating: 1})
            .then(res => {
                console.log(res);
            })
            .catch(e => {
                console.log(e);
            })
    }

    return(
       <div className={styles.board}>
        <div className={styles.comment_vote_box}>
            <div onClick={() => {upvote()}}>
                UpVote
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
        </span>

       </div> 
    )
}

export const CommentList = (comments_all) => {
    console.log(comments_all);
    const comment_list = comments_all.comments_all
    console.log(comment_list);
    return (<div className = "comment-list">{comment_list.map(comment => {return <CommentBox comment = {comment}/>})}</div>)
} 
