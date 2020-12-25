import {Fragment, Button} from 'react'

export const CommentBox = (comment) => {
    return(
       <Fragment>
        <div className="comment-vote-box">
            <Button //Add Buttons to upvote / downvote
            ></Button> 
            <div classnName="comment-votes">
                {comment.vote}
            </div>
            <Button //Add Buttons to upvote / downvote
            ></Button>
        </div>
        <div className="comment-content-box">
            {comment.content}
            {"by".concat(' ',comment.author.username)}
            <div className="comment-content-date">
                {comment.created_at}
            </div>
        </div>

       </Fragment> 
    )
}

export const CommentList = (comments) => {
    const CommentsMapped = comments.map(Comment => {return <CommentBox comment={Comment}/>})
    return (<div className = "comment-list">{CommentsMapped}</div>)
} 
