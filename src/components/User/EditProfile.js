import React, {useState} from 'react';
import {editUserMe} from '../../axios';
import {useHistory} from 'react-router-dom';
//PUT /user/me
const EditProfile = () => {
    let history = useHistory();
    //default value -> user info
    const [picture, setPicture] = useState('https://upload.wikimedia.org/wikipedia/commons/thumb/5/5b/Waffles_with_Strawberries.jpg/1280px-Waffles_with_Strawberries.jpg');
    const [email, setEmail] = useState('waffle@wafflestudio.com');
    const [nickname, setNickname] = useState('nickname');
    const [password, setPassword] = useState('');
    const saveChange = () => {
        console.log('change')
        const user = {"picture":picture, "nickname": nickname, "password": password};
        //editUserMe(user);

    }
    return (
    <>
    <h1>Edit your profile</h1>
    <hr/>
    <form>
        <div><img width="100px" src={picture} alt="user"/><button>Change picture</button></div>
        <div>
        <div><label>Nickname</label><input name="Nickname" type="text" value={nickname} maxLength="30" onChange={e => setNickname(e.target.value)}/></div>
        <div><label>Email</label><input name="Location" type="email" value={email} maxLength="100" placeholder="이메일을 입력하세요." onChange={e => setEmail(e.target.value)}/></div>
        <div><label>Password</label><input name="Password" type="password" value={password} pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}" maxLength="30" onChange={e => setPassword(e.target.value)} required/></div>
        <p>Password must be 8~30 characters containing at least one number and one uppercase and lowercase letter.</p>
        <div><label>Profile picture URL</label><input name="picture" type="text" value={picture} maxLength="1000" placeholder="이미지 주소를 입력하세요." onChange={e => setPicture(e.target.value)}/></div>
        </div>
    </form>
    <button onClick={()=>{saveChange()}}>Save Profile</button><button onClick={()=>history.push("/users/me/activity")}>Cancel</button>
    </>
    )
}
export default EditProfile;