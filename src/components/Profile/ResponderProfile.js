import {useState, Fragment, useEffect} from 'react'
import {getUser} from '../../Api/axios.ts'


const ResponderProfile = (answer) => {
    const Answer = answer.answer
    const [Responder, setResponder] = useState(null)
    useEffect ( () => {
        if (Responder !== null) {
            return;
        }
        getUser(Answer.author.id)
        .then(res => {
            console.log(res);
            setResponder(res)
        })
        .catch(e => {
            console.log(e);
        })
    })

    return (
        <>
        {Responder? 
        <>
        <Fragment>
            replied at {Answer.created_at}, updated at {Answer.updated_at}
            <div className="author-profile-bottom">
                <div className="author-pic">
                    <img src={Responder.picture} alt="Author's profile"></img>
                </div>
                <div className="author-info">
                    <div className="author-username">{Responder.username}</div>
                    <div className="Responder-reputation">reputation: {Responder.reputation}</div>
                </div>
            </div>
        </Fragment>
        </>
        :
        <>
        </>
        }
        </>
    )
}

export default ResponderProfile