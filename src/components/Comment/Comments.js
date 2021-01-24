import {Fragment, useState} from 'react'
import styles from './Comments.module.scss'
import {useSelector, useDispatch} from 'react-redux' 
import axios from 'axios'
import { rateComment } from '../../axios'


export const CommentBox =  (comment) => {
    const dispatch = useDispatch();
    const isLoggedin = useSelector(state => state.isLoggedReducer.loggedin)
  
    const token = useSelector(state => state.isLoggedReducer.token)
    const user = useSelector(state => state.userInfoReducer.user)

    console.log(comment);   
    const upvote = () => {
        rateComment.put(comment.comment.id, 1)
            .then(console.log)
            .catch(console.log)
    }

    const downvote= () => {
        rateComment.put(comment.comment.id, -1)
            .then(console.log)
            .catch(console.log)
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
