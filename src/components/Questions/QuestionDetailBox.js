import {useState, Fragment, useEffect, Button} from 'react'
import React from 'react'
import {useHistory, Link} from 'react-router-dom'
import {CommentList} from '../Comment/Comments'
import AnswerList from '../Answer/AnswerList'
import AnswerPost from '../Answer/AnswerPost'
import {CommentPostQuestion} from '../Comment/CommentPost'
import axios from 'axios'
import {useSelector, useDispatch} from 'react-redux' 
import styles from './QuestionDetailBox.module.scss'


const QuestionDetailBox = (match) => {

    const isLoggedin = useSelector(state => state.isLoggedReducer.loggedin)
    console.log(isLoggedin);
    const token = useSelector(state => state.userInfoReducer.token)

    console.log("renders!");
    const instance = axios.create({
        baseURL: 'http://localhost:8000/api/',

        Authorization: 'Token ' + token
      });

    const id = match.match.params.question_id

    const [comment_page, set_comment_page] = useState(1) //TODO: page 이동 버튼 만들기
    const [answer_sort, set_answer_sort] = useState("votes")
    const [comment_sort, setCommentSort] = useState("votes")
    const [answer_page, set_answer_page] = useState(1)
    const [question, setQuestion] = useState({})
    const [answers , setAnswers] = useState({})
    const [comments, setComments] = useState({})
    const [max_page, setMaxPage] = useState(1)
    const [max_comment, setMaxComment] = useState(1)

    useEffect(() => {
        if (question.title === undefined) {
        instance.get(`question/${id}/`)
            .then((res) => {
                console.log(res);
                setQuestion(res.data)
                setMaxPage(question.answer_count/30)
            })
            .catch((e) => {
                console.log(e);
                alert(e.message)
            })
        instance.get(`comment/question/${id}/?page=${comment_page}`)
            .then((res) => {
                console.log(res);

                setComments(res.data.comments)
                setMaxComment(question.comment_count)
            })
            .catch((e) => {
                console.log(e);
            })
        instance.get(`answer/question/${id}/`, {params:{page: answer_page, sorted_by: answer_sort}})
            .then((res) => {
                console.log(res);
                setAnswers(res.data.answers)
            })
            .catch((e) => {
                console.log(e);
            })
        }
    }, [])

    if (!id instanceof Number) {
        return  (<Fragment>Wrong Question Id!</Fragment>)
    }
    if (question.title === undefined) {
        return (<Fragment>Wrong Question Id!</Fragment>)
    }


    console.log(question);

    const Author = question.author
    const number = question.answer_count

    const q_upvote = () => {
        if (!isLoggedin) {
            alert("You are not Logged in!")
            return;
        }
        axios.put(`rate/question/${question.id}`, {rating: 1})
            .then(res => {
                console.log(res);
            })
            .catch(e => {
                console.log(e);
            })
    }

    const q_downvote = () => {
        if (!isLoggedin) {
            alert("You are not Logged in!")
            return;
        }
        axios.put(`rate/question/${question.id}`, {rating: -1})
            .then(res => {
                console.log(res);
            })
            .catch(e => {
                console.log(e);
            })
    }

    return (
        <div className={styles.board}>
            <div className={styles.box}>
                <div className={styles.qdetail_main_title_box}>
                    <div className={styles.qdetail_main_title}>
                        {question.title}
                    </div>
                    <div className={styles.askq_btn}>
                        <Link to = "question/ask">Ask a Question </Link> 
                    </div>
                </div>
                <div className={styles.qdetail_top_info_box}>
                    <div className={styles.qdetail_top_info}>
                        <div className={styles.asked_at}>
                            Asked at 
                        </div> 
                        <div className={styles.answered_number}>
                            {question.created_at.substring(0,10)}
                        </div>
                        <div className={styles.div10}/>
                        <div className={styles.view_count}>
                            viewed
                        </div>
                        <div className={styles.view_number}>
                            {question.view_count}
                        </div>
                        <div className={styles.times} >
                            times
                        </div>
                    </div>
                </div>
                <div className={styles.q_main_content_box}>
                <div className = {styles.QdetailBoxLeft}>
                <div className={styles.VoteBox}>
                    <button onClick = {e => {q_upvote()}}>UpVote</button>
                    <div className={styles.votes}>
                        {question.vote}
                    </div>
                    <button onClick={e => {q_downvote()}}>DownVote</button>
                </div>
                <div className={styles.bookmark_box}>
                        <div className={styles.bookmark}>
                            {question.bookmark_count}
                        </div>
                    </div>
                </div> 
                <div className={styles.QdetailBoxRight}>

                <div className = {styles.questionContent}>
                    {question.content}
                </div>
                <div className={styles.questionTags}>
                    {question.tags.map((tag) => {return <div className={styles.tag_element}><Link to={`/question/tagged/?tags=${tag.name}&sorted_by=newest&page=1`} ><span className="tagInfo">{tag.name}</span></Link></div>})}
                </div>
                <div className={styles.questionbottomBox}>
                        <div className={styles.author_profile_bottom}>
                            <div className={styles.author_pic}>
                                <img src={Author.picture===undefined? null : Author.picture} alt="Author's profile"></img>
                            </div>
                            <div className="author_info">
                                <div className="author_username">{Author.nickname===undefined? null : Author.nickname}</div>
                                <div className="author_reputation">reputation: {Author.reputation===undefined? null : Author.reputation}</div>
                            </div>
                        </div>
                </div>
                </div>   
                </div>
                <div className="q_main_comment_box">
                        {/* <CommentList comments_all={comments}/> */}

                    <div className="comments_page_btn">
                            <button onClick={() => {set_comment_page(comment_page+1 > max_comment? max_comment : comment_page+1)}} >next page</button>
                            <button onClick={() => {set_comment_page(comment_page===1? 1 : comment_page - 1)}}>prev page</button>
                    </div>
                    <div className="comment_post_box_q">
                        <CommentPostQuestion id={id}/>
                    </div>
                </div>
                <div className="ans_box">
                    <div className="ans_box_head">
                        {question.answer_count} Answers
                    </div>
                    <div className="sort_by_btn">
                        <button onClick={() => {set_answer_sort("votes")}} >votes</button>
                        <button onClick={() => {set_answer_sort("activity")}}>activity</button>
                        <button onClick={() => {set_answer_sort("newest")}}>newest</button>
                    </div>
                    <AnswerList Answers={answers} num = {question.answer_count}/>
                    <div className="ans_page_btn">
                        <button onClick={() => {set_answer_page(answer_page+1 > max_page? max_page : answer_page+1)}} >next page</button>
                        <button onClick={() => {set_answer_page(answer_page===1? 1 : answer_page - 1)}}>prev page</button>
                    </div>
                    <AnswerPost id={id}/>
                </div>
            </div>
        </div>
    )
}

export default React.memo(QuestionDetailBox)