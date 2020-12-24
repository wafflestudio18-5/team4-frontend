import {useState, Fragment} from 'react'
import {getQuestionbyId, getCommentbyQuestion, getAnswerbyQuestion} from '../../axios.ts'
import QdetailBox from './QdetailBox'
import {CommentList} from './Comments'
import AnswerList from './AnswerList'
import AnswerPost from './AnswerPost'
import {CommentPostQuestion} from './CommentPost'

const QuestionDetailBox = (id) => {
    const question = getQuestionbyId(id)
    const [comment_page, set_comment_page] = useState(1) //TODO: page 이동 버튼 만들기
    const [answer_sort, set_answer_sort] = useState("votes")
    const [answer_page, set_answer_page] = useState(1)
    const max_page = question.answer_count/30
    const max_comment = question.comment_count

    const q_comments = getCommentbyQuestion(id, comment_page)
    const answers = getAnswerbyQuestion(id, 1, answer_sort)

    return(
        <Fragment className="qdetail-main-box">
            <div className="qdetail-main-title-box">
                <div className="qdetail-main-title">
                    {question.title}
                </div>
                <div className="askq-btn">
                    <button /*TODO: link*/>Ask a Question</button>
                </div>
            </div>
            <div className="qdetail-top-info-box">
                <div classNaem="qdetail-top-info">
                    Asked at {question.created_at}, viewed {question.view_count}times 
                </div>
            </div>
            <div className="q-main-content-box">
                <QdetailBox Question={question}/>
            </div>
            <div className="q-main-comment-box">
                    <CommentList comments={q_comments}/>
                <div className="comments-page-btn">
                        <button onClick={set_comment_page(comment_page+1 > max_comment? max_comment : comment_page+1)} >next page</button>
                        <button onClick={set_comment_page(comment_page===1? 1 : comment_page-1)}>prev page</button>
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
                    <button onClick={set_answer_sort("votes")} >votes</button>
                    <button onClick={set_answer_sort("activity")}>activity</button>
                    <button onClick={set_answer_sort("newest")}>newest</button>
                </div>
                <AnswerList Answers={answers} is_accepted={question.has_accepted}/>
                <div className="ans-page-btn">
                    <button onClick={set_answer_page(answer_page+1 > max_page? max_page : answer_page+1)} >next page</button>
                    <button onClick={set_answer_page(answer_page===1? 1 : answer_page-1)}>prev page</button>
                </div>
                <AnswerPost id={id}/>
            </div>
        </Fragment>
    )
}

export default QuestionDetailBox