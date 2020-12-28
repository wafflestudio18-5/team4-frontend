import {Fragment} from 'react'
import {Link} from 'react-router-dom'

export const Error404 = () => {
    return(
        <Fragment>
            <h1 style={{'text-align':'center','font-weight':700, 'font-size': 160, 'margin': 5}}>
                404
            </h1> 
            <div style={{'text-align':'center'}}>
                <img src='https://media.gettyimages.com/photos/woman-shocked-at-oven-fire-while-cooking-in-the-kitchen-picture-id538653529?s=612x612'></img>
            </div>
            <div style={{'text-align':'center', 'font-size': 50, 'margin': 19}}>
                <Link to="/">to main</Link>
            </div>
        </Fragment>
    )
} 