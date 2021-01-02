import { Link, Button, Fragment } from 'react'
import AuthorProfile from '../Profile/AuthorProfile'

const QdetailBox = (Question) => {
    console.log("Question!");
    console.log(Question);
    return(
    <Fragment>
        <div className = "QdetailBoxLeft">
            <div className="VoteBox">
            <Button //Add Buttons to upvote / downvote
            ></Button> 
            <div classnName="votes">
                {Question.vote}
            </div>
            <Button //Add Buttons to upvote / downvote
            ></Button>
            </div>
        </div> 
        <div className="QdetailBoxRight">
            <div className = "questionContent">
                {Question.content}
            </div>
            <div className="questionTags">
                {Question.tags.map(tag => <span><Link /*TODO: use Rounter*/><span className="tagInfo">{tag.name}</span></Link></span>)}
            </div>
            <div className="questionbottomBox">
                <Button>share</Button>
                <AuthorProfile id={Question.id} created_date={Question.created_at}/>
            </div>
        </div>   
    </Fragment>)
}

export default QdetailBox