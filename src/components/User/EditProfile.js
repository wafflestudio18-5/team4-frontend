import React, {useState, useEffect} from 'react';
import {editUserMe} from '../../axios';
import {useHistory} from 'react-router-dom';
import axios from 'axios'
import {useSelector, useDispatch} from 'react-redux'
import {setUserInfo} from '../../modules/AuthRedux'
import defaultPicture from '../../profile_image.png'
import EditProfileBox from './Components/EditProfileBox';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';
import FilledInput from '@material-ui/core/FilledInput';
import FormControl from '@material-ui/core/FormControl';
import FormHelperText from '@material-ui/core/FormHelperText';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import OutlinedInput from '@material-ui/core/OutlinedInput';
import TextField from '@material-ui/core/TextField'
//PUT /user/me

const EditProfile = () => {
    //const isLoggedin = useSelector(state => state.isLoggedReducer.loggedin)
    const token = useSelector(state => state.isLoggedReducer.token)
    const user = useSelector(state => state?.userInfoReducer?.user)
    const dispatch = useDispatch();
    axios.defaults.headers.common['Authorization'] = `Token ${token}`
    let history = useHistory();
    //default value -> user info

    const [email, setEmail] = useState('');
    const [nickname, setNickname] = useState('');
    const [password, setPassword] = useState('');
    const [isValid, setIsValid] = useState(true)
    const [title, setTitle] = useState('');
    const [intro, setIntro] = useState('');
    const [picture, setPicture] = useState(null);
    useEffect(()=> {
            //setPicture(()=>user.picture)
            setEmail(()=>user.email)
            setNickname(()=>user.nickname)
            setTitle(()=>user.title)
            setIntro(()=>user.intro)
    },[user]);
    useEffect(()=>{
        setIsValid(!password || password.match(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,30}$/))
    })
    const saveChange = (e) => {
        e.preventDefault()
        console.log('change')
        let formData = new FormData()
        let user = {picture, nickname, email, password, title, intro};
        for(let key in user) {
            if(!user[key]) continue;
            if(key === 'picture') formData.append(key, user[key], user[key].name)
            else formData.append(key, user[key])
        }
        editUserMe(formData)
            .then(user => {
                dispatch(setUserInfo(user))
                alert("Change saved.")})
            .catch(e=>console.log(e))    
        ;

    }
    return (
    <>
    <form style={{padding:'2rem', margin: 'auto', width:'1190px', maxWidth:'100%'}}id='edit-profile-form' onSubmit={e=>saveChange(e)} >
        <div style={{display:'flex', alignItems:'center', marginBottom:'2rem'}}>
            <div style={{minWidth:'14rem', width:'30%', paddingRight:'2rem', display:'flex', flexDirection:'column', alignItems:'center'}}>
                <img width='100%' style={{objectFit:'cover'}} src={user.picture? user.picture: defaultPicture} alt="user"/>
                <Button  style={{width:'100%', textTransform:'capitalize'}} variant="contained" component="label">
                    Change Picture
                <input hidden name="picture" type="file" accept="image/png, image/jpeg" onChange={e => setPicture(e.target.files[0])}/>
                </Button>
            </div>
            <div style={{width:'70%', display:'flex', flexDirection:'column'}}>
                <FormControl>
                    <InputLabel htmlFor="nickname">Nickname</InputLabel>
                    <Input id="nickname" style={{width:'100%', maxWidth:'25rem',marginBottom:'1rem'}} value={nickname} onChange={e => setNickname(e.target.value)} />
                </FormControl>
                <FormControl >
                    <InputLabel htmlFor="email">Email</InputLabel>
                    <Input id="email" style={{width:'100%', maxWidth:'25rem',marginBottom:'1rem'}} value={email} onChange={e => setEmail(e.target.value)} />
                </FormControl>
                <FormControl error={password && !password.match(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,30}$/)}>
                    <InputLabel htmlFor="password">Password</InputLabel>
                    <Input
                    id="password"
                    type='password'
                    style={{width:'100%', maxWidth:'25rem',marginBottom:'1rem'}}
                    onChange={e => setPassword(e.target.value)}
                    aria-describedby="component-helper-text"
                    />
                    <FormHelperText style={{width:'25rem'}} id="component-helper-text">Password must be <b>8~30</b> characters containing at least one <b>number</b>, one <b>uppercase</b> letter and one <b>lowercase</b> letter.</FormHelperText>
                </FormControl>
            </div>
        </div>
        <div style={{width:'100%', marginBottom:'2rem', display:'flex', flexDirection:'column'}}>
            <FormControl>
                <InputLabel htmlFor="title">Title</InputLabel>
                <Input style={{marginBottom:'1rem', maxLength:'150'}} id="title" value={title} onChange={e => setTitle(e.target.value)} />
            </FormControl>
            <TextField
            id="outlined-multiline-static"
            label="About Me"
            multiline
            rows={10}
            value={intro}
            onChange={e => setIntro(e.target.value)}
            variant="outlined"
            />
        </div>
        <div>
        <Button style={{marginRight:'1rem'}} disabled={!isValid} type='submit' variant="contained" color="primary">
        SAVE
        </Button>
        <Button variant="contained" onClick={()=>history.push("/users/me/activity")}>Cancel</Button>
        </div>
    </form>
    </>
    )
}
export default EditProfile;