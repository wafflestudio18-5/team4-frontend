import React, {useState, useEffect} from 'react';
import {getAnswersOfUser, getQuestionsOfUser, getTagsOfUser, getBookmarksOfUser} from '../../axios'
import { Button, ButtonGroup } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListItemText from '@material-ui/core/ListItemText';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    backgroundColor:'#ffffff',
    borderRadius:'0.5rem'
    //maxWidth: 752,
  },
  demo: {
    //backgroundColor: theme.palette.background.paper,
  },
  title: {
    margin: theme.spacing(4, 0, 2),
  },
}));

function ItemList({activity, items}) {
  const classes = useStyles();
  return (
    <div className={classes.root}>
          <div className={classes.demo}>
            <List style={{display:'flex', flexFlow:'row wrap'}} dense={true}>
                {!items.length?  
                    <ListItem key={0}>
                        <ListItemText style={{paddingLeft:'1rem'}} primary={`There is no ${activity.slice(0,-1).toLowerCase()}.`}/>
                    </ListItem>:
                activity==='Tags'?
                    items.map(item => 
                        <ListItem key={item.id}>
                        <Button style={{height:'1.5rem', fontSize:'1rem', color:'#5eba7d', borderColor:'#5eba7d'}} disabled variant="outlined" size='small' component='label'>{item.score}</Button>
                            <ListItemText style={{paddingLeft:'1rem'}} primary={item.name}/>
                            <ListItemText style={{paddingLeft:'1rem', textAlign:'right'}} primary={`${item.posts} posts`}/>
                        </ListItem>
                    ):
                    items.map(item => 
                        <ListItem key={item.id}>
                            <Button style={{height:'1.5rem', fontSize:'1rem', color:'#5eba7d', borderColor:'#5eba7d'}} disabled variant="outlined" size='small' component='label'>{item.vote}</Button>
                            <ListItemText style={{paddingLeft:'1rem'}} primary={item.title}/>
                        </ListItem>
                    )
                }
            </List>
          </div>
    </div>
  );
}

const activities = ["Answers", "Questions", "Tags","Bookmarks"];
const data = activities.map((activity) => {
    return {name: activity, data: {}};
})

const Section = ({activity, user, setCategory}) => {
    let key = activity.substring(0,activity.length-1).toLowerCase()+'_count'
    const[list, setList] = useState([]);
    const[sortedBy,setSortedBy] = useState('votes')
    useEffect(()=>{
        switch(activity) {
            case 'Answers':
                getAnswersOfUser(user.id,sortedBy)
                    .then(response => setList(()=>response));
                break;
            case 'Questions':
                getQuestionsOfUser(user.id,sortedBy)
                    .then(response => setList(()=>response));
                break;
                case 'Tags':
                getTagsOfUser(user.id, sortedBy)
                    .then(response => setList(()=>response))
                break;//to be implemented
            case 'Bookmarks'://server not implemented
                getBookmarksOfUser(user.id, sortedBy)
                    .then(response => setList(()=>response));//add author, tags later
            break;
            
        }
    }, [sortedBy])


    return(
    <div style={{width:'50%', padding:'0 3rem 3rem 0'}}>
    <div style={{display:'flex', flexFlow:'row wrap', alignItems:'center', alignContent:'space-between', justifyContent:'space-between'}}>
    <Button style={{height:'1rem', marginBottom:'0.5rem', textTransform:'initial'}}size='large' color="primary" onClick={()=>setCategory(activity)}>{`${activity} (${user[key]})`}</Button>
    <ButtonGroup  style={{height:'1.5rem', marginBottom:'0.5rem'}} size="small" aria-label="small outlined button group">
    <Button  style={{textTransform:'lowercase'}}  onClick={(e)=>{setSortedBy(e.target.innerHTML.toLowerCase())}}>Votes</Button>
    {activity === 'Tags'? 
    <Button  style={{textTransform:'lowercase'}}  onClick={(e)=>{setSortedBy(e.target.innerHTML.toLowerCase())}}>Name</Button>:
    <Button  style={{textTransform:'lowercase'}}  onClick={(e)=>{setSortedBy(e.target.innerHTML.toLowerCase())}}>Activity</Button>}
    {activity === 'Tags'? 
    <></>:
    <Button  style={{textTransform:'lowercase'}}  onClick={(e)=>{setSortedBy(e.target.innerHTML.toLowerCase())}}>Newest</Button>
    }
    </ButtonGroup>
    </div>
    <div className="activity-section-content">
    <ItemList activity={activity} items={list}/>
    </div>
    </div>
    );
}

const Activity = ({user}) => {
    const [category, setCategory] = useState("Summary");
    return (
    <>
    {!user?<></>:
        <div className="activity-header">
        <ButtonGroup style={{margin:'1rem 0'}} size='small' aria-label="activity-menu">
            <Button key='summary' style={{borderWidth:'2px'}} onClick={()=>{setCategory("Summary")}}>Summary</Button>
            {activities.map(activity => 
                <Button key={activity} style={{borderWidth:'2px'}} onClick={()=>{setCategory(activity)}}>{activity}</Button>
                )
            }
        </ButtonGroup>
        <div style={{display:'flex', flexFlow:'row wrap'}}>
        {category === "Summary"? 
            data.map(({name}) => (
                <Section key={name} user={user} activity={name} setCategory={category=>setCategory(category)}/>
            ))
            :
            data.map(({name}) => {
                if(name===category) {
                    return (<Section key={name} user={user} activity={name} setCategory={category=>setCategory(category)}/>
                )}
            })
        }
        </div>
        </div>
    }
    </>
    );
}
export default Activity;