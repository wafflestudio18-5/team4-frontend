import {useState, Fragment} from 'react'
import GitHubLogin from 'react-github-login';
import axios from 'axios'
import * as config from '../../config'
import {Login, Logout, setUserInfo, removeUserInfo} from '../../modules/AuthRedux'
import {useSelector, useDispatch} from 'react-redux'

const token_instance = axios.create({
    baseURL: 'https://github.com/',
    headers: { 'Accept': 'application/json' },
  });

export const Join = () => {
    const isLoggedin = useSelector(state => state.isLoggedReducer.isloggedin)
    const dispatch = useDispatch();
    const [nickname, setNickname] = useState("")
    const [username, setUsername] = useState("")
    const [pswd, setPswd] = useState("")
    const [email, setEmail] = useState("")
    const [warn, setWarn] = useState("")

    const usernameOnChange = (usrname) => {
        setWarn("")
        setUsername(usrname)
    }

    const pswdOnChange = (pswd) => {
        if (pswd.length() > 16) {
            setWarn("password must be under 16")
        }
        setWarn("")
        setUsername(pswd)
    }

    const loginwthUsername = async () => {
        const username_in = username
        const pswd_in = pswd
        await axios.put('https://api.cakes.com/user/login', {username: username_in, password : pswd_in})
                .then(res => {
                    dispatch(setUserInfo({payload: res}))
                    dispatch(Login({token : res.token}))
                })
                .catch(e => {
                    console.log(e);
                    setWarn("Authentication failed")
                })
    }
    
    const onSuccess = async({code}) => {
        await token_instance.post("https://github.com/login/oauth/access_token", {params:{
            client_username: config.GITHUB_CLIENT_username,
            client_secret: config.GITHUB_CLIENT_SECRET,
            code: code,
            redirect_uri: "https://www.wafflow.com"
        }})
        .then(async res => {
            const token = res.access_token
            //redux에 토큰 저장
            console.log("github token acquired");
            await axios.put('https://api.cakes.com/user/login', {params:{'github_token' : token}})
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

    const onFailure = () => {

    }
    if(isLoggedin) {
        return (
            <Fragment>
                You are Already Logged in
            </Fragment>
        )
    }
    return (
        <Fragment> 
            <GitHubLogin clientId="1bc89bcdb1f71159016b"
            onSuccess={onSuccess}
            onFailure={onFailure}
            redirectUri="https://www.wafflow.com"
            buttonText="Login with Github"/>

            <div className="join-box">
                <div>
                    Login ith username and Password
                </div>
                <input calassName="id-input"  value={username} placeholder="input yout username" onChange={usernameOnChange}/>
                <input calassName="pswd-input" value={pswd} placeholder="inpur your Password" onChange={pswdOnChange}/> 
                <button className="login-btn" onClick={loginwthUsername}>Login</button>
                <div className="warn">{warn}</div>
            </div>
        </Fragment>
       
    )
}
