import React, {useState, useEffect} from 'react';
import {getUserMe} from '../../axios';
import {useHistory} from 'react-router-dom';
import {
    BrowserRouter as Router,
    Switch,
    Route,
    useParams,
    useRouteMatch
  } from "react-router-dom";
import Activity from './Activity';
import Profile from './Profile';
const Me = () => {
    let history = useHistory();
    let {tab} = useParams();
    let match = useRouteMatch();
    const [user, setUser] = useState({ 
        "id": 0,
        "username": "waffle",
        "created_at": 0,
        "updated_at": 0,
        "email": "waffle@wafflestudio.com",
        "last_login": 0,
        "nickname": "waffl-e",
        "picture": "https://upload.wikimedia.org/wikipedia/commons/thumb/5/5b/Waffles_with_Strawberries.jpg/1280px-Waffles_with_Strawberries.jpg",
        "reputation": 0
      });
    useEffect(()=> {
        //const userData = getUserMe()
        //setUser(()=>userData)

    })

    return (
        <>
        <h1>My page</h1>
        <div className="activity-header">
        <div>
        <button onClick={()=>{history.push('/users/me/profile')}}>Profile</button>
        <button onClick={()=>{history.push('/users/me/activity')}}>Activity</button>
        <button onClick={()=>{history.push('/users/edit')}}>Edit</button>
        </div>
        <div>
        {user.nickname}
        <img width="50px" src={user.picture} alt="user img"/>
        </div>
        <hr/>
        </div>
        <Switch>
        <Route path={`${match.path}/profile`} component={Profile}/>
        <Route path={`${match.path}/activity`} component={Activity}/>
        {/*default*/} 
        </Switch>
        </>
    )
}
export default Me;