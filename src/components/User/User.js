import React, {useState, useEffect} from 'react';
import {getUser} from '../../axios';
import {useHistory,useParams} from 'react-router-dom';
import {
    Switch,
    Route,
    useRouteMatch
  } from "react-router-dom";
import Activity from './Activity';
import Profile from './Profile';
import EditProfile from './EditProfile';
//Me랑 통합하기
const User = () => {
    let history = useHistory();
    let match = useRouteMatch();
    let {id} = useParams();
    const [loading, setLoading] = useState(true)
    const [user, setUser] = useState(undefined);
    useEffect(()=> {
        getUser(id)
            .then(user=>{
                setUser(()=>user)
                setLoading(false)
                }
            )
            .catch(console.log)
    },[loading, id]);
    return (
        loading? <></>:
        <>
        <div className="activity-header">
        <div>
        <button onClick={()=>{history.push(`/users/${id}/profile`)}}>Profile</button>
        <button onClick={()=>{history.push(`/users/${id}/activity`)}}>Activity</button>
        {/*loggedIn && User == Me일 때만 보이도록 */}
        <button onClick={()=>{history.push(`/users/${id}/edit`)}}>Edit</button>
        </div>
        <hr/>
        </div>
        <Switch>
        <Route exact path={match.path}>
            <Profile user={user}/>
        </Route>
        <Route exact path={`${match.path}/profile`}>
            <Profile user={user}/>
        </Route>
        <Route path={`${match.path}/activity`}>
            <Activity user={user}/>
        </Route>
        {/*loggedIn && User == Me일 때만 접근 허용하기 */}
        <Route path={`${match.path}/edit`}>
            <EditProfile user={user}/>
        </Route>
        {/*default*/} 
        </Switch>
        </>
    )
}
export default User;