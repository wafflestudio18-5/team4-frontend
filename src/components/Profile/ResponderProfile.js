import {useState, Fragment} from 'react'
import {getUser} from '../../axios.ts'


const ResponderProfile = (id, created_date, updated_date) => {
    const [Responder, setResponder] = useState(null)
    getUser(id)
        .then(res => {
            console.log(res);
            setResponder(res.data)
        })
        .catch(e => {
            console.log(e);
        })
    return (
        <>
        {Responder? 
        <>
        <Fragment>
            replied at {created_date}, {(created_date !== updated_date) && (", updated at") && {updated_date}}
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