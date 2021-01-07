import React, {useState, Fragment} from 'react'
import {useHistory} from 'react-router-dom'
import {useAuth} from '../../context/auth'
import GitHubLogin from 'react-github-login';
import axios from 'axios'
import {postUser} from '../../axios'
import * as config from '../../config'
import {Login, setUserInfo, } from '../../modules/AuthRedux'
import {useSelector, useDispatch} from 'react-redux'



const Signup = () => {
    const isLoggedin = useSelector(state => state.isLoggedReducer.isloggedin)
    const dispatch = useDispatch();

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
        postUser({username: username, password: password, email: email, nickname: nickname})
            .then(res => {
                setWarn("")
                console.log(res);
                console.log("token");
                console.log(res.token);
                dispatch(setUserInfo({payload: res}))
                dispatch(Login({token : res.token}))
                console.log("Successfully Logged in ");
            })
            .catch(error => {
                console.log(error);
                setWarn(error.message)
            })
    }

    const onSuccess = async({code}) => {
        await axios.post("https://github.com/login/oauth/access_token/", {params:{
            client_username: config.GITHUB_CLIENT_USERNAME,
            client_secret: config.GITHUB_CLIENT_SECRET,
            code: code,
            redirect_uri: "https://wafflow.com"
        }})
        .then(async res => {
            const token = res.access_token.substring(0,40)
            //redux에 토큰 저장
            console.log("github token acquired");
            await axios.post('http://localhost:8000/api/user/', {'github_token' : token})
                .then(res => {

                    dispatch(setUserInfo({payload: res}))
                    dispatch(Login({token : res.token}))

                })
                .catch(e => {
                    console.log(e);
                    setWarn("Authentication failed")
                })
        })
        .catch(e => {
            console.log(e);
            alert("Failed to acquire Token from Github")
        })
    }

    const onFailure = (e) => {
        console.log(e);
    }
    if(isLoggedin) {
        return (
            <Fragment>
                You are Already Logged in
            </Fragment>
        )
    }
    return (
        <> 
            <GitHubLogin clientId="1bc89bcdb1f71159016b"
            onSuccess={onSuccess}
            onFailure={onFailure}
            redirectUri="https://wafflow.com/"
            buttonText="Login with Github"/>

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