import React, {useState, Fragment} from 'react'
import {useHistory} from 'react-router-dom'
import {useAuth} from '../../context/auth'
import GitHubLogin from 'react-github-login';
import axios from 'axios'
import {login} from '../../axios'
import * as config from '../../config'


const Signin = () => {
    const history = useHistory();
    const token_instance = axios.create({
        baseURL: 'https://github.com/',
        headers: { 'Accept': 'application/json' },
      });
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    const [warn, setWarn] = useState("")
    const {setAuthTokens} = useAuth()
    const usernameOnChange = (username) => {
        setWarn("")
        setUsername(()=>username)
    }

    const passwordOnChange = (password) => {
        setWarn("")
        setPassword(password)
    }

    const loginwthUsername = async () => {
        login(username, password)
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
    
    const onSuccess = async({code}) => {
        console.log("code");
        console.log(code);
        await token_instance.post("https://github.com/login/oauth/access_token", {params:{
            client_id: config.GITHUB_CLIENT_USERNAME,
            client_secret: config.GITHUB_CLIENT_SECRET,
            code: code,
            redirect_uri: "https://www.wafflow.com"
        }})
        .then(async res => {
            const token = res.access_token.substring(0,40)
            //redux에 토큰 저장
            console.log("github token acquired");
            await axios.put('https://api.cakes.com/user/login', {params:{'github_token' : token}})
                .then(res => {
                    localStorage.setItem("token", res.token)
                    localStorage.setItem("logged_in", "true")
                    history.push('/') //go to main
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

    return (
        <Fragment> 
            <GitHubLogin 
            clientId="1bc89bcdb1f71159016b"
            onSuccess={onSuccess}
            onFailure={onFailure}
            redirectUri="http://www.wafflow.com"
            buttonText="Login with Github"/>

            <div className="login-box">
                <label>Username</label><input type="text" className="id-input"  value={username} onChange={(e)=>usernameOnChange(e.target.value)}/>
                <label>Password</label><input type="password" className="password-input" value={password} onChange={(e)=>passwordOnChange(e.target.value)}/> 
                <button className="login-btn" onClick={loginwthUsername}>Login</button>
                <div className="warn">{warn}</div>
            </div>
        </Fragment>
       
    )
}

export default Signin;

