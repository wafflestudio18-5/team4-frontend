import {useState, Fragment} from 'react'
import MDEditor from '@uiw/react-md-editor';
import TagEditor from '../dist/TagEditor.js'

const QuestionAskBox = () => {
    const [title, setTitle] = useState("")
    const [body, setBody] = useState("")
    const [tags, setTags] = useState([])

    return(
        <Fragment class="qask-box">
            <div class="qask-title-box">
                <div class="qask-title">Title</div>
                <div class="qask-title-sub">Be specific and imagine you’re asking a question to another person</div>
                <div class="qask-title-input-box">
                    <input class="qask-title-input" value={title} onChange={setTitle}/>
                </div>
            </div>
            <div className="qask-body-box">
                <div class="qask-body">Body</div>
                <div class="qask-body-sub">Include all the information someone would need to answer your question</div>
                <MDEditor class="qask-body-editor"
                    value={body}
                    onChange={setBody}/>
                <MDEditor.Markdown source={body} />
            </div>
          <div class="qask-tags-box">
                <div class="qask-tags">Tags</div>
                <div class="qask-tags-sub">Add up to 5 tags to describe what your question is about</div>
                <div class="qask-tags-input-box">
                    <TagEditor class="qask-tags-editor" tags={tags} delimiters={[' ']} 
                    onChange={setTags} placeholder="Input tags, split by space" />
                </div>
            </div>
        </Fragment>
    )
}

export default QuestionAskBox