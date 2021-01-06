import {useState, Fragment} from 'react'
import MDEditor from '@uiw/react-md-editor';
import {useSelector} from 'react-redux' 
import axios from 'axios'
import {postAnswer} from '../../axios'


//get id of question
const AnswerPost = (id) => {   
    console.log(id);
    const isLoggedin = useSelector(state => state.isLoggedReducer.loggedin)
    const token = useSelector(state => state.userInfoReducer.token)
    const [Content, setContent] = useState("")
    const postAns = (content) => {
        console.log(Content);
        if (Content.length > 10) {
            postAnswer(parseInt(id.id, 10), Content)
            setContent("")
        }
        else {
            alert("answer too short!")
        }
    }

    return(
        <Fragment>
            <div className="ans-content-box">
                <MDEditor
                    value={Content}
                    onChange={e => setContent(e)}/>
                {/* <MDEditor.Markdown source={Content} /> */}
            </div>
            <div className="ans-post-btn-box">
                <button className="ans-post-btn" onClick={e => {postAns(Content)}}>Post Your Answer</button>
            </div>
        </Fragment>
    )
}

export default AnswerPost