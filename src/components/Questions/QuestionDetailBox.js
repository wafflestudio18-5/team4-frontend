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
import LeftBanner from '../Banner/LeftBanner'
import { getAllJSDocTagsOfKind } from 'typescript';
import AuthorProfile from '../Profile/AuthorProfile'


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
    const [comments, setComments] = useState([])
    const [max_page, setMaxPage] = useState(1)
    const [max_comment, setMaxComment] = useState(1)
    const [bookmarked, setBookmark] = useState(false)
    const [is_author, setIsAuthor] = useState(false)
    const [vote, setVote] = useState(0)
    const [postComment, setPostCommment] = useState(false)

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
                setBookmark(res.data.bookmark)
                setVote(res.data.vote)
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
                console.log(max_comment);
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
                setVote(vote+1)

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
                setVote(vote-1)
            })
            .catch(e => {
                console.log(e);
            })
    }

    const bookmark_change = () => {
        if (bookmarked) {
            setBookmark(false)
            instance.delete(`/bookmark/question/${id}/`)
                .then((res) => {
                    console.log(res);
                })
                .catch(e => {
                    console.log(e);
                })
        }
        else {
            setBookmark(true)
            instance.post(`/bookmark/question/${id}/`)
                .then((res) => {
                    console.log(res);
                })
                .catch(e => {
                    console.log(e);
        })
    }
}


    const goEdit = () => {
        history.push(`/question/edit/${question.id}`)
    }

    // const bookmark_change = () => {
    //     if (isLoggedin) 
    // }

    const DeleteQuestion = () => {
        instance.delete(`/question/${question.id}`)
            .then(res => {
                console.log(res);
                history.go(-1);
            })
            .catch (e => {
                console.log(e);
            })
    }

    const goAsk = () => {
        if (isLoggedin) {
            history.push('/question/ask');
        }
        else {
            history.push('/signin')
        }
    }

    const goTags = (tag_name) => {
        history.push(`/search/q=[${tag_name}]`);
    }

    console.log(question.author.id);
    console.log(user_id);

    return (
        <div className={styles.board_all}>
            <LeftBanner/>
        <div className={styles.board}>
            <div className={styles.box}>
                <div className={styles.main_box}>
                <div className={styles.qdetail_main_title_box}>
                    <div className={styles.qdetail_main_title}>
                        {question.title}
                    </div>
                    <div className={styles.btn_box}>
                        <div className={styles.askq_btn}>
                            <div className={styles.askq} onClick={() => {goAsk()}}>Ask a Question</div>
                        </div>
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
                </div>
                <div className={styles.q_main_content_box}>
                <div className = {styles.QdetailBoxLeft}>
                <div className={styles.VoteBox}>
                    <div className={styles.arrowbox} onClick={() => {q_upvote()}}>
                        <svg aria-hidden="true" class="m0 svg-icon iconArrowUpLg" width="36" height="36" viewBox="0 0 36 36">
                            <path d="M2 26h32L18 10 2 26z" className={styles.arrow}></path>
                        </svg>
                    </div>
                
                    <div className={styles.votes}>
                        {vote}
                    </div>
                    <div className={styles.arrowbox} onClick={() => {q_downvote()}}>
                        <svg aria-hidden="true" class="m0 svg-icon iconArrowUpLg" width="36" height="36" viewBox="0 0 36 36">
                        <path d="M2 10h32L18 26 2 10z" className={styles.arrow}></path>
                        </svg>
                    </div>
                </div>
                <div className={styles.bookmark_box}>
                        <div className={styles.bookmark} onClick={() => {bookmark_change()}}>
                        <svg aria-hidden="true" class="svg-icon iconBookmark" width="18" height="18" viewBox="0 0 18 18">
                        {bookmarked? <path d="M6 1a2 2 0 00-2 2v14l5-4 5 4V3a2 2 0 00-2-2H6zm3.9 3.83h2.9l-2.35 1.7.9 2.77L9 7.59l-2.35 1.7.9-2.76-2.35-1.7h2.9L9 2.06l.9 2.77z" className= {styles.bookmarkOn_svg}></path>
                        :
                        <path d="M6 1a2 2 0 00-2 2v14l5-4 5 4V3a2 2 0 00-2-2H6zm3.9 3.83h2.9l-2.35 1.7.9 2.77L9 7.59l-2.35 1.7.9-2.76-2.35-1.7h2.9L9 2.06l.9 2.77z" className= {styles.bookmark_svg}></path>
                        }  
                        </svg>
                        </div>
                        {bookmarked? <div className={styles.bookmark_number}>1</div> : null}
                    </div>
                </div> 
                <div className={styles.QdetailBoxRight}>

                    <div className = {styles.questionContent}>
                        <MDEditor.Markdown source={question.content} /> 
                    </div>
                    <div className={styles.questionTags}>
                        {question.tags.map((tag) => {return  <div className={styles.tags} onClick={() => {goTags(tag.name)}}>{tag.name}</div>})}
                    </div>
                    <div className={styles.questionbottomBox}>
                        <div className={styles.editbox}>
                            <div className={styles.edit_btn} onClick={() => {goEdit()}}>
                                Edit
                            </div>
                            <div className={styles.created_at_text}>
                                {question.updated_at? `editted ${question.updated_at.substring(0,10)}` : null}
                            </div>
                        </div>
                        <div className={styles.profile_box}>
                            <AuthorProfile question={question}/>
                        </div>
                    </div>
                    <div className="q_main_comment_box">
                        <CommentList comments_all={comments}/>

                    <div className={styles.page_box}>
                        {comment_page === 1? <div className={styles.page_click_no}>prev page</div> 
                        :
                        <div className={styles.page_click} onClick={() => {set_comment_page(comment_page-1)}} >prev page</div> }
                        <div className={styles.page}>
                            {comment_page}
                        </div>
                        {comment_page +1 > max_page?  <div className={styles.page_click_no}>next page</div> 
                        :
                        <div className={styles.page_click} onClick={() => {set_comment_page(comment_page + 1 > max_page ? max_comment : comment_page+1)}} >next page</div> }
                    </div>
                    <div className="comment_post_box_q">
                        { postComment?
                        <CommentPostQuestion id={id}/> : 
                            <div className={styles.post_comment_msg} onClick={() => {setPostCommment(true)}}    >
                                post a comment
                            </div>
                        }
                        
                    </div>
                </div>
                </div>
                </div>
               
                <div className={styles.ans_box}>
                    <div className={styles.ans_head}>
                        {question.answer_count} Answer
                    </div>
                    <div className={styles.answer_container}>
                        <div className="sort_by_btn">
                        <button onClick={() => {set_answer_sort("votes")}} >votes</button>
                        <button onClick={() => {set_answer_sort("activity")}}>activity</button>
                        <button onClick={() => {set_answer_sort("newest")}}>newest</button>
                    </div>
                    <div>
                        <AnswerList Answers={answers} num = {question.answer_count} is_author = {is_author}/>
                    </div>
                    </div>
                    
                    
                    <div className="ans_page_btn">
                        <button onClick={() => {set_answer_page(answer_page+1 > max_page? max_page : answer_page+1)}} >next page</button>
                        <button onClick={() => {set_answer_page(answer_page===1? 1 : answer_page - 1)}}>prev page</button>
                    </div>
                    <AnswerPost id={id}/>
                </div>
            </div>
           
        </div>
    </div>
    )
}

export default React.memo(QuestionDetailBox)