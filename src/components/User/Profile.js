import React, {useState, useEffect} from 'react';
import defaultPicture from '../../profile_image.png'
import {getAnswersOfUser, getQuestionsOfUser, getTagsOfUser} from '../../axios'
import {useHistory} from 'react-router-dom'
import { Button, ButtonGroup } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
import Avatar from '@material-ui/core/Avatar';
import Chip from '@material-ui/core/Chip';

const useCardStyles = makeStyles({
  root: {
    minWidth: 345,
    height: 'fit-content',
    marginRight:'3rem'
  },
  media: {
    height: '150px',
    width: '150px'
  },
});

function UserCard({user}) {
  const classes = useCardStyles();
    console.log(defaultPicture)
  return (
    <Card className={classes.root}>
      <CardActionArea style={{display:'flex', flexFlow: 'row nowrap', justifyContent:'flex-start', alignContent:'flex-start'}}>
        <CardMedia
          className={classes.media}
          image={user.picture? user.picture:defaultPicture}
          title={user.nickname}
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="h2">
            {user.nickname}
          </Typography>
          <hr></hr>
          <Typography gutterBottom variant="h6" component="h3">
            {user.title}
          </Typography>
          <Typography variant="body2" color="textSecondary" component="p">
            {user.intro}
          </Typography>
        </CardContent>
      </CardActionArea>
      <CardActions>
      <Chip label="reputation" variant="outlined" color="primary" avatar={<Avatar variant="rounded" style={{width:'fit-content', borderRadius:"1rem", padding:'0 0.5rem'}}>{user.reputation}</Avatar>} />
      <Chip label="questions" variant="outlined" color="primary" avatar={<Avatar variant="rounded" style={{width:'fit-content', borderRadius:"1rem", padding:'0 0.5rem'}}>{user.question_count}</Avatar>} />
      <Chip label="answers" variant="outlined" color="primary" avatar={<Avatar variant="rounded" style={{width:'fit-content', borderRadius:"1rem", padding:'0 0.5rem'}}>{user.answer_count}</Avatar>} />
      </CardActions>
    </Card>
  );
}

const useListStyles = makeStyles((theme) => ({
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
  
  function ItemList({activity, user, items}) {
    const history = useHistory()
    const classes = useListStyles();
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
                          <ListItem key={item.id} onClick={()=>history.push(`/search?q=user:${user.id}+[${item.name}]`)}>
                          <Button style={{height:'1.5rem', fontSize:'1rem', color:'#5eba7d', borderColor:'#5eba7d'}} disabled variant="outlined" size='small' component='label'>{item.score}</Button>
                              <ListItemText style={{paddingLeft:'1rem'}} primary={item.name}/>
                              <ListItemText style={{paddingLeft:'1rem', textAlign:'right'}} primary={`${item.posts} posts`}/>
                          </ListItem>
                      ):
                      items.map(item => 
                          <ListItem key={item.id} onClick={()=>history.push(`/question/${item.id}`)}>
                              <Button style={{height:'1.5rem', fontSize:'1rem', color:'#5eba7d', borderColor:'#5eba7d'}} disabled variant="outlined" size='small' component='label'>{item.vote}</Button>
                              <ListItemText style={{paddingLeft:'1rem'}} primary={item.title}/>
                              <ListItemText style={{paddingLeft:'1rem', textAlign:'right'}} primary={item.created_at.substring(0,10)}/>
                              
                          </ListItem>
                      )
                  }
              </List>
            </div>
      </div>
    );
  }
const Profile = ({user}) => {
    const history = useHistory()
    const [topPosts, setTopPosts] = useState(undefined)
    const [topTags, setTopTags] = useState(undefined)
    const [sortedBy, setSortedBy] = useState('votes')
    const [category, setCategory] = useState('Questions')
    useEffect(()=> {
        getTopAnswers('votes')
        getTopTags()
    }, [user]);
    useEffect(()=>{
        switch(category) {
            case 'Questions':
                getTopQuestions(sortedBy)
                break;
            case 'Answers':
                getTopAnswers(sortedBy)
        }
    },[sortedBy, category])
    const getTopAnswers = (sortedBy) => {
        getAnswersOfUser(user.id, sortedBy)
            .then((answers)=>{
                setTopPosts(answers)
            })
            .catch(console.log)
    }
    const getTopQuestions = (sortedBy) => {
        getQuestionsOfUser(user.id, sortedBy)
            .then((questions)=>{
                setTopPosts(questions)
            })
            .catch(console.log)
    }
    const getTopTags = () => {
        getTagsOfUser(user.id, 'votes')
            .then(setTopTags)
            .catch(console.log)
    }
    return (
        (user && topPosts && topTags)?
        <div style={{display:'flex',marginTop:'1rem', flexFlow:'row wrap'}}>
        <UserCard user={user}/>
        <div style={{display:'flex', flexDirection:'column'}}>

        <div className="user-top-tags">
        <div style={{padding:'1rem 0 0.5rem 0.5rem', display:'flex', flexFlow:'row wrap', alignItems:'center', alignContent:'space-between', justifyContent:'space-between'}}>
            <Button component='label' style={{height:'1rem', marginBottom:'0.5rem', textTransform:'initial'}} size='large' color="primary">{`Top Tags`}</Button>
        </div>
        <ItemList activity='Tags' user={user} items={topTags}/>
        </div>

        <div className="user-top-posts">
        <div style={{padding:'1rem 0 0.5rem 0.5rem', display:'flex', flexFlow:'row wrap', alignItems:'center', alignContent:'space-between', justifyContent:'space-between'}}>
            <Button style={{height:'1rem', marginBottom:'0.5rem', textTransform:'initial'}} onClick={()=>{history.push(`/search?q=user:${user.id}`)}} size='large' color="primary">{`Top Posts`}</Button>
            <div>
            <ButtonGroup  style={{height:'1.5rem', margin:'0 0.5rem 0.5rem 0'}} size="small" aria-label="small outlined button group">
                <Button  style={{textTransform:'lowercase'}}  onClick={(e)=>{setCategory('Questions')}}>Questions</Button>
                <Button  style={{textTransform:'lowercase'}}  onClick={(e)=>{setCategory('Answers')}}>Answers</Button>
            </ButtonGroup>
            <ButtonGroup  style={{height:'1.5rem', marginBottom:'0.5rem'}} size="small" aria-label="small outlined button group">
                <Button  style={{textTransform:'lowercase'}}  onClick={(e)=>{setSortedBy(e.target.innerHTML.toLowerCase())}}>Votes</Button>
                <Button  style={{textTransform:'lowercase'}}  onClick={(e)=>{setSortedBy(e.target.innerHTML.toLowerCase())}}>Newest</Button>
            </ButtonGroup>
            </div>
        </div>
        <ItemList activity={category} user={user} items={topPosts}/>
        </div>

        </div>
        </div>
        :<></>
    )
}
export default Profile;