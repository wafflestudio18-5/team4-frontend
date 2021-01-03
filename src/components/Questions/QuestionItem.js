import React , {Fragment, Link} from 'react';
import AuthorProfile from '../Profile/AuthorProfile'

const QuestionItem= (Question) => {
    const Question_info = Question.Question_info
    var ContentPeak = Question_info.content.substring(200) //TODO: show 200 texts? 
    return(
        <>
                <div>
                    {Question_info.content}
                </div>
                <div className ="QuestionItemLeft">
                    <div className="answerCountBox">
                        answers: {Question_info.answer_count}
                    </div>
                    <div className="voteBox">       
                        votes: {Question_info.vote}
                    </div>
                    <div className="viewsBox">
                        views: {Question_info.views_count}
                    </div>
                    <div className="bokmark" /*TODO: use Redux to determine auth : Incluse Button. etc...*/> 
                    </div>
                </div>
                <div className="QuestionItemRight">
                    <div className="questionTitle">
                        {/* <Link to={'/question/' + Question_info.id + '/'}>{Question_info.title}</Link> */}
                    </div>
                        {ContentPeak}
                    <div className="tags">
                        {/* {Question_info.tags.map((tag) => {return <span><Link ><span className="tagInfo">{tag.name}</span></Link></span>})} */}
                    </div>
                    <AuthorProfile id={Question_info.author.id} created_date={Question_info.created_at}/>
                </div>
        </>
    )
}

export default QuestionItem;