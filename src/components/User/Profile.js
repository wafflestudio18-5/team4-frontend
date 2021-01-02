import React, {useState, useEffect} from 'react';
import {getAnswersOfUser, getQuestionsOfUser, getTagsOfUser} from '../../axios'
//to be modified for all users
const Profile = ({user}) => {
    //const [user, setUser] = useState(user);
    const [topPosts, setTopPosts] = useState(undefined)
    const [topTags, setTopTags] = useState(undefined)
    useEffect(()=> {
        // if(!user){
        //     getUserMe()
        //         .then(setUser)
        //         .catch(console.log)
        //     return
        // }
        getTopAnswers()
        getTopTags()
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
    const getTopTags = () => {
        getTagsOfUser(user.id, 'votes')
            .then(setTopTags)
            .catch(console.log)
    }
    return (
        (user && topPosts && topTags)?
        <>
        <div class="user-card">
            <div>
                <img width="100px" height="100px" src={user.picture} alt={`user:${user.nickname}`}/>
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
        <div className="user-top-tags">
        <h3>Top tags</h3>
        {topTags.map(tag => <div key={tag.id} className="user-tag"><span>{tag.name}</span><span>score:{tag.score}</span><span>posts:{tag.posts}</span></div>)}
        </div>
        <div className="user-top-posts">
        <div><h3>Top posts</h3><button onClick={()=>{getTopQuestions()}}>Questions</button><button onClick={()=>{getTopAnswers()}}>Answers</button></div>
        {topPosts.map(post => 
            <div key={post.id} className="post-li"><span>{post.vote}</span><span>{post.title}</span><span>{post.created_at.substring(0,10)}</span></div>
        )}
        </div>
        </>
    )
}
export default Profile;