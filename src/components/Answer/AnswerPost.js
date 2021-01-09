import {useState, Fragment} from 'react'
import MDEditor from '@uiw/react-md-editor';
import {useSelector} from 'react-redux' 
import axios from 'axios'
import {useHistory} from 'react-router-dom'


//get id of question
const AnswerPost = (id) => {   
    console.log(id);
    const history = useHistory();
    const isLoggedin = useSelector(state => state.isLoggedReducer.loggedin)
    const token = useSelector(state => state.userInfoReducer.user.token)
    const [Content, setContent] = useState("")
    const instance = axios.create({
        baseURL: 'http://localhost:8000/api/',
        headers: { 'Authorization' : 'Token ' + token},
      });
    const postAns = (content) => {
        console.log(Content);
        if (Content.length > 10) {
            instance.post(`/answer/question/${id.id}/`, {content:Content})
                .then(res => {
                    setContent("")
                    console.log(res);
                    history.go(0);
                })
                .catch(e => {
                    console.log(e);
                })
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