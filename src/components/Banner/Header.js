import React, {useState, useEffect} from 'react'
import {getUserMe, getQuestionsWithKeywords, logout} from '../../axios'
import {useHistory} from 'react-router-dom'
import {useAuth} from '../../context/auth'
import './image.css'
import axios from 'axios'
import logo from '../../logo.png'
import {Login, Logout, removeUserInfo} from '../../modules/AuthRedux'
import {useSelector, useDispatch} from 'react-redux' 

import styles from "./Header.module.scss";
import Button from '../Button';

export const Header = () => {
  const dispatch = useDispatch();
  const isLoggedin = useSelector(state => state.isLoggedReducer.loggedin)
  console.log(isLoggedin);
  const token = useSelector(state => state.userInfoReducer.token)
  console.log(token);

  console.log("Token " + token);
  const [user, setUser] = useState({});
  const {authTokens, setAuthTokens} = useAuth()
  const instance = axios.create({
    baseURL: 'http://localhost:8000/',
    headers: { 'Authorization' : 'Token ' + token },
  });

  useEffect(()=> {
      if(isLoggedin) {
      instance.get('user/me/')
          .then(res => {
            console.log(res);
            setUser(res)
          })
          .catch(e => {
            console.log(e)
          })}
  },[]);

  // if(isLoggedin) {
  //   instance.get('user/me/')
  //       .then(res => {
  //         console.log(res);
  //         setUser(res.data)
  //       })
  //       .catch(e => {
  //         console.log(e)
  //       })}

  console.log(user);
  let history = useHistory();
  const [command, setCommand] = useState('');
  const search = () => {
  /*GET /question/search/keywords*/
      history.push("/users/me/")
  }
  const signout = () => {
    instance.post('/user/logout/')
      .then(() => {
        //setUser(()=>undefined)
        setAuthTokens()
        //Redirect?
      })
      .catch(e => {
        console.log(e);
      })
      dispatch(Logout)
      dispatch(removeUserInfo)

  }

  return (
      
    <div className={styles.header}>
      <img alt="logo" className={styles.logo} src={logo} onClick={()=>{history.push('/')}}/>
      <form className={styles.inputWithButton}  name="search-form" role="search" action="/questions" method="get">
        <input className={styles.input} onChange={(e)=>{setCommand(e.target.value)}} name="q" type="text" value={command} maxLength="200" placeholder="Search your..."/>
        <Button title="WAFFLE!"></Button>
      </form>
      <div className={styles.rightNav}>

        {!isLoggedin?
        <>
        <Button title="Signin" onClick={() => {history.push("/signin/")}}>Sign In</Button>
        <Button title="Signup" onClick={() => {history.push("/signup/")}}>Sign Up</Button>
        </>
        :
        <>
        <div className={styles.menus}>
          <img className="profile-image" src={user.picture} alt="user" onClick={()=>{history.push("/users/me")}}/>
          <p className={styles.menuItem}>{user.nickname}</p>
          <p className={styles.menuItem}>{user.reputation}</p>
        </div>

        <Button title="logout" onClick={()=>signout()}></Button>
        </>
        }
      </div>
    </div>
  );
};

export default Header;