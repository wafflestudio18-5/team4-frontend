import React, {useState, useEffect} from 'react';
import {getUserMe, getUser} from '../../axios';
import {useHistory} from 'react-router-dom';
import axios from 'axios';
import {
    BrowserRouter as Router,
    Switch,
    Route,
    useParams,
    useRouteMatch
  } from "react-router-dom";
import Activity from './Activity';
import Profile from './Profile';
import EditProfile from './EditProfile';
//user는 나중에 context로 바꾸기
const Me = () => {
    let history = useHistory();
    let {tab} = useParams();
    let match = useRouteMatch();
    const [loading, setLoading] = useState(true)
    const [user, setUser] = useState(undefined);
    useEffect(()=> {
        if(user !== undefined) return;
        getUserMe('04cbda9c006d6a987f08d2b87faa80b9982c37cf')
            .then((user) => {
                setUser(()=>user)
        })
    },[user]);
    return (
        <>
        <h1>My page</h1>
        <div className="activity-header">
        <div>
        <button onClick={()=>{history.push('/users/me/profile')}}>Profile</button>
        <button onClick={()=>{history.push('/users/me/activity')}}>Activity</button>
        <button onClick={()=>{history.push('/users/me/edit')}}>Edit</button>
        </div>
        <hr/>
        </div>
        <Switch>
        <Route exact path={match.path}>
            <Activity user={user}/>
        </Route>
        <Route exact path={`${match.path}/profile`}>
            <Profile user={user}/>
        </Route>
        <Route path={`${match.path}/activity`}>
            <Activity user={user}/>
        </Route>
        <Route path={`${match.path}/edit`}>
            <EditProfile user={user}/>
        </Route>
        {/*default*/} 
        </Switch>
        </>
    )
}
export default Me;