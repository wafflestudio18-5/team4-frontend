import {Fragment, useEffect, useState} from 'react'
import MDEditor from '@uiw/react-md-editor';
import ResponderProfile from '../Profile/ResponderProfile'
import {getCommentsOfAnswer} from '../../axios.ts'
import {CommentList} from '../Comment/Comments'
import {CommentPostAnswer} from '../Comment/CommentPost'
import {useSelector} from 'react-redux'
import axios from 'axios'
import {useHistory} from 'react-router-dom'
import styles from './AnswerBox.module.scss'
import AuthorProfile from '../Profile/AuthorProfile'
import {CommentPostQuestion} from '../Comment/CommentPost'

const AnswerBox = (Ans) => {
    const history = useHistory();
    console.log("Answer box");
    console.log(Ans);
    const Answer = Ans.Answer
    console.log(Answer);
    const [comment, setComment] = useState([])
    const isLoggedin = useSelector(state => state.isLoggedReducer.loggedin)
    const token = useSelector(state => state.isLoggedReducer.token)
    const user_id = useSelector(state => state.userInfoReducer.user.id)
    const [comment_page, setCommentPage] = useState(1)
    const [vote, setVote] = useState(Answer.vote)
    const [max_comment, set_comment_page] = useState(0)

    const instance = axios.create({
        baseURL: 'https://www.wafflow.com/api/',

        headers: {'Accept' : "application/json",Authorization: isLoggedin? `Token ${token}`:''}
      });

    useEffect(() => {
        if (comment !== null) {
            console.log(comment);
        }
        else {
        getCommentsOfAnswer(Answer.id, comment_page)
        .then(res => {
            console.log(res);
            setComment(res.data)
            set_comment_page(res.data.length/30)
        })
        .catch(e => {
            console.log(e);
        })
        }
    })

    const upVote = () => {
        if (isLoggedin) {
            instance.put(`/rate/answer/${Answer.id}/`, {rating: 1})
                .then(res => {
                    console.log(res);
                    setVote(vote+1)
                })
                .catch(e => {
                    console.log(e);
                })
        }
    }

    const deleteAnswer = () => {
        instance.delete(`/answer/${Answer.id}/`)
            .then(res => {
                console.log(res);
            })
            .catch (e => {
                console.log(e);
            })
    }

    const downVote = () => {
        if (isLoggedin) {
            instance.put(`/rate/answer/${Answer.id}/`, {rating: -1})
                .then(res => {
                    console.log(res);
                    setVote(vote-1)
                })
                .catch(e => {
                    console.log(e);
                })
        }
    }

    const goEdit = () => {
        history.push(`/question/edit/${Answer.id}`)
        
    }
    


    return(
        <div className={styles.box}>
            <div className={styles.q_main_content_box}>
            <div className = {styles.QdetailBoxLeft}>
            <div className={styles.VoteBox}>
                <div className={styles.arrowbox} onClick={() => {upVote()}}>
                    <svg aria-hidden="true" class="m0 svg-icon iconArrowUpLg" width="36" height="36" viewBox="0 0 36 36">
                        <path d="M2 26h32L18 10 2 26z" className={styles.arrow}></path>
                    </svg>
                </div>
            
                <div className={styles.votes}>
                    {vote}
                </div>
                <div className={styles.arrowbox} onClick={() => {downVote()}}>
                    <svg aria-hidden="true" class="m0 svg-icon iconArrowUpLg" width="36" height="36" viewBox="0 0 36 36">
                    <path d="M2 10h32L18 26 2 10z" className={styles.arrow}></path>
                    </svg>
                </div>
            </div>
            </div> 
            <div className={styles.QdetailBoxRight}>

                <div className = {styles.questionContent}>
                    <MDEditor.Markdown source={Answer.content} /> 
                </div>
                <div className={styles.questionbottomBox}>
                    <div className={styles.editbox}>
                        <div className={styles.edit_btn} onClick={() => {goEdit()}}>
                            Edit
                        </div>
                        <div className={styles.created_at_text}>
                            {Answer.updated_at? `editted ${Answer.updated_at.substring(0,10)}` : null}
                        </div>
                    </div>
                    <div className={styles.profile_box}>
                        <AuthorProfile question={Answer}/>
                    </div>
                </div>
                <div className="q_main_comment_box">
                    <CommentList comments_all={comment}/>

                <div className={styles.page_box}>
                    {comment_page === 1? <div className={styles.page_click_no}>prev page</div> 
                    :
                    <div className={styles.page_click} onClick={() => {set_comment_page(comment_page-1)}} >prev page</div> }
                    <div className={styles.page}>
                        {comment_page}
                    </div>
                    {comment_page > max_comment/30 + 1? <div className={styles.page_click_no} onClick={() => {set_comment_page(comment_page > max_comment/30 + 1? max_comment : comment_page+1)}} >next page</div> 
                    :
                    <div className={styles.page_click} onClick={() => {set_comment_page(comment_page > max_comment/30 + 1? max_comment : comment_page+1)}} >next page</div> }
                </div>
                <div className="comment_post_box_q">
                    <CommentPostQuestion id={Answer.id}/>
                </div>
            </div>
            </div>
            </div>
        </div>
    )
}

export default AnswerBox