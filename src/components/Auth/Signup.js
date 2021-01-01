import React, {useState} from 'react'
import {useHistory} from 'react-router-dom'
import {useAuth} from '../../context/auth'
import GitHubLogin from 'react-github-login';
import axios from 'axios'
import {login, logout, postUser} from '../../axios'
import * as config from '../../config'


const Signup = () => {
    const history = useHistory();
    const token_instance = axios.create({
        baseURL: 'https://github.com/',
        headers: { 'Accept': 'application/json' },
      });
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    const [email, setEmail] = useState("")
    const [nickname, setNickname] = useState("")
    const [warn, setWarn] = useState("")
    const {setAuthTokens} = useAuth()
    const onChangeUsername = (username) => {
        setWarn("")
        setUsername(()=>username)
    }
    const onChangePassword = (password) => {
        setWarn("")
        setPassword(password)
    }
    const onChangeEmail = (email) => {
        setWarn("")
        setEmail(email)
    }
    const onChangeNickname = (nickname) => {
        setWarn("")
        setNickname(nickname)
    }
    const signup = async () => {
        postUser({username, password, email, nickname})
            .then(response => {
                //res 는 user info이므로 redux에 저장하기
                const token = `Token ${response.token}`
                const logged_in = true
                setAuthTokens({token, logged_in})
                history.push('/') //go to main
            })
            .catch(error => {
                console.log(error);
                setWarn("Authentication failed")
            })
    }

    return (
        <> 

            <div style={{display:'flex', flexDirection:'column'}} className="login-box">
                <label>Username</label><input type="text" className="id-input"  value={username} onChange={(e)=>onChangeUsername(e.target.value)}/>
                <label>Password</label><input type="password" className="password-input" value={password} onChange={(e)=>onChangePassword(e.target.value)}/> 
                <label>Nickname</label><input type="text" className="nickname-input" value={nickname} onChange={(e)=>onChangeNickname(e.target.value)}/> 
                <label>Email</label><input type="text" className="email-input"  value={email} onChange={(e)=>onChangeEmail(e.target.value)}/>
                <button className="signup-btn" onClick={()=>signup()}>Sign Up</button>
                <div className="warn">{warn}</div>
            </div>
        </>
       
    )
}

export default Signup;