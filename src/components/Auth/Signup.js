import React, {useState, Fragment} from 'react'
import {useHistory} from 'react-router-dom'
import {useAuth} from '../../context/auth'
import GitHubLogin from 'react-github-login';
import axios from 'axios'
import {postUser} from '../../Api/axios'
import * as config from '../../config'
import {Login, setUserInfo, } from '../../modules/AuthRedux'
import {useSelector, useDispatch} from 'react-redux'
import styles from '../Questions/QuestionAsk.module.scss'


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
                dispatch(setUserInfo(res))
                dispatch(Login(res.token))
                console.log("Successfully Logged in ");
                history.push('/')
            })
            .catch(error => {
                console.log(error);
                setWarn(error.message)
            })
    }


    if(isLoggedin) {
        return (
            <Fragment>
                You are Already Logged in
            </Fragment>
        )
    }
    return (
        <div>
        <div className={styles.box12}> 
            <div className={styles.eboard_all12}>
            <div className={styles.box_top}>
                <div className={styles.box13}>
                    SignUp
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
                        <input className={styles.input_title} value={username} onChange={e=>{onChangeUsername(e.target.value)}}/>
    
                    </div>
                </div>
                <div classNameName="qask-body-box">
                    <div className={styles.top_sub}>Nickname</div>
                    <input className={styles.input_title} value={nickname} onChange={e=>{onChangeNickname(e.target.value)}}/>
                </div>  
                <div classNameName="qask-body-box">
                    <div className={styles.top_sub}>Password</div>
                    <input type="password" className={styles.input_title} value={password} onChange={e=>{onChangePassword(e.target.value)}}/>
                </div>      
                <div classNameName="qask-body-box">
                    <div className={styles.top_sub}>Email</div>
                    <input type="email" className={styles.input_title} value={email} onChange={e=>{onChangeEmail(e.target.value)}}/>
                </div>                     
                    </div>
    
                </div>
                <div className="qask-body-left-buttonbox">
                            <div onClick = {() => {signup()}} className={styles.btn} /*TODO: Review and Post are divided in the original site*/>
                                Sign up
                            </div>
                        </div>
            </div>
           
            </div>
        </div>
        </div>
</div>       
       
    )
}

export default Signup;