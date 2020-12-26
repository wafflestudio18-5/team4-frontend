import {useState, Fragment} from 'react'
import MDEditor from '@uiw/react-md-editor';
import {postAnswer} from '../../axios.ts'

//get id of question
const AnswerPost = (id) => {    
    const [Content, setContent] = useState("")
    const postAns = (content) => {
        if (content.length() > 10) {
            postAnswer(id, content)
            setContent("")
        }
        else {
            alert("answer too short!")
        }
    }

    return(
        <Fragment className="ans-post-box">
            <div className="ans-content-box">
                <MDEditor class="qask-body-editor"
                    value={Content}
                    onChange={({target:{Content}}) => setContent(Content)}/>
                <MDEditor.Markdown source={Content} />
            </div>
            <div className="ans-post-btn-box">
                <button className="ans-post-btn" onClick={postAns(Content)}></button>
            </div>
        </Fragment>
    )
}

export default AnswerPost