import {Fragment} from 'react'
import MDEditor from '@uiw/react-md-editor';
import ResponderProfile from './ResponderProfile'
import {getCommentbyAnswer} from '../../axios.ts'
import {CommentList} from './Comments'
import {CommentPostAns} from './CommentPost'

const AnswerBox = (Answer, accept) => {
    const comments = getCommentbyAnswer()
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
                    {accept? "Accepted a Question" : "" }
                </div>
           </div>
           <div className="ansbox-right-box">
               <div className="ansbox-content-box">
                    <MDEditor class="qask-body-editor"
                        value={Answer.content}/>
                    <MDEditor.Markdown source={Answer.content} />
                </div>
                <div className="ansbox-roght-bottom-box">
                    <div className="ansbox-sharebtn-box">
                        <button className="ansbox-sharebtn" /*TODO: Link */>Share</button>
                    </div>
                    <ResponderProfile id={Answer.author.id} created_date={Answer.created_at} updated_date={Answer.updated_at}/>
                </div>
                <div className="ans-comments-box">
                    <CommentList comments={comments}/>
                </div>  
                <div className="comment-post-box-ans">
                    <CommentPostAns id={Answer.id}/>
                </div>
           </div>
       </Fragment>
    )
}

export default AnswerBox