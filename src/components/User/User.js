import React, {useState, useEffect} from 'react';
import {getUser} from '../../Api/axios';
import {useHistory,useParams} from 'react-router-dom';
import {
    Switch,
    Route,
    useRouteMatch
  } from "react-router-dom";
import Activity from './Activity';
import Profile from './Profile';
import EditProfile from './EditProfile';
import {useSelector} from 'react-redux'
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
  function a11yProps(index) {
    return {
      id: `simple-tab-${index}`,
      'aria-controls': `simple-tabpanel-${index}`,
    };
  }
  
  const useStyles = makeStyles((theme) => ({
    root: {
      flexGrow: 1,
      backgroundColor: theme.palette.background.paper,
      
    },
  }));
  
function UserTabs({isMe, userId}) {
    let history = useHistory();
    const classes = useStyles();
    const [value, setValue] = React.useState(0);
  
    const handleChange = (event, newValue) => {
        let tab;
        switch(newValue){
            case 0: tab = 'profile';break;
            case 1: tab = 'activity';break;
            case 2: tab = 'edit';break;
        }
        
        history.push(`/users/${userId}/${tab}`)
        setValue(newValue);
    };
  
    return (
      <div className={classes.root}>
        <AppBar style={{boxShadow: 'none'}}position="static" color='default'>
          <Tabs value={value} onChange={handleChange} indicatorColor="primary" textColor="primary" aria-label="user-tabs">
            <Tab label="Profile" {...a11yProps(0)} />
            <Tab label="Activity" {...a11yProps(1)} />
            {isMe?<Tab label="Edit Profile" {...a11yProps(2)} />:<></>}
          </Tabs>
        </AppBar>
      </div>
    );
  }
//Me랑 통합하기
const User = () => {
    let match = useRouteMatch();
    let {id} = useParams();
    const [loading, setLoading] = useState(true)
    const [user, setUser] = useState(undefined);
    const isLoggedin = useSelector(state => state.isLoggedReducer.loggedin)
    const me = useSelector(state => state?.userInfoReducer?.user)

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
        <div style={{padding:'2rem', margin: 'auto', width:'1190px', maxWidth:'100%'}}>
        <UserTabs isMe={isLoggedin && user.id === me.id} userId={user.id}/>
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
        {isLoggedin && user.id === me.id?
            <EditProfile user={user}/>:
            <Activity user={user}/>}
        </Route>
        {/*default*/} 
        </Switch>
        </div>
    )
}
export default User;