import {useState, Fragment} from 'react'
import {getUser} from '../../axios.ts'

const AuthorProfile = ({question}) => {
    const {author} = question
    return (
        <Fragment /*asked at: should we change this to create {date} at {time}? */>
            asked at {question.created_at}
            <div className="author-profile-bottom">
                <div className="author-pic">
                    <img src={author?.picture} alt="Author's profile"></img>
                </div>
                <div className="author-info">
                    <div className="author-username">{author?.nickname}</div>
                    <div className="author-reputation">reputation: {author?.reputation}</div>
                </div>
            </div>
        </Fragment>
    )
}

export default AuthorProfile