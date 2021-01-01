import React, {useState, useEffect} from 'react';
import {getUserMe, editUserMe} from '../../axios';
import {useHistory} from 'react-router-dom';
import axios from 'axios'

//PUT /user/me

const EditProfile = () => {
    console.log("token");
    console.log(localStorage.getItem("token"));
    var token = "Token "+ localStorage.getItem("token") 
    axios.defaults.headers.common['Authorization'] = token
    let history = useHistory();
    //default value -> user info
    const [picture, setPicture] = useState('');
    const [email, setEmail] = useState('');
    const [nickname, setNickname] = useState('');
    const [password, setPassword] = useState('');
    const [title, setTitle] = useState('');
    const [intro, setIntro] = useState('');

    const [user, setUser] = useState(undefined);
    useEffect(()=> {
        if(user !== undefined) {
            setPicture(()=>user.picture)
            setEmail(()=>user.email)
            setNickname(()=>user.nickname)
            setTitle(()=>user.title)
            setIntro(()=>user.intro)
            return;
        };
        getUserMe()
              .then(setUser)
              .catch(console.log)
    },[user]);

    const saveChange = () => {
        console.log('change')
        let user = {picture, nickname, email, password, title, intro};
        if(!password) delete user.password
        editUserMe(user);

    }
    return (
    <>
    <h1>Edit your profile</h1>
    <hr/>
    <form>
        <div><img width="100px" src={picture} alt="user"/><button>Change picture</button></div>
        <div>
        <div><label>Nickname</label><input name="nickname" type="text" value={nickname} maxLength="30" onChange={e => setNickname(e.target.value)}/></div>
        <div><label>Email</label><input name="location" type="email" value={email} maxLength="100" placeholder="이메일을 입력하세요." onChange={e => setEmail(e.target.value)}/></div>
        <div><label>Password</label><input name="password" type="password" value={password} pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}" maxLength="30" onChange={e => setPassword(e.target.value)} required/></div>
        <p>Password must be 8~30 characters containing at least one number and one uppercase and lowercase letter.</p>
        <div><label>Profile picture URL</label><input name="picture" type="text" value={picture} maxLength="1000" placeholder="이미지 주소를 입력하세요." onChange={e => setPicture(e.target.value)}/></div>
        </div>
        <div>
        <div><label>Title</label><input name="title" type="text" value={title} maxLength="100" onChange={e => setTitle(e.target.value)}/></div>
        <div><label>About Me</label><br/><textarea name="aboutMe" rows='10' cols='50' value={intro} onChange={e => setIntro(e.target.value)}/></div>
        </div>
    </form>
    <button onClick={()=>{saveChange()}}>Save Profile</button><button onClick={()=>history.push("/users/me/activity")}>Cancel</button>
    </>
    )
}
export default EditProfile;