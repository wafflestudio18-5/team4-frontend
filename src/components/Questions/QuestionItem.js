import React from 'react';
import {Link} from 'react-router-dom'

import AuthorProfile from '../Profile/AuthorProfile'
import {Link} from 'react-router-dom'
import styles from './QuestionItem.module.scss'

const QuestionItem= (Question) => {
    const Question_info = Question.Question_info
    console.log("Question Item");
    console.log(Question_info);
    const ContentPeak = Question_info.content.length >= 600 ? Question_info.content.substring(0,600) + "..." : Question_info.content.substring(0,600) + "..."//TODO: show 200 texts? 
    console.log(ContentPeak);
    return(
        <div className={styles.board}>
                <div className ={styles.QuestionItemLeft}>
                    <div className={styles.voteBox}>       
                        <div className={Question_info.isaccepted? styles.vote_aquare_accepted : styles.vote_square}>
                            <div className={styles.votes_number}>
                                {Question_info.vote}
                            </div>
                            
                        </div>
                        <div className={styles.vote_text}>
                            Votes
                        </div>

                    </div>
                    <div className={styles.answerCountBox}>
                        answers: {Question_info.answer_count}
                    </div>
                    <div className={styles.viewsBox}>
                        views: {Question_info.view_count}
                    </div>
                    <div className={styles.bokmark} /*TODO: use Redux to determine auth : Incluse Button. etc...*/> 
                    </div>
                </div>
                <div className={styles.QuestionItemRight}>
                    <div className={styles.titlebox}>
                        <Link to={'/question/' + Question_info.id + '/'}>{Question_info.title}</Link> 
                    </div>
                    <div className={styles.contentpeak}>
                        {ContentPeak}
                    </div>
                    <div className={styles.tags}>
                        {/* {Question_info.tags.map((tag) => {return <span><Link ><span className="tagInfo">{tag.name}</span></Link></span>})} */}

                    </div>
                    <AuthorProfile question={Question_info}/>
                </div>
        </div>
    )
}

export default QuestionItem;