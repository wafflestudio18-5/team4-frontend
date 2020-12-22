import React , {Fragment, Link} from 'react';
import AuthorProfile from './AuthorProfile'

const QuestionItem= (Question_info) => {
    var TextGradient = require('react-textgradient');

    var ContentPeak = Question_info.content.substring(200) //TODO: show 200 texts? 
    return(
        <Fragment className="QuestionItemBox">
            <Link /*TODO: use Redux to determine path*/>
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
                        {Question_info.title}
                    </div>
                    <TextGradient className="content" //TODO: I am tryping to put some content as gradient, however we are using .md files
                        text={ContentPeak}
                        fromColor='#000000'
                        toColor='#CDCDCD'
                        direction='bottom' /> 
                    <div className="tags">
                        {Question_info.tags.map((tag) => {return <span><Link /*TODO: use Rounter*/><span className="tagInfo">{tag.name}</span></Link></span>})}
                    </div>
                    <AuthorProfile id={Question_info.author.id} created_date={Question_info.created_at}/>
                </div>
            </Link>
        </Fragment>
    )
}

export default QuestionItem;