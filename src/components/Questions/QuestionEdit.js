import {useSelector} from 'react-redux'
import axios from 'axios'
import {useHistory} from 'react-router-dom'
import {useState, useEffect} from 'react'
import MDEditor from '@uiw/react-md-editor'
import { editQuestion } from '../../axios'


const QuestionEdit = (match) => {
    const question_id = match.match.params.question_id
    const isLoggedin = useSelector(state => state.isLoggedReducer.loggedin)
    const token = useSelector(state => state.isLoggedReducer.token) //redux 에서 islooedin. token 가져오기
    const user_id = useSelector(state => state.userInfoReducer.user.id)
    console.log(isLoggedin);
    console.log(token);
    //const history = useHistory();
    const [title, setTitle] = useState("")
    const [body, setBody] = useState("")
    const [tags, setTags] = useState("")
    const [permit, setPermit] = useState(false)
    const history = useHistory();

    const instance = axios.create({
        baseURL: 'https://www.wafflow.com/api/',
        headers: { 'Accept' : "application/json", 'Authorization' : isLoggedin? `Token ${token}`:''},
      });

    useEffect( () => {
        if (!isLoggedin) {
            setPermit(false)
            history.go(-1);
        }
        if (body === "") {
            getQuestion(question_id)
                .then(res => {
                    console.log(res);
                    const question = res
                    if (question.author.id !== user_id) {
                        setPermit(false)
                        history.go(-1)
                    }
                    else {
                        setBody(question.content)
                        setTitle(question.title)
                        var tags = ""
                        question.tags.forEach(tag => {
                            tags += (tag.name + " ")
                        })
                        console.log(tags);
                        setTags(tags)
                        setPermit(true)
                    }
                })
                .catch(e => {
                    console.log(e);
                    history.go(-1)
                })
        }
    })

    function submit() {
        console.log(title);
        console.log(body);
        console.log(tags.replace('+','%2b').replace(' ', '+'));
        editQuestion(question_id, {title: title, content: body, tags: tags.replace('+','%2b').replace(' ', '+')})
            .then(res => {
                console.log(res);
                history.go(-1)
            })
            .catch(e => {
                console.log(e);
            })
    }

    function cancel() {
        history.go(-1);
    }

    return (
        <div>
            {!(permit)? 
            <div>
                You Have No Permission
            </div>    
            
            :
        <div>
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
                            Save your Edit
                        </button>
                        <button onClick = {cancel} class="qask-btn-submit" /*TODO: Review and Post are divided in the original site*/>
                            Cancel
                        </button>
                    </div>
                </div>
            </div>
        </div>
    }
    </div>
    )
    
      
}

export default QuestionEdit