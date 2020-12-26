import React, {useState} from 'react'
import {getQuestionbyKwds} from '../../axios'
import {useHistory} from 'react-router-dom'
const Header = () => {
    let history = useHistory();
    const [command, setCommand] = useState('');
    const search = () => {
    /*GET /question/search/keywords*/
        history.push("/users/me")
    }
    return (
        <div>
            <a /*TODO: provide href*/>wafflow</a>
        <form role="search" action="/search">
            <input onChange={(e)=>{setCommand(e.target.value)}} name="q" type="text" value={command} maxLength="200" placeholder="Search..."/>
            <button onClick={()=>{console.log("click");search();}}>Search</button>
        </form>
        <div>
            {/*user image redirected to user page*/}
            
            {/*reputation*/}

            {/*history*/}

        </div>
        </div>
    )
}
export default Header