import {Fragment, useEffect, useState} from 'react'
import MDEditor from '@uiw/react-md-editor';
import ResponderProfile from '../Profile/ResponderProfile'
import {getCommentsOfAnswer} from '../../axios.ts'
import {CommentList} from '../Comment/Comments'
import {CommentPostAnswer} from '../Comment/CommentPost'

const AnswerBox = (Ans) => {
    console.log("Answer box");
    console.log(Ans);
    const Answer = Ans.Answer
    console.log(Answer);
    const [comment, setComment] = useState(null)

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
    
    return(
       <Fragment>
           <div className="ansbox-left-box">
                <div className="ansbox-left-box-vote">
                    <div className="ansbox-vote-upvote-btn-box">
                        <button className="ansbox-vote-upvote-btn">upvote</button>
                    </div>
                    <div className="ansbox-vote-number">
                        {Answer.vote}
                    </div>
                    <div className="ansbox-vote-downvote-btn">
                        <button className="ansbox-vote-upvote-btn">downvote</button>
                    </div>
                </div>
                <div className="ansbox-accepted-box">
                    {Answer.is_accepted && "Accepted!"}
                </div>
                <div className="ans-accepted-box">
                    is accepted: {Answer.is_acceptedf}
                </div>
           </div>
           <div className="ansbox-right-box">
               <div className="ansbox-content-box">
                    {Answer.content}
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