import React, {useState} from 'react'
import {useHistory, Redirect} from 'react-router-dom'

import GitHubLogin from 'react-github-login';
import axios from 'axios'
import {login} from '../../axios'
import * as config from '../../config'
import {Login, setUserInfo} from '../../modules/AuthRedux'
import {useSelector, useDispatch} from 'react-redux'

import styles from '../Questions/QuestionAsk.module.scss'
import profileimage from '../../profile_image.png'


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
        console.log(code);
        await token_instance.post("https://github.com/login/oauth/access_token/", {params:{
            client_username: config.GITHUB_CLIENT_USERNAME,
            client_secret: config.GITHUB_CLIENT_SECRET,
            code: code,
            redirect_uri: "https://wafflow.com"
        }})
        .then(async res => {
            const token = res.access_token.substring(0,40)
            //redux에 토큰 저장
            console.log("github token acquired");
            await axios.put('https://www.wafflow.com/api/user/login/', {params:{'github_token' : token}})
                .then(res => {
                    alert("Login success");
                    dispatch(setUserInfo(res))
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

        <div>
        <div className={styles.box12}> 
            <div className={styles.board_all12}>
            <div className={styles.box_top}>
                <div classNam={styles.box}>
                <div className={styles.top_sub1}>
                        <GitHubLogin clientId="1bc89bcdb1f71159016b"
                        onSuccess={() => {onSuccess()}}
                        onFailure={() => {onFailure()}}
                        redirectUri="http://wafflow.com"/>
                    </div>
                </div>
            </div>
            <div className={styles.box}>
            
            <div className={styles.board}>
                <div className={styles.top}>

                </div>
                <div className={styles.body}>
                    <div className={styles.body_sub}>
                        
    
                    <div className={styles.title_box}>
                    <div className={styles.top_sub}>Username</div>
                    <div className={styles.input_box}>
                        <input className={styles.input_title} value={username} onChange={(e)=>{usernameOnChange(e.target.value)}}/>
    
                    </div>
                </div>
                <div classNameName="qask-body-box">
                    <div className={styles.top_sub}>Password</div>
                    <input className={styles.input_title} value={password} onChange={(e)=>{passwordOnChange(e.target.value)}}/>
                </div>                 
                    </div>
    
                </div>
                <div className="qask-body-left-buttonbox">
                            <div onClick = {e => {signin(e)}} className={styles.btn} /*TODO: Review and Post are divided in the original site*/>
                                Sign in
                            </div>
                        </div>
            </div>
           
            </div>
        </div>

        </div>
</div>       
    )
}

export default Signin;
