import React, {useState} from 'react'
import {logout} from '../../axios'
import {useHistory} from 'react-router-dom'
import './image.css'
import axios from 'axios'
import logo from '../../logo.png'
import defaultPicture from '../../profile_image.png'

import {Logout, removeUserInfo} from '../../modules/AuthRedux'
import {useSelector, useDispatch} from 'react-redux' 

import styles from "./Header.module.scss";
import Button from '../Button';

export const Header = () => {
  const dispatch = useDispatch();
  const isLoggedin = useSelector(state => state.isLoggedReducer.loggedin)

  const token = useSelector(state => state.isLoggedReducer.token)
  const user = useSelector(state => state.userInfoReducer.user)
    let history = useHistory();
    const [command, setCommand] = useState('');
  const signout = () => {
    logout(`Token ${token}`)
      .then(() => {
        dispatch(Logout());
        dispatch(removeUserInfo())
        history.go(-1)

      })
      .catch(e => {
        console.log(e);
      })

  }
  const search = (e) => {
    e.preventDefault()
    history.push(`/search?q=${encodeURIComponent(command)}`)
  }
  return (
      
    <div className={styles.header}>
      <img alt="logo" className={styles.logo} src={logo} onClick={()=>{history.push('/')}}/>
      {/*preventDefault*/}
      <form className={styles.inputWithButton}  name="search-form" role="search" action="/search" method="get" onSubmit={(e)=>{search(e)}}>
        <input className={styles.input} onChange={(e)=>{setCommand(e.target.value)}} name="q" type="text" value={command} maxLength="200" placeholder="Search your..."/>
        <Button title="WAFFLE!"></Button>
      </form>
      <div className={styles.rightNav}>

        {!(isLoggedin) || !user ?
        <div style={{minWidth:'180px', height:'100%', display:'flex', justifyContent:'space-between', alignItems:'stretch'}}>
        <Button title="Signin" onClick={() => {history.push("/signin/")}}>Sign In</Button>
        <Button title="Signup" onClick={() => {history.push("/signup/")}}>Sign Up</Button>
        </div>
        :
        <>
        <div className={styles.menus}>
          <img className="profile-image" src={user.picture? user.picture:defaultPicture} alt={user.username} onClick={()=>{history.push("/users/me")}}/>
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