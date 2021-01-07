import {useState, Fragment, useEffect} from 'react'
import React from 'react'
import Button from '@material-ui/core/Button';
import {useHistory, Link} from 'react-router-dom'
import {CommentList} from '../Comment/Comments'
import AnswerList from '../Answer/AnswerList'
import AnswerPost from '../Answer/AnswerPost'
import {CommentPostQuestion} from '../Comment/CommentPost'
import axios from 'axios'
import {useSelector, useDispatch} from 'react-redux' 
import styles from './QuestionDetailBox.module.scss'
import MDEditor from '@uiw/react-md-editor';


const QuestionDetailBox = (match) => {
    const history = useHistory();
    const isLoggedin = useSelector(state => state.isLoggedReducer.loggedin)
    console.log(isLoggedin);
    const token = useSelector(state => state.userInfoReducer.user.token)
    console.log(token);
    const user_id = useSelector(state => state.userInfoReducer.user.id)
    console.log(user_id);

    console.log("renders!");
    const instance = axios.create({
        baseURL: 'http://localhost:8000/api/',

        headers: {Authorization: 'Token ' + token}
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
    const [bookmark_user, setBookmark] = useState([])
    const [is_author, setIsAuthor] = useState(false)
    console.log(is_author);

    useEffect(() => {
        if (question.title === undefined) {
        instance.get(`question/${id}/`)
            .then((res) => {
                console.log(res);
                setQuestion(res.data)
                console.log(res.data.author);
                setMaxPage(question.answer_count/30)
                if (res.data.author.id === user_id) {
                    setIsAuthor(true)
                }
            })
            .catch((e) => {
                console.log(e);
                alert(e.message)
            })
        instance.get(`comment/question/${id}/?page=${comment_page}/`)
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
        var page_bookmark = 1;

        // while (true) {
        // instance.get(`bookmark/user/me/`, {params:{page: page_bookmark, sorted_by: newest}})
        //     .then((res) => {
        //         console.log(res);
        //         setBookmark(bookmark_user.concat(res.questions.id))
        //     })
        //     .catch((e) => {
        //         console.log(e);
        //         break
        //     })
        //     page_bookmark += 1;
        // }
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
        console.log(isLoggedin);
        console.log("upvote");
        if (!isLoggedin) {
            alert("You are not Logged in!")
        }
        else {
            console.log(token);

        instance.put(`rate/question/${question.id}/`, {rating: 1})
            .then(res => {
                console.log(res);
            })
            .catch(e => {
                console.log(e);
            })
        }
    }

    const q_downvote = () => {
        if (!isLoggedin) {
            alert("You are not Logged in!")
            return;
        }
        instance.put(`rate/question/${question.id}/`, {rating: -1})
            .then(res => {
                console.log(res);
            })
            .catch(e => {
                console.log(e);
            })
    }

    const goEdit = () => {
        history.push(`/question/edit/${question.id}/`)
    }

    // const bookmark_change = () => {
    //     if (isLoggedin) 
    // }

    const DeleteQuestion = () => {
        instance.delete(`/question/${question.id}/`)
            .then(res => {
                console.log(res);
                history.go(-1);
            })
            .catch (e => {
                console.log(e);
            })
    }

    console.log(question.author.id);
    console.log(user_id);

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
                    <Button onClick = {e => {q_upvote()}}>UpVote</Button>
                    <div className={styles.votes}>
                        {question.vote}
                    </div>
                    <Button onClick={e => {q_downvote()}}>DownVote</Button>
                </div>
                <div className={styles.bookmark_box}>
                        <div className={styles.bookmark}>
                            {question.bookmark_count}
                        </div>
                    </div>
                </div> 
                <div className={styles.QdetailBoxRight}>

                    <div className = {styles.questionContent}>
                        <MDEditor.Markdown source={question.content} /> 
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
                {isLoggedin && user_id === question.author.id? <button onClick={() => {goEdit()}}>Edit</button> : null} 
                </div>
                <div className="q_main_comment_box">
                        {/* <CommentList comments_all={comments}/> */}

                    <div className="comments_page_btn">
                            <Button onClick={() => {set_comment_page(comment_page+1 > max_comment? max_comment : comment_page+1)}} >next page</Button>
                            <Button onClick={() => {set_comment_page(comment_page===1? 1 : comment_page - 1)}}>prev page</Button>
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
                    <AnswerList Answers={answers} num = {question.answer_count} is_author = {is_author}/>
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