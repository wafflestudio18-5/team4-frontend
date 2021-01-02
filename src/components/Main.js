import {Fragment} from 'react'

//The Main Page needs many Components : TopBar, List of Questions, ...etc
const Main = () => {
    return(
        <Fragment> 
            <h1 className="main-title-box" style={{'textAlign':'center'}}>
                Wafflow는 와플스튜디오의 핵심적인 아카이브 서비스입니다. 
            </h1>
            <h3 className="main-subtitle" style={{'textAlign':'center'}}>
                풍부한 가능성, 신뢰할 수 있는 네트워크
            </h3>
            <div style={{'textAlign':'center'}}>
                 <img src="https://www.cuisinart.com/globalassets/recipes/recipe_6135_13606779" alt="waffle" align="center"/>
            </div>
            <br></br>
           
            <h3 style={{'textAlign':'center'}}>
                지금 Wafflow와 함께하세요
            </h3> 
        </Fragment>
    )
}

export default Main