import React, {useState} from 'react'
import {getQuestionbyKwds} from '../../axios'
import {useHistory} from 'react-router-dom'
import './image.css'
import logo from '../../logo.png'

import styles from "./Header.module.scss";
import Button from '../Button';

export const Header = () => {
    const [user, setUser] = useState({ 
        "id": 0,
        "username": "waffle",
        "created_at": 0,
        "updated_at": 0,
        "email": "waffle@wafflestudio.com",
        "last_login": 0,
        "nickname": "waffl-e",
        "picture": "https://upload.wikimedia.org/wikipedia/commons/thumb/5/5b/Waffles_with_Strawberries.jpg/1280px-Waffles_with_Strawberries.jpg",
        "reputation": 0,
        "question_count": 1,
        "answer_count":2,
        "bookmark_count":3
      });

    let history = useHistory();
    const [command, setCommand] = useState('');
    const search = () => {
    /*GET /question/search/keywords*/
        history.push("/users/me")
    }
  return (
      
    <div className={styles.header}>
      <a href="/"><img alt="logo" className={styles.logo} src={logo} /></a>
      <form className={styles.inputWithButton}  name="search-form" role="search" action="/questions" method="get">
        <input className={styles.input} onChange={(e)=>{setCommand(e.target.value)}} name="q" type="text" value={command} maxLength="200" placeholder="Search your..."/>
        <Button title="WAFFLE!"></Button>
      </form>
      <div className={styles.rightNav}>
        <div className={styles.menus}>
          <img className="profile-image" src="https://upload.wikimedia.org/wikipedia/commons/thumb/5/5b/Waffles_with_Strawberries.jpg/1280px-Waffles_with_Strawberries.jpg" alt="user"/>
          <p className={styles.menuItem}>코린이</p>
          <p className={styles.menuItem}>100</p>
        </div>
        <Button title="Profile"></Button>
      </div>
    </div>
  );
};

export default Header;