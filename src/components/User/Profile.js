import React, {useState, useEffect} from 'react';
import {getUserMe} from '../../axios'
const Profile = () => {
    const [user, setUser] = useState(undefined);
    useEffect(()=> {
        if(user !== undefined) return;
        getUserMe()
            .then(setUser)
            .catch(console.log)
    },[user]);
    return (
        user===undefined? <></>:
        <>
        <div class="user-card">
            <div>
                <img width="100px" height="100px" src={user.picture}/>
                <span>{user.reputation}</span>
            </div>
        </div>
        <div class="user-info">
            <div>
                <div class="user-info-nickname">{user.nickname}</div>
                <div class="user-info-summary"><span>Answers: {user.answer_count} </span><span>Questions: {user.question_count}</span></div>
            </div>
            <div>
            <div class="user-info-title">{user.title}</div>
            <div class="user-info-intro">{user.intro}</div>
            </div>
        </div>
        <div class="user-top-tags">
        <div>Top tags</div>
        <div class="user-tag">javascript</div>
        <div class="user-tag">react</div>
        <div class="user-tag">ecmascript-6</div>
        </div>
        <div class="user-top-posts">
        <div>Top posts</div>
        <div class="post-li"><span>rating </span><span>Using async/await with a forEach loop</span><span> created at</span></div>
        <div class="post-li"><span>rating </span><span>What is the difference between ( for… in ) and ( for… of ) statements in JavaScript?</span><span> created at</span></div>
        <div class="post-li"><span>rating </span><span>Are variables declared with let or const hoisted?</span><span> created at</span></div>
        </div>
        </>
    )
}
export default Profile;