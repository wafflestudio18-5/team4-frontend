import {useState, Fragment} from 'react'
import MDEditor from '@uiw/react-md-editor';
import TagEditor from 'react-tageditor'

const QuestionAskBox = () => {
    const [title, setTitle] = useState("")
    const [body, setBody] = useState("")
    const [tags, setTags] = useState([])

    return(
        <Fragment className="qask-box">
            <div className="qask-title-box">
                <div className="qask-title">Title</div>
                <div className="qask-title-sub">Be specific and imagine you’re asking a question to another person</div>
                <div className="qask-title-input-box">
                    <input className="qask-title-input" value={title} onChange={setTitle}/>
                </div>
            </div>
            <div classNameName="qask-body-box">
                <div className="qask-body">Body</div>
                <div className="qask-body-sub">Include all the information someone would need to answer your question</div>
                <MDEditor className="qask-body-editor"
                    value={body}
                    onChange={setBody}/>
                <MDEditor.Markdown source={body} />
            </div>
          <div className="qask-tags-box">
                <div className="qask-tags">Tags</div>
                <div className="qask-tags-sub">Add up to 5 tags to describe what your question is about</div>
                <div className="qask-tags-input-box">
                    <TagEditor className="qask-tags-editor" tags={tags} delimiters={[' ']} 
                    onChange={setTags} placeholder="Input tags, split by space" />
                </div>
            </div>
        </Fragment>
    )
}

export default QuestionAskBox