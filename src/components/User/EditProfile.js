import React, {useState, useEffect} from 'react';
import {getUserMe, editUserMe} from '../../axios';
import {useHistory} from 'react-router-dom';
//PUT /user/me
const EditProfile = () => {
    let history = useHistory();
    //default value -> user info
    const [picture, setPicture] = useState('');
    const [email, setEmail] = useState('');
    const [nickname, setNickname] = useState('');
    const [password, setPassword] = useState('');
    const [title, setTitle] = useState('');
    const [aboutMe, setAboutMe] = useState('');

    const [user, setUser] = useState(undefined);
    useEffect(()=> {
        if(user !== undefined) {
            setPicture(()=>user.picture)
            setEmail(()=>user.email)
            setNickname(()=>user.nickname)
            setTitle(()=>user.title)
            setAboutMe(()=>user.intro)
            return;
        };
        getUserMe()
              .then(setUser)
              .catch(console.log)
    },[user]);

    const saveChange = (e) => {
        e.preventDefault()
        console.log('change')
<<<<<<< Updated upstream
        const user = {"picture":picture, "nickname": nickname, "password": password};
        //editUserMe(user);
=======
        let user = {picture, nickname, email, password, title, intro};
        for(let key in user) {
            if(!user[key]) delete user[key]
        }
        //remove later
        delete user.email
        console.log(user)
        editUserMe(user)
            .then(response => alert("Change saved."))
            .catch(e=>console.log(e))    
        ;
>>>>>>> Stashed changes

    }
    return (
    <>
    <h1>Edit your profile</h1>
    <hr/>
    <form onSubmit={e=>saveChange(e)} >
        <div><img width="100px" src={picture} alt="user"/><button>Change picture</button></div>
        <div>
<<<<<<< Updated upstream
        <div><label>Nickname</label><input name="Nickname" type="text" value={nickname} maxLength="30" onChange={e => setNickname(e.target.value)}/></div>
        <div><label>Email</label><input name="Location" type="email" value={email} maxLength="100" placeholder="이메일을 입력하세요." onChange={e => setEmail(e.target.value)}/></div>
        <div><label>Password</label><input name="Password" type="password" value={password} pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}" maxLength="30" onChange={e => setPassword(e.target.value)} required/></div>
=======
        <div><label>Nickname</label><input name="nickname" type="text" value={nickname} maxLength="30" onChange={e => setNickname(e.target.value)}/></div>
        <div><label>Email</label><input name="location" type="email" value={email} maxLength="100" placeholder="이메일을 입력하세요." onChange={e => setEmail(e.target.value)}/></div>
        <div><label>Password</label><input name="password" type="password" value={password} pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}" maxLength="30" onChange={e => setPassword(e.target.value)}/></div>
>>>>>>> Stashed changes
        <p>Password must be 8~30 characters containing at least one number and one uppercase and lowercase letter.</p>
        <div><label>Profile picture URL</label><input name="picture" type="text" value={picture} maxLength="1000" placeholder="이미지 주소를 입력하세요." onChange={e => setPicture(e.target.value)}/></div>
        </div>
        <div>
        <div><label>Title</label><input name="Title" type="text" value={title} maxLength="100" onChange={e => setTitle(e.target.value)}/></div>
        </div>
        <button>Save</button><button type="button" onClick={()=>history.push("/users/me/activity")}>Cancel</button>
    </form>
    
    </>
    )
}
export default EditProfile;