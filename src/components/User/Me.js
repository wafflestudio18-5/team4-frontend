import React from 'react';
import {useHistory} from 'react-router-dom';
import {
    Switch,
    Route,
    useRouteMatch
  } from "react-router-dom";
import {useSelector} from 'react-redux'
import Activity from './Activity';
import Profile from './Profile';
import EditProfile from './EditProfile';
//user는 나중에 context로 바꾸기
const Me = () => {
    let history = useHistory();
    let match = useRouteMatch();
    const isLoggedin = useSelector(state => state.isLoggedReducer.loggedin)
    const user = useSelector(state => state?.userInfoReducer?.user)

    return (
        !isLoggedin? <>{history.push('/signin')}</>:
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