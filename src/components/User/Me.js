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
  
function UserTabs() {
    let history = useHistory();
    const classes = useStyles();
    const [value, setValue] = React.useState(1);
  
    const handleChange = (event, newValue) => {
        let tab;
        switch(newValue){
            case 0: tab = 'profile';break;
            case 1: tab = 'activity';break;
            case 2: tab = 'edit';break;
        }
        history.push(`/users/me/${tab}`)
        setValue(newValue);
    };
  
    return (
      <div className={classes.root}>
        <AppBar style={{boxShadow: 'none'}}position="static" color='default'>
          <Tabs value={value} onChange={handleChange} indicatorColor="primary" textColor="primary" aria-label="user-tabs">
            <Tab label="Profile" {...a11yProps(0)} />
            <Tab label="Activity" {...a11yProps(1)} />
            <Tab label="Edit Profile" {...a11yProps(2)} />
          </Tabs>
        </AppBar>
      </div>
    );
  }
const Me = () => {
    let history = useHistory();
    let match = useRouteMatch();
    const isLoggedin = useSelector(state => state.isLoggedReducer.loggedin)
    const user = useSelector(state => state?.userInfoReducer?.user)

    return (
        !isLoggedin? <>{history.push('/signin')}</>:
        <div style={{padding:'2rem', margin: 'auto', width:'1190px', maxWidth:'100%'}}>
        <UserTabs/>
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
        </div>
    )
}
export default Me;