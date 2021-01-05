import {useState, Fragment, useEffect} from 'react'
import {getUser} from '../../axios.ts'


const AuthorProfile = (data) => {
    console.log(data);
    const id = data.question.id
    const created_date = data.question.created_at
    const [Author, setAuthor] = useState(null)

    useEffect(() => {
        if (Author === null) {
        getUser(data.question.id)
        .then(res => {
            console.log(res);
            setAuthor(res)
        })
        .catch(e => {
            console.log(e);
        })
    }
        
    })
    if (Author === null) {
        return (
            <>
            Loading
            </>
        )
    }
    return (
        <Fragment>
            asked at {created_date}
            <div className="author-profile-bottom">
                <div className="author-pic">
                    <img src={Author?.picture} alt="Author's profile"></img>
                </div>
                <div className="author-info">
                    <div className="author-username">{Author.nickname}</div>
                    <div className="author-reputation">reputation: {Author.reputation}</div>
                </div>
            </div>
        </Fragment>
    )
}

export default AuthorProfile