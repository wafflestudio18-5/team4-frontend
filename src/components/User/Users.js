import React, {useState, useEffect} from 'react'
import { getUsers } from '../../axios'
import {useHistory} from 'react-router-dom'

const UserCard = ({user}) => {
    const history = useHistory()
    return (
        <div onClick={()=>history.push(`/users/${user.id}`)}>
            <img src={user.picture} alt={`user:${user.nickname}`}/>
            <div>
                <span>{user.nickname}</span>
                <span>{user.reputation}</span>
            </div>
        </div>
    )
}
//GET users
const Users = () => {
    const [users, setUsers] = useState([])
    const [loading, setLoading] = useState(true)
    useEffect(()=>{
        getUsers('reputation', '')
            .then(response => {
                setUsers(response.users)
                setLoading(false)
            })
            .catch(console.log)
    },[loading])
    return (
        <>
        {loading? 
            <></>:
            users.map(user=> <UserCard key={user.id} user={user}/>
        )}
        </>
    )
}
export default Users;