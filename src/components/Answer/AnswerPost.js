import {useState, Fragment} from 'react'
import MDEditor from '@uiw/react-md-editor';
import {useSelector} from 'react-redux' 
import axios from 'axios'


//get id of question
const AnswerPost = (id) => {   
    const isLoggedin = useSelector(state => state.isLoggedReducer.loggedin)
    const token = useSelector(state => state.userInfoReducer.token)
    const [Content, setContent] = useState("")

    const instance = axios.create()
           
    const postAns = () => {

    }

    return(
        <Fragment className="ans-post-box">
            <div className="ans-content-box">
                <MDEditor class="qask-body-editor"
                    value={Content}
                    onChange={e => setContent(e)}/>
                <MDEditor.Markdown source={Content} />
            </div>
            <div className="ans-post-btn-box">
                <button className="ans-post-btn" onClick={e => {postAns()}}></button>
            </div>
        </Fragment>
    )
}

export default AnswerPost