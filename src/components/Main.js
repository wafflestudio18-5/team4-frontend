import {useHistory} from 'react-router-dom'
//The Main Page needs many Components : TopBar, List of Questions, ...etc
const Main = () => {
    const history = useHistory()
    return(
        <> 
            <h1 className="main-title-box" style={{'textAlign':'center'}}>
                Wafflow는 와플스튜디오의 핵심적인 아카이브 서비스입니다. 
            </h1>
            <h3 className="main-subtitle" style={{'textAlign':'center'}}>
                풍부한 가능성, 신뢰할 수 있는 네트워크
            </h3>
            <button onClick={()=>{history.push('/users')}}>모든 유저 보기</button>
            <div style={{'textAlign':'center'}}>
                 <img src="https://www.cuisinart.com/globalassets/recipes/recipe_6135_13606779" alt="waffle" align="center"/>
            </div>
            <br></br>
           
            <h3 style={{'textAlign':'center'}}>
                지금 Wafflow와 함께하세요
            </h3> 
        </>
    )
}

export default Main