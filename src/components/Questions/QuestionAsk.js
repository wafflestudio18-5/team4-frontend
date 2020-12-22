import {Fragment, React} from 'react'
import QuestionAskBox from './QuestionAskBox'
import QuestionAskGuide from './QuestionAskGuide'
import {postQuestion} from '../../axios.ts'


const QuestionAsk = () => {
    this.AskBox = React.createRef();
    this.AskGuide = React.createRef();

    const submit = () => {
        const currentAskBox = this.AskBox.current;
        const {title, body, tags} = currentAskBox.state
        postQuestion({
            'title': title,
            'constent': body,
            'tags': tags.join('+')
        })
        //TODO: Router
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
                    <QuestionAskBox ref={this.AskBox}/>
                    <div classnName="qask-body-left-buttonbox">
                        <button onClick = {submit} class="qask-btn-submit" /*TODO: Review and Post are divided in the priginal site*/>
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