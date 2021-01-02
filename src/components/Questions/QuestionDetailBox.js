import {useState, Fragment, useEffect, Button} from 'react'
import React from 'react'
import {getQuestion, getCommentsOfQuestion, getAnswersOfQuestion} from '../../axios.ts'
import QdetailBox from './QdetailBox'
import {CommentList} from '../Comment/Comments'
import AnswerList from '../Answer/AnswerList'
import AnswerPost from '../Answer/AnswerPost'
import {CommentPostQuestion} from '../Comment/CommentPost'
import axios from 'axios'
import AuthorProfile from '../Profile/AuthorProfile'
import { Login_info } from '../../Formats'

const QuestionDetailBox = (match) => {
    console.log("renders!");
    const instance = axios.create({
        baseURL: 'http://localhost:8000/'
      });

    const id = match.match.params.question_id

    const [comment_page, set_comment_page] = useState(1) //TODO: page 이동 버튼 만들기
    const [answer_sort, set_answer_sort] = useState("votes")
    const [comment_sort, setCommentSort] = useState("votes")
    const [answer_page, set_answer_page] = useState(1)
    const [question, setQuestion] = useState({})
    const [answers, setAnswers] = useState({})
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
    console.log(answers);
    console.log(answers);
    console.log(answers.length);
    console.log(typeof(answers));
    console.log(answers === Array(0));
    console.log(comments);
    const Author = question.author
    console.log(answers.product);

    // instance.get(`question/${id}/`)
    //     .then((res) => {
    //         console.log(res);
    //         setQuestion(res.data)
    //         console.log(res.data);
    //         setMaxPage(question.answer_count/30)
    //     })
    //     .catch((e) => {
    //         console.log(e);
    //         console.log("Question Fetch Error");
    //         alert(e.message)
    //     })
    // instance.get(`comment/question/${id}?page=${comment_page}`)
    //     .then((res) => {
    //         console.log(res);
    //         setComments(res.comments)
    //         setMaxComment(question.comment_count)
    //     })
    //     .catch((e) => {
    //         console.log(e);
    //     })
    // instance.get(`answer/question/${id}/`, {page: answer_page, sorted_by: answer_sort})
    //     .then((res) => {
    //         console.log(res);
    //         setAnswers(res)
    //     })
    //     .catch((e) => {
    //         console.log(e);
    //     })

    return (
        <Fragment>
            <div className="qdetail-main-title-box">
                <div className="qdetail-main-title">
                    {question.title}
                </div>
                <div className="askq-btn">
                    <button /*TODO: link*/>Ask a Question</button>
                </div>
            </div>
            <div className="qdetail-top-info-box">
                <div className="qdetail-top-info">
                    Asked at {question.created_at}, viewed {question.view_count}times 
                </div>
            </div>
            <div className="q-main-content-box">
            <div className = "QdetailBoxLeft">
            <div className="VoteBox">
            <button>UpVote</button>
            <div classnName="votes">
                {question.vote}
            </div>
            <button>DownVote</button>
            </div>
        </div> 
        <div className="QdetailBoxRight">
            <div className = "questionContent">
                {question.content}
            </div>
            <div className="questionTags">
                hello
            </div>
            <div className="questionbottomBox">
                <button>Share</button>
                <Fragment /*asked at: should we change this to create {date} at {time}? */>
                    asked at {question.created_a===undefined? null : question.created_at}
                    <div className="author-profile-bottom">
                        <div className="author-pic">
                            <img src={Author.picture===undefined? null : Author.picture} alt="Author's profile"></img>
                        </div>
                        <div className="author-info">
                            <div className="author-username">{Author.nickname===undefined? null : Author.nickname}</div>
                            <div className="author-reputation">reputation: {Author.reputation===undefined? null : Author.reputation}</div>
                        </div>
                    </div>
                </Fragment>
            </div>
        </div>   
            </div>
            <div className="q-main-comment-box">
                    {comments===undefined || !comments? "" : <CommentList comments={comments}/>}
                <div className="comments-page-btn">
                        <button onClick={() => {set_comment_page(comment_page+1 > max_comment? max_comment : comment_page+1)}} >next page</button>
                        <button onClick={() => {set_comment_page(comment_page===1? 1 : comment_page-1)}}>prev page</button>
                </div>
                <div className="comment-post-box-q">
                    <CommentPostQuestion id={id}/>
                </div>
            </div>
            <div className="ans-box">
                <div className="ans-box-head">
                    {question.answer_count} Answers
                </div>
                <div className="sort-by-btn">
                    <button onClick={() => {set_answer_sort("votes")}} >votes</button>
                    <button onClick={() => {set_answer_sort("activity")}}>activity</button>
                    <button onClick={() => {set_answer_sort("newest")}}>newest</button>
                </div>
                {answers===undefined || !answers? null : <AnswerList Answers={answers} is_accepted={question.has_accepted}/>}
                <div className="ans-page-btn">
                    <button onClick={() => {set_answer_page(answer_page+1 > max_page? max_page : answer_page+1)}} >next page</button>
                    <button onClick={() => {set_answer_page(answer_page===1? 1 : answer_page-1)}}>prev page</button>
                </div>
                <AnswerPost id={id}/>
            </div>
        </Fragment>
    )

    // return(
    //     <>
        

    //         <div className = "questionContent">
    //             {question.content}
    //         </div>
    //         <div className="questionTags">
    //             hellossssssssss
    //         </div>
    //         <div className="questionbottomBox">
    //             <button>Share</button>
    //             <Fragment>
    //                 asked at {question.created_a===undefined? null : question.created_at}
    //                 <div className="author-profile-bottom">
    //                     <div className="author-pic">
    //                         <img src={Author.picture===undefined? null : Author.picture} alt="Author's profile"></img>
    //                     </div>
    //                     <div className="author-info">
    //                         <div className="author-username">{Author.nickname===undefined? null : Author.nickname}</div>
    //                         <div className="author-reputation">reputation: {Author.reputation===undefined? null : Author.reputation}</div>
    //                     </div>
    //                 </div>
    //             </Fragment>
    //         </div>
            

        
        
        
        
    //     </>
    // )

}

export default React.memo(QuestionDetailBox)