import React from 'react';
import {Link} from 'react-router-dom'

import AuthorProfile from '../Profile/AuthorProfile'
import styles from './QuestionItem.module.scss'

const QuestionItem= (Question) => {
    const Question_info = Question.Question_info
    console.log("Question Item");
    console.log(Question_info);
    const ContentPeak = Question_info.content.length >= 600 ? Question_info.content.substring(0,600) + "..." : Question_info.content.substring(0,600) + "..."//TODO: show 200 texts? 
    console.log(ContentPeak);
    return(
    <div className={styles.box}>
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
                    <div className={styles.vert_10}/>
                    <div className={styles.answerCountBox}>
                        <div className={styles.answer_square}>
                            <div className={styles.answers_number}>
                                {Question_info.answer_count}
                            </div>
                        </div>
                        <div className={styles.answer_text}>
                            Answer
                        </div>
                    </div>
                    <div className={styles.vert_10}/>
                    <div className={styles.viewsBox}>
                        {Question_info.view_count} views
                    </div>
                <div className={styles.vert_10}/>

                    <div className={styles.bookmark}> 
                    </div>
                </div>
                <div className={styles.QuestionItemRight}>
                    <div className={styles.titlebox}>
                        <Link style={styles.titlebox} to={'/question/' + Question_info.id + '/'}>{Question_info.title}</Link> 
                    </div>
                    <div className={styles.contentpeak}>
                        {ContentPeak}
                    </div>
                    <div className={styles.tags}>
                        {Question_info.tags.map((tag) => {return <span><Link to={`/question/tagged/?tags=${tag.name}&sorted_by=newest&page=1`} ><span className="tagInfo">{tag.name}</span></Link></span>})}

                    </div>
                    <AuthorProfile question={Question_info}/>
                </div>
        </div>
        <div>
            <hr className={styles.title_line}/>  
        </div>
    </div>
    )
}

export default QuestionItem;