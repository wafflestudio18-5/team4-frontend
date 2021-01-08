import React from 'react';
import {Link, useHistory} from 'react-router-dom'
import { getJSDocTags } from 'typescript';

import AuthorProfile from '../Profile/AuthorProfile'
import styles from './QuestionItem.module.scss'

const tagsForm = (tag_name) => {
    return (
        <div className={styles.tags}>
            {tag_name}
        </div>
    )
}


const QuestionItem= (Question) => {
    const history = useHistory();
    const Question_info = Question.Question_info
    console.log("Question Item");
    console.log(Question_info);
    const ContentPeak = Question_info.content.length >= 600 ? Question_info.content.substring(0,600) + "..." : Question_info.content.substring(0,600) + "..."//TODO: show 200 texts? 
    console.log(ContentPeak);

    const goQuestion = () => {
        history.push(`/question/${Question_info.id}/`);
        history.go(0);
    }

    const goTags = (tag_name) => {
        history.push(`/question/tagged/?tags=${tag_name}&page=1&sorted_by=newest/`);
    }


    return(
    <div className={styles.box}>
        <div className={styles.board}>
                <div className ={styles.QuestionItemLeft}>
                    <div className={styles.statsBox}>       
                        <div className={Question_info.isaccepted? styles.vote_aquare_accepted : styles.vote_square}>
                            <div className={styles.votes_number}>
                                {Question_info.vote}
                            </div>
                            
                        </div>
                        <div className={styles.vote_text}>
                            Votes
                        </div>
                        <div className={Question_info.isaccepted? styles.answer_square_accepted : styles.answer_square}>
                        <div className={styles.answers_number}>
                            <strong>{Question_info.answer_count}</strong>
                        </div>
                        <div className={styles.answer_text}>
                            Answer
                        </div>
                        </div>
                    </div>
                    <div className={styles.viewsBox}>
                        {Question_info.view_count} views
                    </div>
                <div className={styles.vert_10}/>

                    <div className={styles.bookmark}> 
                    </div>
                </div>
                <div className={styles.QuestionItemRight}>
                    <div className={styles.titlebox} onClick={() => {goQuestion()}}>
                        {Question_info.title}
                    </div>
                    <div className={styles.contentpeak}>
                        {ContentPeak}
                    </div>
                    <div className={styles.infobox}>
                        <div className={styles.tags_list}>
                            {Question_info.tags.map((tag) => {return  <div className={styles.tags} onClick={() => {goTags(tag.name)}}>{tag.name}</div>})}
                        </div>
                        <AuthorProfile question={Question_info}/>
                    </div>
                   
                </div>
        </div>
        {/* <div>
            <hr className={styles.title_line}/>  
        </div> */}
    </div>
    )
}

export default QuestionItem;