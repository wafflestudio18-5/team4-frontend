import React, {useState, useEffect} from 'react';
import {getUserMe} from '../../axios';
import {useHistory} from 'react-router-dom';
//Answers, Questions, Tags, Badges, Bookmarks, Follwing, Bounties, Reputation, All actions, Responses, Votes

const activities = ["Answers", "Questions", "Tags", "Followed", "Bookmarks"];
const data = activities.map((activity) => {
    return {name: activity, data: {number:0}};
})
const Section = ({activity, data}) => {
    return(
    <>
    <h3 className="activity-section-activity">{activity} ({data.number})</h3>
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