import React, {useState, useEffect} from 'react'
import {getUserMe, getQuestionsWithKeywords} from '../../axios'
import {useHistory} from 'react-router-dom'
import './image.css'
import axios from 'axios'
import logo from '../../logo.png'
import {Login, Logout} from '../../modules/AuthRedux'
import {useSelector, useDispatch} from 'react-redux' 
import {useAuth} from '../../context/auth'

import styles from "./Header.module.scss";
import Button from '../Button';

export const Header = () => {
  const {authTokens, setAuthTokens} = useAuth()

  console.log("Header Component");
  const dispatch = useDispatch();
  const isLoggedin = useSelector(state => state.isLoggedReducer.loggedin)
  console.log(isLoggedin);
  const token = useSelector(state => state.userInfoReducer.token)
  console.log(token);

  console.log("Token " + token);

  const instance = axios.create({
    baseURL: 'http://localhost:8000/',
    headers: { 'Authorization' : 'Token ' + token },
  });
  console.log("Header: islogged?");
  console.log(isLoggedin);
  const [user, setUser] = useState("");
      useEffect(()=> {
          if(isLoggedin) {
          instance.get('user/me/')
              .then(setUser)
              .catch(e => {console.log(e)}) } 
      },[user]);
  let history = useHistory();
  const [command, setCommand] = useState('');
  const search = () => {
      const searchStr = command
      if ("user" in searchStr) {
        
      }
  /*GET /question/search/keywords*/
      history.push("/users/me")
  }
  const onLogoutBtnClick = () => {
    dispatch(Logout);
    history.push('/')
    history.go(0);
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
        <Button title="Signin" onClick={() => {history.push("/signin")}}>Signin</Button>
        <Button title="Join" onClick={() => {history.push("/join")}}>Signin</Button>
        </>
        :
        <>
        <div className={styles.menus}>
          <img className="profile-image" src={user.picture} alt="user"/>
          <p className={styles.menuItem}>{user.nickname}</p>
          <p className={styles.menuItem}>{user.reputation}</p>
        </div>
        <Button title="Profile" onClick={()=>{history.push("/users/me")}}></Button>
        <Button title="Logout" onClick={()=>onLogoutBtnClick}></Button>
        </>
        }
      </div>
    </div>
  );
};

export default Header;