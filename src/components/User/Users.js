import React, {useState, useEffect} from 'react'
import { getUsers } from '../../axios'
import {useHistory} from 'react-router-dom'
import defaultPicture from '../../profile_image.png'
import { makeStyles} from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
import Avatar from '@material-ui/core/Avatar';
import Chip from '@material-ui/core/Chip';
import Pagination from '@material-ui/lab/Pagination';
import Grid from '@material-ui/core/Grid'
const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
  },
  details: {
    display: 'flex',
    flexDirection: 'column',
  },
  content: {
    display: 'flex',
    flex: '1 0 auto',
    flexDirection: 'column',
    justifyContent: 'space-around',
  },
  cover: {
    width: 150,
    height: 150
  },
  controls: {
    display: 'flex',
    alignItems: 'center',
    alignContent: 'space-between',
    paddingLeft: theme.spacing(1),
    paddingBottom: theme.spacing(1),
  },
}));

function UserCard({user}) {
    const history = useHistory()
  const classes = useStyles();

  return (
    <Card className={classes.root} onClick={()=>history.push(`/users/${user.id}`)}>
      <CardMedia
        className={classes.cover}
        image={user.picture? user.picture:defaultPicture}
        title={user.nickname}
      />
      <div className={classes.details}>
        <CardContent className={classes.content}>
          <Typography component="h5" variant="h5">
            {user.nickname}
          </Typography>
          <Chip label="reputation" variant="outlined" color="primary" avatar={<Avatar variant="rounded" style={{width:'fit-content', borderRadius:"1rem", padding:'0 0.5rem'}}>{user.reputation}</Avatar>} />
        </CardContent>
        <div className={classes.controls}>

        </div>
      </div>
      
    </Card>
  );
}
//GET users
const Users = () => {
    const [users, setUsers] = useState([])
    const [pageCount, setPageCount] = useState(1)
    const [loading, setLoading] = useState(true)
    useEffect(()=>{
        getUsers('reputation', '')
            .then(response => {
                setUsers(response.users)
                setPageCount(Math.ceil(response.user_count/36))
                setLoading(false)
            })
            .catch(console.log)
    },[loading])
    return (
        <div style={{padding:'2rem', margin: 'auto', width:'1190px', maxWidth:'100%'}}>
        {loading? 
            <></>:
            <Grid container spacing={3}>
            {users.map(user=> (<Grid key={user.id} item xs={4}><UserCard key={user.id} user={user}/></Grid>))}
            </Grid>
        }
        <div style={{display:'flex', justifyContent:'center', padding:'0.5rem'}}>
        <Pagination count={pageCount} showFirstButton showLastButton />
        </div>
        </div>
    )
}
export default Users;