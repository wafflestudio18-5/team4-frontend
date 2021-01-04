import React, {useState} from 'react'
import {logout} from '../../axios'
import {useHistory} from 'react-router-dom'
import './image.css'
import logo from '../../logo.png'
import {Login, Logout, removeUserInfo} from '../../modules/AuthRedux'
import {useSelector, useDispatch} from 'react-redux' 

import styles from "./Header.module.scss";
import Button from '../Button';

export const Header = () => {
  const dispatch = useDispatch();
  const isLoggedin = useSelector(state => state.isLoggedReducer.loggedin)
  const token = useSelector(state => state.isLoggedReducer.token)
  const user = useSelector(state => state.userInfoReducer.payload?.payload)
    let history = useHistory();
    const [command, setCommand] = useState('');
    const search = () => {
    /*GET /question/search/keywords*/
        history.push("/users/me")
    }
  const signout = () => {
    console.log(token)
    logout(`Token ${token}`)
      .then(() => {
        dispatch(Logout());
        dispatch(removeUserInfo())
        history.go(-1)
      })

  }

  return (
      
    <div className={styles.header}>
      <img alt="logo" className={styles.logo} src={logo} onClick={()=>{history.push('/')}}/>
      {/*preventDefault*/}
      <form className={styles.inputWithButton}  name="search-form" role="search" action="/search" method="get">
        <input className={styles.input} onChange={(e)=>{setCommand(e.target.value)}} name="q" type="text" value={command} maxLength="200" placeholder="Search your..."/>
        <Button title="WAFFLE!"></Button>
      </form>
      <div className={styles.rightNav}>

        {!isLoggedin?
        <>
        <Button title="Signin" onClick={() => {history.push("/signin")}}>Sign In</Button>
        <Button title="Signup" onClick={() => {history.push("/signup")}}>Sign Up</Button>
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