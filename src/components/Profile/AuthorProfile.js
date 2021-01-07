import {useState, Fragment, useEffect} from 'react'
import {getUser} from '../../axios.ts'
import styles from './AuthorProfile.module.scss'


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
        <div className={styles.board}>
            <div className={styles.created_date}>
                asked at {created_date.substring(0,10)}
            </div>
            <div className={styles.author_profile_bottom}>
                <div className={styles.author_pic}>
                    <img src={Author?.picture} alt="Author's profile"></img>
                </div>
                <div className={styles.author_info}>
                    <div className={styles.author_username}>{Author.nickname}</div>
                    <div className={styles.author_reputation}>reputation: {Author.reputation}</div>
                </div>
            </div>
        </div>
    )
}

export default AuthorProfile