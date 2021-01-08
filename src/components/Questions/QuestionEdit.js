import {useSelector} from 'react-redux'
import axios from 'axios'
import {useHistory} from 'react-router-dom'
import {useState, useEffect} from 'react'
import MDEditor from '@uiw/react-md-editor'
import styles from '../Questions/QuestionAsk.module.scss'


const QuestionEdit = (match) => {
    const question_id = match.match.params.question_id
    const isLoggedin = useSelector(state => state.isLoggedReducer.loggedin)
    const token = useSelector(state => state.userInfoReducer.user.token) //redux 에서 islooedin. token 가져오기
    const user_id = useSelector(state => state.userInfoReducer.user.id)
    console.log(isLoggedin);
    console.log(token);
    //const history = useHistory();
    const [title, setTitle] = useState("")
    const [body, setBody] = useState("")
    const [tags, setTags] = useState("")
    const [permit, setPermit] = useState(false)
    const history = useHistory();

    const instance = axios.create({
        baseURL: 'https://www.wafflow.com/api/',
        headers: { 'Accept' : "application/json", 'Authorization' : 'Token ' + token},
      });

    useEffect( () => {
        if (!isLoggedin) {
            setPermit(false)
            console.log("not logged in");
            // history.go(-1);
        }
        if (body === "") {
            instance.get(`question/${question_id}/`)
                .then(res => {
                    console.log(res);
                    const question = res.data
                    if (question.author.id !== user_id) {
                        setPermit(false)
                        console.log(question.author);
                        console.log(user_id);
                        // history.go(-1)
                    }
                    else {
                        setBody(question.content)
                        setTitle(question.title)
                        var tags = ""
                        question.tags.forEach(tag => {
                            tags += (tag.name + " ")
                        })
                        console.log(tags);
                        setTags(tags)
                        setPermit(true)
                    }
                })
                .catch(e => {
                    console.log(e);
                    // history.go(-1)
                })
        }
    })

    function submit() {
        console.log(title);
        console.log(body);
        console.log(tags.replace('+','%2b').replace(' ', '+'));
        instance.put(`question/${question_id}/`, {title: title, content: body, tags: tags.split(' ')})
            .then(res => {
                console.log(res);
                history.go(-1)
            })
            .catch(e => {
                console.log(e);
            })
    }

    function cancel() {
        history.go(-1);
    }

    return (
        <div>
            {!(permit)? 
            <div>
                You Have No Permission
            </div>    
            
            :
            <div className={styles.board_all}>
            <div className={styles.box_top}>
                <div classNam={styles.box}>
                <div className={styles.top_sub1}>
                        Edit this question
                    </div>
                </div>
            </div>
            <div className={styles.box}>
            
            <div className={styles.board}>
                <div className={styles.top}>

                </div>
                <div className={styles.body}>
                    <div className={styles.body_sub}>
                        
    
                    <div className={styles.title_box}>
                    <div className={styles.top_sub}>Title</div>
                    <div className={styles.help1}>Be specific and imagine you’re asking a question to another person</div>
                    <div className={styles.input_box}>
                        <input className={styles.input_title} value={title} onChange={(e)=>{setTitle(e.target.value)}}/>
    
                    </div>
                </div>
                <div classNameName="qask-body-box">
                    <div className={styles.top_sub}>Body</div>
                    <div className={styles.help1}>Include all the information someone would need to answer your question</div>
                    <MDEditor 
                    value={body}
                    onChange={(e) => {console.log(e); setBody(e)}}
                    />
                </div>
    
              <div className={styles.up_margin}>
                    <div className={styles.top_sub}>Tags</div>
                    <div className={styles.help1}>Add up to 5 tags to describe what your question is about</div>
                    <div className="qask-tags-input-box">
                    <input className={styles.input_title} value={tags} placeholder="Input tags, seperated by space" onChange={(e)=>{setTags(e.target.value)}}/>
                    </div>
                </div>
    
                        
                    </div>
    
                </div>
                <div className="qask-body-left-buttonbox">
                            <div onClick = {() => {submit()}} className={styles.btn} /*TODO: Review and Post are divided in the original site*/>
                                Save Edit
                            </div>
                        </div>
            </div>
           
            </div>
        </div>
    }
    </div>
    )
    
      
}

export default QuestionEdit