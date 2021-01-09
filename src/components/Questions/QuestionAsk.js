
import {Fragment, useState} from 'react'
import {useHistory} from 'react-router-dom'
import React from 'react'
import axios from 'axios'
import QuestionAskGuide from './QuestionAskGuide'
import {postQuestion} from '../../axios.ts'
import MDEditor from '@uiw/react-md-editor'
import TagEditor from 'react-tageditor'
import {useSelector, useDispatch} from 'react-redux'


const QuestionAsk = () =>  {
    const isLoggedin = useSelector(state => state.isLoggedReducer.loggedin)
    const token = useSelector(state => state.userInfoReducer.user.token) //redux 에서 islooedin. token 가져오기
    console.log(isLoggedin);
    console.log(token);


    const history = useHistory();

    const instance = axios.create({
        baseURL: 'https://www.wafflow.com/api/',
        headers: {'Accept' : "application/json", 'Authorization' : 'Token ' + token},
      });

    //const history = useHistory();
    const [title, setTitle] = useState("")
    const [body, setBody] = useState("")
    const [tags, setTags] = useState("")


    function submit() {
        console.log(title);
        console.log(body);
        console.log(tags.replace('+','%2b').replace(' ', '+'));
        instance.post("question/", {title: title, content: body, tags: tags.replace('+','%2b').replace(' ', '+')})
            .then(res => {
                console.log(res);
                history.go(-1)
            })
            .catch(e => {
                console.log(e);
            })
    }

    return (
        <Fragment>
            <div className="qask-banner-top">
                <div className="qask-banner-top-title">
                    Ask a public question
                </div>
            </div>
            <div className="qask-body">
                <div className="qask-body-left">
                    

            <div className="qask-title-box">
                <div className="qask-title">Title</div>
                <div className="qask-title-sub">Be specific and imagine you’re asking a question to another person</div>
                <div className="qask-title-input-box">
                    <input className="qask-title-input" value={title} onChange={(e)=>{setTitle(e.target.value)}}/>

                </div>
            </div>
            <div classNameName="qask-body-box">
                <div className="qask-body">Body</div>
                <div className="qask-body-sub">Include all the information someone would need to answer your question</div>
                <MDEditor 
                value={body}
                onChange={(e) => {console.log(e); setBody(e)}}
                />
                <MDEditor.Markdown source={body} />
            </div>

          <div className="qask-tags-box">
                <div className="qask-tags">Tags</div>
                <div className="qask-tags-sub">Add up to 5 tags to describe what your question is about</div>
                <div className="qask-tags-input-box">
                <input className="qask-title-input" value={tags} placeholder="Input tags, seperated by space" onChange={(e)=>{setTags(e.target.value)}}/>
                </div>
            </div>

                    <div className="qask-body-left-buttonbox">
                        <button onClick = {submit} class="qask-btn-submit" /*TODO: Review and Post are divided in the original site*/>
                            Post Your Question
                        </button>
                    </div>
                </div>
                <QuestionAskGuide/>
            </div>
        </Fragment>
    )
    }

export default QuestionAsk