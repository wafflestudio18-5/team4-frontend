import {Fragment, useState} from 'react'

export const CommentBox =  (comment) => {
    console.log(comment);   

    return(
       <Fragment className="comment-box">
        <div className="comment-vote-box">
            <button>UpVote</button>
            <div className="comment-votes">
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

export const CommentList = (comments_all) => {
    console.log(comments_all);
    const comment_list = comments_all.comments_all
    console.log(comment_list);
    return (<div className = "comment-list">{comment_list.map(comment => {return <CommentBox comment = {comment}/>})}</div>)
} 
