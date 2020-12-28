import React, {useState, useEffect} from 'react';
import {useHistory} from 'react-router-dom';
import {getAnswerbyUser, getQuestionbyUser,getBookmark} from '../../axios'
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
const Section = ({activity,user,data}) => {
    let key = activity.substring(0,activity.length-1).toLowerCase()+'_count'
    const[list, setList] = useState([]);
    const[sortedBy,setSortedBy] = useState('votes')
    const comp = (a,b)=>{
        let criterion = 'votes';
        switch(sortedBy) {
            case 'votes': criterion = 'vote';break;
            case 'newest': criterion = 'created_at';break;
            case 'activity': criterion = 'updated_at';break;
        }
        //console.log(a[criterion])
        //console.log(b[criterion])
        if(a[criterion] > b[criterion]) return -1;
        if(a[criterion] < b[criterion]) return 1;
        if(a.created_at < b.created_at) return -1;
        if(a.created_at > b.created_at) return 1;
        console.log('equal')
        return 0;
    }
    //console.log(key)
    //console.log(list)
    useEffect(()=>{
        
        if(list.length != 0) {
            setList(()=>JSON.parse(JSON.stringify(list)).sort(comp));
            return;
        }
        //console.log(user)
        switch(activity) {
            case 'Answers':
                getAnswerbyUser(user.id,1,sortedBy)
                    .then(response => setList(()=>response.answers));
                break;
            case 'Questions':
                getQuestionbyUser(user.id,sortedBy)
                    .then(response => setList(()=>response.questions));
                break;
                case 'Tags':break;//to be implemented
            case 'Bookmarks'://server not implemented
            getBookmark('04cbda9c006d6a987f08d2b87faa80b9982c37cf',sortedBy,1)
                .then(response => setList(()=>response.questions));//add author, tags later
            break;
            
        }
    }, [sortedBy])


    return(
    <>
    <h3 className="activity-section-activity">{activity} ({user === undefined? "undefined": key in user? user[key]:"no key"})</h3>
    <button onClick={(e)=>{setSortedBy(e.target.innerHTML.toLowerCase())}}>Votes</button>
    <button onClick={(e)=>{setSortedBy(e.target.innerHTML.toLowerCase())}}>Activity</button>
    <button onClick={(e)=>{setSortedBy(e.target.innerHTML.toLowerCase())}}>Newest</button>
    <hr/>
    <div className="activity-section-content">
    {list.map(item => <div key={item.id} style={{display:'flex'}}><div>{item.vote}</div><div>{item.title}</div></div> )}
    
    </div>
    </>
    );
}

const Activity = ({user}) => {
    console.log(user)
    let history = useHistory();
    const [category, setCategory] = useState("Summary");
    return (
    <>
    {user===undefined?<></>:
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