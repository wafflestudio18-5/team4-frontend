import React, {useState, useEffect} from 'react'
import {getUserMe, getQuestionsWithKeywords, logout} from '../../axios'
import {useHistory} from 'react-router-dom'
import './image.css'
import logo from '../../logo.png'

import styles from "./Header.module.scss";
import Button from '../Button';

export const Header = () => {
  const [user, setUser] = useState(undefined);
      useEffect(()=> {
          if(user !== undefined) return;
          getUserMe()
              .then(setUser)
              .catch(console.log)
      },[user]);
    let history = useHistory();
    const [command, setCommand] = useState('');
    const search = () => {
    /*GET /question/search/keywords*/
        history.push("/users/me")
    }
  const signout = () => {
    logout()
      .then(() => {
        setUser(()=>undefined)
        //Redirect?
      })

  }
  return (
      
    <div className={styles.header}>
      <img alt="logo" className={styles.logo} src={logo} onClick={()=>{history.push('/')}}/>
      <form className={styles.inputWithButton}  name="search-form" role="search" action="/questions" method="get">
        <input className={styles.input} onChange={(e)=>{setCommand(e.target.value)}} name="q" type="text" value={command} maxLength="200" placeholder="Search your..."/>
        <Button title="WAFFLE!"></Button>
      </form>
      <div className={styles.rightNav}>
        {user===undefined?
        <>
        <Button title="Signin" onClick={() => {history.push("/signin")}}>Signin</Button>
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