import {Fragment, useEffect, useState} from 'react'
import MDEditor from '@uiw/react-md-editor';
import ResponderProfile from '../Profile/ResponderProfile'
import {getCommentsOfAnswer} from '../../axios.ts'
import {CommentList} from '../Comment/Comments'
import {CommentPostAnswer} from '../Comment/CommentPost'
import {useSelector} from 'react-redux'
import axios from 'axios'
import {useHistory} from 'react-router-dom'

const AnswerBox = (Ans) => {
    const history = useHistory();
    console.log("Answer box");
    console.log(Ans);
    const Answer = Ans.Answer
    console.log(Answer);
    const [comment, setComment] = useState(null)
    const isLoggedin = useSelector(state => state.isLoggedReducer.loggedin)
    const token = useSelector(state => state.userInfoReducer.user.id)

    const instance = axios.create({
        baseURL: 'http://localhost:8000/api/',

        headers: {Authorization: 'Token ' + token}
      });

    useEffect(() => {
        if (comment !== null) {
            console.log(comment);
        }
        else {
        getCommentsOfAnswer(Answer.id)
        .then(res => {
            console.log(res);
            setComment(res.data)
        })
        .catch(e => {
            console.log(e);
        })
        }
    })

    const upVote = () => {
        if (isLoggedin) {
            instance.put(`/rate/answer/${Answer.id}`, {rating: 1})
                .then(res => {
                    console.log(res);
                })
                .catch(e => {
                    console.log(e);
                })
        }
    }

    const downVote = () => {
        if (isLoggedin) {
            instance.put(`/rate/answer${Answer.id}`, {rating: -1})
                .then(res => {
                    console.log(res);
                })
                .catch(e => {
                    console.log(e);
                })
        }
    }
    


    return(
       <Fragment>
           <div className="ansbox-left-box">
                <div className="ansbox-left-box-vote">
                    <div className="ansbox-vote-upvote-btn-box">
                        <button className="ansbox-vote-upvote-btn" onClick={() => {upVote()}}>upvote</button>
                    </div>
                    <div className="ansbox-vote-number">
                        {Answer.vote}
                    </div>
                    <div className="ansbox-vote-downvote-btn">
                        <button className="ansbox-vote-upvote-btn" onClick={() => {downVote()}}>downvote</button>
                    </div>
                </div>
                <div className="ansbox-accepted-box">
                    {Answer.is_accepted && "Accepted!"}
                </div>
                <div className="ans-accepted-box">
                    is accepted: {Answer.is_accepted.toString()}
                </div>
           </div>
           <div className="ansbox-right-box">
               <div className="ansbox-content-box">
               <MDEditor.Markdown source={Answer.content} />
                </div>
                <div className="ansbox-roght-bottom-box">
                    <ResponderProfile answer = {Answer}/>
                </div>
                <div className="ans-comments-box">
                    {/* <CommentList comments={comment}/> */}
                </div>  
                <div className="comment-post-box-ans">
                    <CommentPostAnswer id={Answer.id}/>
                </div>
           </div>
       </Fragment>
    )
}

export default AnswerBox