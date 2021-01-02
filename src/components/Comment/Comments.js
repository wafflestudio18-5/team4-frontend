import {Fragment} from 'react'

export const CommentBox = (comment) => {
    console.log(comment);

    return(
       <Fragment className="comment-box">
        <div className="comment-vote-box">
            <button>UpVote</button>
            <div classnName="comment-votes">
                {comment.vote}
            </div>
            <button>DownVote</button>
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
    const comments_length = comments.length
    var res = (<div></div>)
    for (var i=0; i<comments_length; i++) {
        res = res + (<CommentBox comment={Comment}/>)
    }
    return (<div className = "comment-list">{res}</div>)
} 
