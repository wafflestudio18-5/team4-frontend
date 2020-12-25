import {Fragment} from 'react'
import {Link} from 'react-router-dom'

//The Main Page needs many Components : TopBar, List of Questions, ...etc
const Main = () => {
    return(
        <Fragment> 
            <h1 className="main-title-box" style={{'text-Align':'center'}}>
                Wafflow는 와플스튜디오의 핵심적인 아카이브 서비스입니다. 
            </h1>
            <h3 className="main-subtitle" style={{'text-Align':'center'}}>
                풍부한 가능성, 신뢰할 수 있는 네트워크
            </h3>
            <div style={{'text-Align':'center'}}>
                 <img src="https://www.cuisinart.com/globalassets/recipes/recipe_6135_13606779" alt="waffle" align="center"/>
            </div>
            <br></br>
           
            <h3 style={{'text-Align':'center'}}>
                지금 Wafflow와 함께히세요
            </h3> 
            <div style={{'text-Align':'center'}}>
                <ul>
                    <li>
                        <Link to="/">to Main Page</Link>
                    </li>
                    <li>
                        <Link to="/question/1">to Question Page id : 1</Link>
                    </li>
                    <li>
                        <Link to="/question/user/123">Questions : User (id: 123)</Link>
                    </li>
                    <li>
                        <Link to="/question/tagged?tags=python+django&page=1&filter_by=no_answer">Questions : Tags python+django, page 1, filter by no_answer</Link>
                    </li>
                </ul>
                
            </div>
            
        </Fragment>
    )
}

export default Main