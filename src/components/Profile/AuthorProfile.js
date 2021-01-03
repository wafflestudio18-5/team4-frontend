import {useState, Fragment} from 'react'
import {getUser} from '../../axios.ts'

const AuthorProfile = (id, created_date) => {
    const [Author, setAuthor] = useState({})
    setAuthor(getUser(id))
    return (
        <Fragment /*asked at: should we change this to create {date} at {time}? */>
            asked at {created_date}
            <div className="author-profile-bottom">
                <div className="author-pic">
                    <img src={Author.picture} alt="Author's profile"></img>
                </div>
                <div className="author-info">
                    <div className="author-username">{Author.username}</div>
                    <div className="author-reputation">reputation: {Author.reputation}</div>
                </div>
            </div>
        </Fragment>
    )
}

export default AuthorProfile