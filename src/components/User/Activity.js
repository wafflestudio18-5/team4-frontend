import React, {useState, useEffect} from 'react';
import {getAnswersOfUser, getQuestionsOfUser, getTagsOfUser, getBookmarksOfUser} from '../../axios'
//Answers, Questions, Tags, Badges, Bookmarks, Follwing, Bounties, Reputation, All actions, Responses, Votes
const activities = ["Answers", "Questions", "Tags","Bookmarks"];
const data = activities.map((activity) => {
    return {name: activity, data: {}};
})
const Section = ({activity,user,data}) => {
    let key = activity.substring(0,activity.length-1).toLowerCase()+'_count'
    const[list, setList] = useState([]);
    const[sortedBy,setSortedBy] = useState('votes')
    /*
    const comp = (a,b)=>{
        let criterion = 'votes';
        switch(sortedBy) {
            case 'votes': criterion = 'vote';break;
            case 'newest': criterion = 'created_at';break;
            case 'activity': criterion = 'updated_at';break;
            default: criterion = 'vote';break;
        }
        if(a[criterion] > b[criterion]) return -1;
        if(a[criterion] < b[criterion]) return 1;
        if(a.created_at < b.created_at) return -1;
        if(a.created_at > b.created_at) return 1;
        console.log('equal')
        return 0;
    }*/
    useEffect(()=>{
        // if(list.length !== 0) {
        //     setList(()=>JSON.parse(JSON.stringify(list)).sort(comp));
        //     return;
        // }
        //console.log(user)
        switch(activity) {
            case 'Answers':
                getAnswersOfUser(user.id,sortedBy)
                    .then(response => setList(()=>response));
                break;
            case 'Questions':
                getQuestionsOfUser(user.id,sortedBy)
                    .then(response => setList(()=>response));
                break;
                case 'Tags':
                getTagsOfUser(user.id, sortedBy)
                    .then(response => setList(()=>response))
                break;//to be implemented
            case 'Bookmarks'://server not implemented
                getBookmarksOfUser(user.id, sortedBy)
                    .then(response => setList(()=>response));//add author, tags later
            break;
            
        }
    }, [sortedBy])


    return(
    <>
    <h3 className="activity-section-activity">{activity} ({user === undefined? "undefined": key in user? user[key]:"no key"})</h3>
    <button onClick={(e)=>{setSortedBy(e.target.innerHTML.toLowerCase())}}>Votes</button>
    {activity === 'Tags'? 
    <button onClick={(e)=>{setSortedBy(e.target.innerHTML.toLowerCase())}}>Name</button>:
    <>
    <button onClick={(e)=>{setSortedBy(e.target.innerHTML.toLowerCase())}}>Activity</button>
    <button onClick={(e)=>{setSortedBy(e.target.innerHTML.toLowerCase())}}>Newest</button>
    </>
    }
    <hr/>
    <div className="activity-section-content">
    {activity==='Tags'?
    list.map(item => 
        <div key={item.id} style={{display:'flex'}}>
            <div>{item.score}</div><div>{item.name}</div><div>{item.posts}</div>
        </div>
    ):
    list.map(item => 
        <div key={item.id} style={{display:'flex'}}>
            <div>{item.vote}</div><div>{item.title}</div>
        </div>
        )
    }
    
    </div>
    </>
    );
}

const Activity = ({user}) => {
    const [category, setCategory] = useState("Summary");
    return (
    <>
    {!user?<></>:
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
                <Section key={name} user={user} activity={name} data={data}/>
            ))
            :
            data.map(({name, data}) => {
                if(name===category) {
                    return (<Section key={name} user={user} activity={name} data={data}/>
                )}
            })
        }
        </div>
    }
    </>
    );
}
export default Activity;