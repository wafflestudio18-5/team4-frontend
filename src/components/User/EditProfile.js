import React, {useState, useEffect} from 'react';
import {getUserMe, editUserMe} from '../../axios';
import {useHistory} from 'react-router-dom';
import axios from 'axios'
import {useSelector, useDispatch} from 'react-redux'
import {setUserInfo} from '../../modules/AuthRedux'

//PUT /user/me

const EditProfile = () => {
    const isLoggedin = useSelector(state => state.isLoggedReducer.loggedin)
    const token = useSelector(state => state.isLoggedReducer.token)
    const user = useSelector(state => state?.userInfoReducer?.payload?.payload)
    const dispatch = useDispatch();
    axios.defaults.headers.common['Authorization'] = `Token ${token}`
    let history = useHistory();
    //default value -> user info

    const [email, setEmail] = useState('');
    const [nickname, setNickname] = useState('');
    const [password, setPassword] = useState('');
    const [title, setTitle] = useState('');
    const [intro, setIntro] = useState('');
    const [picture, setPicture] = useState(null);
    console.log(picture)
    useEffect(()=> {
            //setPicture(()=>user.picture)
            setEmail(()=>user.email)
            setNickname(()=>user.nickname)
            setTitle(()=>user.title)
            setIntro(()=>user.intro)
    },[user]);

    const saveChange = (e) => {
        e.preventDefault()
        console.log('change')
        let formData = new FormData()
        let user = {picture, nickname, email, password, title, intro};
        for(let key in user) {
            if(key === 'picture') formData.append(key, user[key], user[key].name)
            if(user[key]) formData.append(key, user[key])
        }
        console.log(formData)
        //remove later
        formData.delete('email')
        editUserMe(formData)
            .then(response => {
                console.log(response)
                dispatch(setUserInfo({payload: response}))
                alert("Change saved.")})
            .catch(e=>console.log(e))    
        ;

    }
    return (
    <>
    <h1>Edit your profile</h1>
    <hr/>
    <form onSubmit={e=>saveChange(e)} >
        <div><img width="100px" src={user.picture} alt="user"/><div><label>Profile picture</label><input name="picture" type="file" accept="image/png, image/jpeg" onChange={e => setPicture(e.target.files[0])}/></div></div>
        <div>
        <div><label>Nickname</label><input name="nickname" type="text" value={nickname} maxLength="30" onChange={e => setNickname(e.target.value)}/></div>
        <div><label>Email</label><input name="location" type="email" value={email} maxLength="100" placeholder="이메일을 입력하세요." onChange={e => setEmail(e.target.value)}/></div>
        <div><label>Password</label><input name="password" type="password" value={password} pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}" maxLength="30" onChange={e => setPassword(e.target.value)}/></div>
        <p>Password must be 8~30 characters containing at least one number and one uppercase and lowercase letter.</p> 
        </div>
        <div>
        <div><label>Title</label><input name="title" type="text" value={title} maxLength="100" onChange={e => setTitle(e.target.value)}/></div>
        <div><label>About Me</label><br/><textarea name="aboutMe" rows='10' cols='50' value={intro} onChange={e => setIntro(e.target.value)}/></div>
        </div>
        <button>Save</button><button type="button" onClick={()=>history.push("/users/me/activity")}>Cancel</button>
    </form>
    
    </>
    )
}
export default EditProfile;