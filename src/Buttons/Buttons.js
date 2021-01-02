import {useHistory} from 'react'

export const AskButton = () => {
    const history = useHistory();
    const Ask = () => {
        history.push('/question/ask')
    }
    return(
        <div className="ask-q-box">
            <button className="ask-q-btn" onClick={Ask}>Ask a Question</button>
        </div>
    )
}

