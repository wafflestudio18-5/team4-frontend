import React, {useState, useEffect} from 'react';
import {useHistory} from 'react-router-dom';
//Answers, Questions, Tags, Badges, Bookmarks, Follwing, Bounties, Reputation, All actions, Responses, Votes
const user = { 
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
  };
const activities = ["Answers", "Questions", "Tags","Bookmarks"];
const data = activities.map((activity) => {
    return {name: activity, data: {}};
})
const Section = ({activity,data}) => {
    let key = activity.substring(0,activity.length-1).toLowerCase()+'_count'
    return(
    <>
    <h3 className="activity-section-activity">{activity} ({user[key]})</h3>
    <hr/>
    <div className="activity-section-content">
    blah blah blah
    </div>
    </>
    );
}

const Activity = () => {
    let history = useHistory();
    const [category, setCategory] = useState("Summary");
    return (
    <>
        <div className="activity-header">
        <div>
            <button key="Summary" onClick={()=>{setCategory("Summary")}}>Summary</button>
            {activities.map(activity => 
                <button key={activity} onClick={()=>{setCategory(activity)}}>{activity}</button>
                )
            }

        </div>
        {category === "Summary"? 
            data.map(({name, data}) => (
                <Section key={name} activity={name} data={data}/>
            ))
            :
            data.map(({name, data}) => {
                if(name===category) {
                    return (<Section key={name} activity={name} data={data}/>
                )}
            })
        }
        </div>
    </>
    );
}
export default Activity;