import {useState, Fragment, useHistory} from 'react'
import GitHubLogin from 'react-github-login';
import axios from 'axios'
import * as config from '../../config'

const token_instance = axios.create({
    baseURL: 'https://github.com/',
    headers: { 'Accept': 'application/json' },
  });

export const Signin = () => {
    const [username, setUsername] = useState("")
    const [pswd, setPswd] = useState("")
    const [warn, setWarn] = useState("")

    const usernameOnChange = (usrname) => {
        setWarn("")
        setUsername(usrname)
    }

    const pswdOnChange = (pswd) => {
        setWarn("")
        setUsername(pswd)
    }

    const loginwthUsername = async () => {
        const username_in = username
        const pswd_in = pswd
        await axios.put('https://api.cakes.com/user/login', {params:{'username': username_in, 'password' : pswd_in}})
                .then(res => {
                    //res 는 user info이므로 redux에 저장하기
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
                    //res 는 user info이므로 redux에 저장하기
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

    return (
        <Fragment> 
            <GitHubLogin clientusername="1bc89bcdb1f71159016b"
            onSuccess={onSuccess}
            onFailure={onFailure}
            redirectUri="https://www.wafflow.com"
            buttonText="Login with Github"/>

            <div className="login-box">
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
