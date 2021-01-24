import {Fragment, useState} from 'react'
import {useHistory} from 'react-router-dom'
import React from 'react'
import axios from 'axios'
import QuestionAskGuide from './QuestionAskGuide'
import {postQuestion} from '../../axios.ts'
import MDEditor from '@uiw/react-md-editor'
import TagEditor from 'react-tageditor'
import {useSelector, useDispatch} from 'react-redux'
import { StylesProvider } from '@material-ui/core'
import styles from './QuestionAsk.module.scss'



const QuestionAsk = () =>  {
    const isLoggedin = useSelector(state => state.isLoggedReducer.loggedin)
    const token = useSelector(state => state.isLoggedReducer.token) //redux 에서 islooedin. token 가져오기

    const history = useHistory();
    const [title, setTitle] = useState("")
    const [body, setBody] = useState("")
    const [tags, setTags] = useState("")


    function submit() {
        console.log(title);
        console.log(body);
        if (!title || !body) {
            alert("content too short")
        }
        console.log(tags.replace(' ', '+'));
        postQuestion.post({title: title, content: body, tags: tags.split(' ')})
            .then(res => {
                console.log(res);
                history.push('/')
            })
            .catch(console.log)
    }

    return (
        <div className={styles.board_all}>
            <div className={styles.box_top}>
                <div className={styles.box}>
                <div className={styles.top_sub1}>
                        Ask a public question
                    </div>
                </div>
            </div>
            <div className={styles.box}>
            
            <div className={styles.board}>
                <div className={styles.top}>

                </div>
                <div className={styles.body}>
                    <div className={styles.body_sub}>
                        
    
                    <div className={styles.title_box}>
                    <div className={styles.top_sub}>Title</div>
                    <div className={styles.help1}>Be specific and imagine you’re asking a question to another person</div>
                    <div className={styles.input_box}>
                        <input className={styles.input_title} value={title} onChange={(e)=>{setTitle(e.target.value)}}/>
    
                    </div>
                </div>
                <div classNameName="qask-body-box">
                    <div className={styles.top_sub}>Body</div>
                    <div className={styles.help1}>Include all the information someone would need to answer your question</div>
                    <MDEditor 
                    value={body}
                    onChange={(e) => {console.log(e); setBody(e)}}
                    />
                </div>
    
              <div className={styles.up_margin}>
                    <div className={styles.top_sub}>Tags</div>
                    <div className={styles.help1}>Add up to 5 tags to describe what your question is about</div>
                    <div className="qask-tags-input-box">
                    <input className={styles.input_title} value={tags} placeholder="Input tags, seperated by space" onChange={(e)=>{setTags(e.target.value)}}/>
                    </div>
                </div>
    
                        
                    </div>
    
                </div>
                <div className="qask-body-left-buttonbox">
                            <div onClick = {() => {submit()}} className={styles.btn} /*TODO: Review and Post are divided in the original site*/>
                                Post Your Question
                            </div>
                        </div>
            </div>
           
            </div>
        </div>

    )
    }

export default QuestionAsk