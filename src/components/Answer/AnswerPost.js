import {useState, Fragment} from 'react'
import MDEditor from '@uiw/react-md-editor';
import {useSelector} from 'react-redux' 
import axios from 'axios'
import {useHistory} from 'react-router-dom'
import { postAnswer } from '../../axios';


//get id of question
const AnswerPost = (id) => {   
    const isLoggedin = useSelector(state => state.isLoggedReducer.loggedin)
    const token = useSelector(state => state.isLoggedReducer.token)
    const [content, setContent] = useState("")
    const postAns = (content) => {
        console.log(content);
        if (content.length > 10) {
            postAnswer(id.id, content)
                .then(res => {
                    setContent("")
                    console.log(res);
                })
                .catch(e => {
                    console.log(e);
                })
            setContent("")
        }
        else {
            alert("answer is too short!")
        }
    }

    return(
        <Fragment>
            <div className="ans-content-box">
                <MDEditor
                    value={content}
                    onChange={e => setContent(e)}/>
                {/* <MDEditor.Markdown source={Content} /> */}
            </div>
            <div className="ans-post-btn-box">
                <button className="ans-post-btn" onClick={e => {postAns(content)}}>Post Your Answer</button>
            </div>
        </Fragment>
    )
}

export default AnswerPost