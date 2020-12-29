import React, {useState, useEffect} from 'react';
import {getUserMe} from '../../axios'
import {getAnswersOfUser, getQuestionsOfUser} from '../../axios'
//to be modified for all users
const Profile = () => {
    const [user, setUser] = useState(undefined);
    const [topPosts, setTopPosts] = useState(undefined)

    useEffect(()=> {
        if(!user){
            getUserMe()
                .then(setUser)
                .catch(console.log)
            return
        }
        getTopAnswers()
    }, [user]);
    const getTopAnswers = () => {
        getAnswersOfUser(user.id, 'votes')
            .then(setTopPosts)
            .catch(console.log)
    }
    const getTopQuestions = () => {
        getQuestionsOfUser(user.id, 'votes')
            .then(setTopPosts)
            .catch(console.log)
    }
    return (
        (user && topPosts)?
        <>
        <div className="user-card">
            <div>
                <img width="100px" height="100px" src={user.picture}/>
                <span>{user.reputation}</span>
            </div>
        </div>
        <div className="user-info">
            <div>
                <div className="user-info-nickname">{user.nickname}</div>
                <div className="user-info-summary"><span>Answers: {user.answer_count} </span><span>Questions: {user.question_count}</span></div>
            </div>
            <div>
            <div className="user-info-title">{user.title}</div>
            <div className="user-info-intro">{user.intro}</div>
            </div>
        </div>
        <div className="user-top-tags">
        <h3>Top tags</h3>
        <div className="user-tag">javascript</div>
        <div className="user-tag">react</div>
        <div className="user-tag">ecmascript-6</div>
        </div>
        <div className="user-top-posts">
        <div><h3>Top posts</h3><button onClick={()=>{getTopQuestions()}}>Questions</button><button onClick={()=>{getTopAnswers()}}>Answers</button></div>
        {topPosts.map(answer => 
            <div className="post-li"><span>{answer.vote}</span><span>{answer.title}</span><span>{answer.created_at.substring(0,10)}</span></div>
        )}
        </div>
        </>
        :<></>
    )
}
export default Profile;