import {useHistory} from 'react-router-dom'
import styles from './LeftBanner.module.scss'
import { Button } from '@material-ui/core';

const LeftBanner = () => {
    const history = useHistory();

    const goHome = () => {
        history.push('/')
    }

    const goTags = () => {
        history.push('/tags')
    }

    const goUsers = () => {
        history.push('/user/all')
    }

    return(
        <div className={styles.border}>
            <div className={styles.box}>
                <div className={styles.home_button}>
                    <Button onClick={() => {goHome()}}>Home</Button>
                </div>
                <div className={styles.tags_Button}>
                    <Button onClick={() => {goTags()}}>Tags</Button>
                </div>
                <div className={styles.users_Button}>
                    <Button onClick={() => {goUsers()}}>Users</Button>
                </div>
            </div>
        </div>
    )
}

export default LeftBanner