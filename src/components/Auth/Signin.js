import React, {useState} from 'react'
import {useAuth} from '../../context/auth'

import {useHistory, Redirect} from 'react-router-dom'

import GitHubLogin from 'react-github-login';
import axios from 'axios'
import {login} from '../../axios'
import * as config from '../../config'
import {Login, setUserInfo} from '../../modules/AuthRedux'
import {useSelector, useDispatch} from 'react-redux'
import styles from './Signin.module.scss'
import profileimage from '../../profile_image.png'
import { withStyles } from '@material-ui/core';

export const Signin = () => {
    const isLoggedin = useSelector(state => state.isLoggedReducer.isloggedin)
    const dispatch = useDispatch();
    const history = useHistory();
    const token_instance = axios.create({
        baseURL: 'https://github.com/',
        headers: { 'Accept': 'application/json' },
      });

    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    const [warn, setWarn] = useState("")
    const usernameOnChange = (username) => {
        setWarn("")
        setUsername(()=>username)
    }

    const passwordOnChange = (password) => {
        setWarn("")
        setPassword(password)
    }

    const signin = async (e) => {
        e.preventDefault()
        login(username, password)
            .then(user => {
                console.log(user)
                dispatch(setUserInfo(user))
                dispatch(Login(user.token))
                history.go(-1)

                })
            .catch(e => {
                console.log(e);
                setWarn("Authentication failed")
            })
    }
    
    const onSuccess = async({code}) => {
        await token_instance.post("https://github.com/login/oauth/access_token/", {params:{
            client_username: config.GITHUB_CLIENT_USERNAME,
            client_secret: config.GITHUB_CLIENT_SECRET,
            code: code,
            redirect_uri: "http://wafflow.com"
        }})
        .then(async res => {
            const token = res.access_token.substring(0,40)
            //redux에 토큰 저장
            console.log("github token acquired");
            await axios.put('https://www.wafflow.com/api/user/login', {params:{'github_token' : token}})
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
            <Redirect to='/'/>

        )
    }
    return (
        <div className={styles.box}> 
            <GitHubLogin clientId="1bc89bcdb1f71159016b"
            onSuccess={onSuccess}
            onFailure={onFailure}
            redirectUri="http://wafflow.com"
            // buttonText={
            //     <div className={styles.profile_box}>
            //         <div className={styles.image_box}>
            //             <img className={styles.image} src={profileimage}></img>
            //         </div>
            //         <div className={styles.text}>
            //             Login with Github
            //         </div>
            //     </div>
            
            // }
            />
            

            <div className={styles.board}>
                <label>Username</label><input required type="text" className="id-input"  value={username} onChange={(e)=>usernameOnChange(e.target.value)}/>
                <label>Password</label><input required type="password" className="password-input" value={password} onChange={(e)=>passwordOnChange(e.target.value)}/> 
                <button className="login-button">Login</button>
                <div className="warn" >{warn}</div>
            </div>
        </div>
       
    )
}

export default Signin;
