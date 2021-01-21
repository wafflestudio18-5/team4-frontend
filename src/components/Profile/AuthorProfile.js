import {useState, Fragment, useEffect} from 'react'
import {getUser} from '../../Api/axios.ts'
import styles from './AuthorProfile.module.scss'
import defaultPicture from '../../profile_image.png'
import {useHistory} from 'react-router-dom'
const AuthorProfile = (data) => {
    const id = data.question.id
    const created_date = data.question.created_at
    const [Author, setAuthor] = useState(null)
    const [picture, setPicture] = useState(null)
    const history = useHistory()
    useEffect(() => {
        if (Author === null) {
        getUser(data.question.author.id)
        .then(res => {
            setAuthor(res)
            console.log(Author.picture);
            if (Author.picture === null) {

            }
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
        <div className={styles.board} onClick={()=>{history.push(`/users/${Author.id}`)}}>
            <div className={styles.created_date}>
                asked at {created_date.substring(0,10)}
            </div>
            <div className={styles.author_profile_bottom}>
                <div className={styles.author_pic}>
                    <img src={Author.picture? Author.picture:defaultPicture} className={styles.img} alt={`Author:${Author.nickname}`}/>
                </div>
                <div className={styles.author_info}>
                    <div className={styles.author_nickname}>{Author.nickname}</div>
                    <div className={styles.author_reputation}>reputation: {Author.reputation}</div>
                </div>
            </div>
        </div>
    )
}

export default AuthorProfile