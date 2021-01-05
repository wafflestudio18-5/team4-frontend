import {useHistory} from 'react-router-dom'
import Button from '../Button_search'

export const LeftBanner = () => {
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
        <div>
            <div>
                <div>
                    <Button title="Home" onClick={() => {goHome()}}></Button>
                </div>
                <div>
                    <Button title="Tags" onClick={() => {goTags()}}></Button>
                </div>
                <div>
                    <Button title="Users" onClick={() => {goUsers()}}></Button>
                </div>
            </div>
        </div>
    )
}