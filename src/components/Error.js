import {Fragment} from 'react'
import {Link} from 'react-router-dom'

export const Error404 = () => {
    return(
        <Fragment>
            <div>
            Error 404: Failed to recieve valid Responses from the server
            </div>
            <div>
                <Link to="/">to main</Link>
            </div>
        </Fragment>
    )
} 