
const QuestionAskGuide =() => {
    return(
        <div className="qask-guide-box ">
            <div className="qask-guide-firstbox">
                <div className="qask-guide-firstbox-title">Step 1: Draft your question</div>
                <div className="qask-guide-firstbox-title-sub">
                    <div className="qask-guide-firstbox-title-sub-content">
                        The community is here to help you 
                        with specific coding, algorithm, or language problems. 
                        Avoid asking opinion-based questions.
                    </div>
                </div>
                <div className="qask-guide-firstbox-first-title">Summarize the Problem</div>
                <div className="qask-guide-firstbox-first-body">
                    <ul>
                        <li className="qask-guide-firstbox-first-body-one">Include details about your goal</li>
                        <li className="qask-guide-firstbox-first-body-two">Describe expected and actual results</li>
                        <li className="qask-guide-firstbox-first-body-three">Include any error messages</li>
                    </ul>
                </div>
                <div className="qask-guide-firstbox-second-title">Describe what you've tried</div>
                <div className="qask-guide-firstbox-second-body">
                    <div className="qask-guide-firstbox-second-body-one">
                        Show what you’ve tried and tell us what you found (on this site or elsewhere) 
                        and why it didn’t meet your needs. 
                        You can get better answers when you provide research.
                    </div>
                </div>
                <div className="qask-guide-firstbox-third-title"> Show some code</div>
                <div className="qask-guide-firstbox-third-body" /*TODO: here used to be a link, consider later*/>
                    <div className="qask-guide-firstbox-third-body-one">
                    When appropriate, share the minimum amount of code others need to reproduce your problem 
                    (also called a minimum, reproducible example)
                    </div>
                </div>
            </div>
            <div className="qask-guide-secondbox">
                <div className="qask-guide-secondbox-title">Have a non-programming question?</div>
                <div className="qask-guide-secondbox-title-sub">
                    <pre class="qask-guide-secondbox-title-sub-content">
                        Super user
                        Troubleshooting hardware and software issues

                        Software engineering
                        For software development methods and process questions

                        Hardware recommendations

                        Software recommendations

                        Ask questions about the site on meta
                    </pre>
                </div>
            </div>
            <div className="qask-guide-thirdbox">
            <div className="qask-guide-thirdbox-title">More helpful Links</div>
                <div className="qask-guide-thirdbox-title-sub">
                    <pre class="qask-guide-thirdbox-title-sub-content">
                        Find more information about how to ask a good question here

                        Visit the help center
                    </pre>
                </div>
            </div>
        </div>
    )
}

export default QuestionAskGuide