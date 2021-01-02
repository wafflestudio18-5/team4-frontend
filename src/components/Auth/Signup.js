import React, {useState} from 'react'
import {useHistory} from 'react-router-dom'
import {useAuth} from '../../context/auth'
import GitHubLogin from 'react-github-login';
import axios from 'axios'
import {postUser} from '../../axios'
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
    const signup = async (e) => {
        e.preventDefault()
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

            <form className="signup-form" style={{display:'flex', flexDirection:'column'}}  onSubmit={e=>signup(e)}>
                <label>Username</label><input required type="text" className="id-input"  value={username} onChange={(e)=>onChangeUsername(e.target.value)}/>
                <label>Password</label><input required type="password" className="password-input" value={password} onChange={(e)=>onChangePassword(e.target.value)}/> 
                <label>Nickname</label><input required type="text" className="nickname-input" value={nickname} onChange={(e)=>onChangeNickname(e.target.value)}/> 
                <label>Email</label><input required type="text" className="email-input"  value={email} onChange={(e)=>onChangeEmail(e.target.value)}/>
                <button className="signup-btn">Sign Up</button>
                <div className="warn">{warn}</div>
            </form>
        </>
       
    )
}

export default Signup;