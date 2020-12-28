import React, {useState, useEffect} from 'react'
import {getUserMe, getQuestionbyKwds} from '../../axios'
import {useHistory} from 'react-router-dom'
import './image.css'
import logo from '../../logo.png'

import styles from "./Header.module.scss";
import Button from '../Button';

export const Header = () => {
  const [user, setUser] = useState(undefined);
      useEffect(()=> {
          if(user !== undefined) return;
          getUserMe('04cbda9c006d6a987f08d2b87faa80b9982c37cf')
              .then((user) => {
                setUser(()=>user)
          })
      },[user]);
    let history = useHistory();
    const [command, setCommand] = useState('');
    const search = () => {
    /*GET /question/search/keywords*/
        history.push("/users/me")
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
        <></>
        :
        <>
        <div className={styles.menus}>
          <img className="profile-image" src={user.picture} alt="user"/>
          <p className={styles.menuItem}>{user.nickname}</p>
          <p className={styles.menuItem}>{user.reputation}</p>
        </div>
        <Button title="Profile" onClick={()=>{history.push("/users/me")}}></Button>
        </>
        }
      </div>
    </div>
  );
};

export default Header;