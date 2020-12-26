import axios from 'axios'
import { UserInterface, UserEditInterface, LoginInfoInterface, QuestionInterface, QuestionEditInterface } from './Formats'


//TODO: baseUrl, token needs to be updated to an exact value
//TODO: use redux to store and use token

const timeout_set = 1000 
var baseUrl: string = "BASEURL"
var token: string = "AUTH_TOKEN"

axios.defaults.headers.common['Authorization'] = token;
axios.defaults.baseURL = baseUrl;
//alertError: function to show info about errors for all requests/responses
function alertError (error : Error) {
    //put the error status code as log
    console.log('error at ' + error);
    console.log(error.name);
    console.log(error.message);
    
    console.log(error.stack);
    
    
    //throw error
    throw(error)
    //mainly used logs, and tried not to use alerts in this file 
}

//User APIs

export const getUserMe = async (func : Function) => {
    await axios.get('user/me', {timeout:timeout_set})
        .then((response) => {
            //show response data in log
            console.log("getUserMe Response data: ")
            console.log(response.data)
            func(response)
        })
        .catch(error=>alertError(error))
    }

export const getUser = async (func : Function, id: number) => {
    await axios.get(`http://localhost:4000/user/${id}`, {timeout:timeout_set})
        .then((response) => {
            //show response data in log
            console.log("getUserbyId Request data: ")
            console.log(response.data)
            func(response)
        })
        .catch(error=>alertError(error))
    }

//user: User
export const postUser = async (func : Function, user: UserInterface) => {
    await axios.post(`user`, {user, timeout:timeout_set})
        .then((response) => {
            //show response data in log
            console.log("postUser Request data: ")
            console.log(user)
            //TODO: get and sotre token by redux
            //response.data.token
            func(response)
        })
        .catch(error => {
            alertError(error)})
    }
//user: UserEdit
export const editUserME = async (func : Function, user : UserEditInterface) => {
    //FIXME: is it safe (or recommended) to give this warning here?)
    if (!user) {alert("No information is new")}
    else {
        await axios.put('user/me', {user, timeout:timeout_set})
            .then(response => {
                console.log(response.data);
                //TODO: update reputation, last_login, ... etc
            })
            .catch(error => {
                alert(error.response.data.message);
                alertError(error);
            })
        }
    }


export const deleteUser = async (func : Function) => { 
    await axios.delete('user/me', {timeout:timeout_set})
        .then(response => {
            console.log(response.data);
            func(response)
        })
        .catch(error => {
            alertError(error)
        })
}       
//login_info: Login_info
export const signin = async (func : Function, login_info: LoginInfoInterface) => {
    await axios.put('user/login', login_info, {timeout:timeout_set})
        .then(response => {
            console.log(response.data);
            return response
        })
        .catch(error => {
            alertError(error);
        })
}

export const signout = async (func : Function) => {
    await axios.post('user/logout', {timeout:timeout_set})
        .then(response => {
            console.log(response.data);
            func(response)
        })
        .catch(error => {
            alertError(error)
        })
}

//Question APIs

export const getQuestionbyId = async (func : Function, question_id: number) => {
    await axios.get(`question/${question_id}`, {timeout:timeout_set})
        .then(response => {
            console.log(response.data);
            func(response)
        })
        .catch(error => {
            alertError(error)
            return error.response.status //return status?
        })
}

export const getQuestionbyUser = async (func : Function, user_id: string, sort_by: string, page_number = 1) => {
    await axios.get(`question/user/${user_id}?sorted_by=${sort_by}` + (page_number === 1? "" : `&page=${page_number}`), {timeout:timeout_set}) 
        .then(response => {
            console.log(response.data);
            func(response)
        })
        .catch(error => {
            alertError(error)
            //FIXME: how to handle status code 301?
            if (error.response.status === 301) {return error.response.data}
        })
}

//tags must be in the right format: etc) "react+js+axios"
export const getQuestionbyTag = async (func : Function, filter_by: string, tags: string[], sort_by: string, page_number = 1) => {
    await axios.get(`question/tagged/${tags}`,
        {params:{'filter_by' : filter_by,
                 'sorted_by' : sort_by,
                 'page': page_number},
        timeout:timeout_set})
        .then(response => {
            console.log(response.data);
            func(response)
        })
        .catch(error => {
            //alertError(error)
            //FIXME: how to handle status code 301?
            console.log("response data");
            console.log(error.response.status);
            return error.response

        })
}

//getQuestionbyKwds: get by keywords
//keywords must be in the right format: etc) "react+js+axios"
export const getQuestionbyKwds = async (func : Function, keywords: string[], filter_by: string, sort_by: string, page_number = 1) => {
    await axios.get(`question/search/${keywords}`,
        {params:{'filter_by' : filter_by,
                 'sorted_by' : sort_by,
                 'page': page_number},
                 timeout:timeout_set})
        .then(response => {
            console.log(response.data);
            func(response)
        })
        .catch(error => {
            alertError(error)
            //FIXME: how to handle status code 301?
            if (error.response.status === 301) {return error.response.data}
        })
}

//question : Question
export const postQuestion = async (func : Function, question: QuestionInterface) => {
    await axios.post('question/',
        {data:question, timeout:timeout_set})
        .then(response => {
            console.log(response.data);
            func(response)
        })
        .catch(error => {
            alertError(error)
        })
}

//question : QuestionEdit
export const editQuestion = async (func : Function, id: number, question: QuestionEditInterface) => {
    await axios.post(`question/${id}`,
        {data:question, timeout:timeout_set})
        .then(response => {
            console.log(response.data);
            func(response)
        })
        .catch(error => {
            alertError(error)
        })
}


//Answer APIs

export const getAnswerbyUser = async (func : Function, id: number, page = 1, sorted_by: string) => {
    await axios.post(`answer/user/${id}`,
        {params:{'page': page, 
                 'sorted_by' : sorted_by}, timeout:timeout_set})
        .then(response => {
            console.log(response.data);
            func(response)
        })
        .catch(error => {
            alertError(error)
        })
}

export const getAnswerbyQuestion = async (func : Function, id: number, page = 1, sorted_by: string) => {
    await axios.post(`answer/question/${id}`,
        {params:{'page': page, 
                 'sorted_by' : sorted_by}, timeout:timeout_set})
        .then(response => {
            console.log(response.data);
            func(response)
        })
        .catch(error => {
            alertError(error)
        })
}

export const getAnswerbyRating = async (func : Function, id:number, page = 1, sorted_by: string) => {
    await axios.post(`answer/question/${id}`,
        {params:{'page': page, 
                 'sorted_by' : sorted_by}, timeout:timeout_set})
        .then(response => {
            console.log(response.data);
            func(response)
        })
        .catch(error => {
            alertError(error)
        })
}

export const getAnswerbyId = async (func : Function, id: number) => {
    await axios.post(`answer/${id}`, {timeout:timeout_set})
        .then(response => {
            console.log(response.data);
            func(response)
        })
        .catch(error => {
            alertError(error)
        })
}

export const postAnswer = async (func : Function, id: number, answer: string) => {
    await axios.post(`answer/question/${id}`,
    {data:{'content': answer}, timeout:timeout_set})
        .then(response => {
            console.log(response.data);
            func(response)
        })
        .catch(error => {
            alertError(error)
        })
}

export const editAnswer = async (func : Function, id: number, answer: string) => {
    await axios.put(`answer/${id}`,
    {data:{content: answer}, timeout:timeout_set})
        .then(response => {
            console.log(response.data);
            func(response)
        })
        .catch(error => {
            alertError(error)
        })
}

export const deleteAnswer = async (func : Function, id: number, answer: string) => {
    await axios.delete(`answer/${id}`, {timeout:timeout_set})
        .then(response => {
            console.log(response.data);
            func(response)
        })
        .catch(error => {
            alertError(error)
        })
}

//Comment APIs

export const getCommentbyId = async (func : Function, id: number) => {
    await axios.get(`comment/${id}`, {timeout:timeout_set})
        .then(response => {
            console.log(response.data);
            func(response)
        })
        .catch(error => {
            alertError(error)
        })
}

export const getCommentbyAnswer = async (func : Function, id: number, page = 1) => {
    await axios.get(`comment/answer/${id}`, {params:{'page':page}, timeout:timeout_set})
        .then(response => {
            console.log(response.data);
            func(response)
        })
        .catch(error => {
            alertError(error)
        })
}

export const getCommentbyQuestion = async (func : Function, id: number, page = 1) => {
    await axios.get(`comment/question/${id}`, {params:{'page':page}, timeout:timeout_set})
        .then(response => {
            console.log(response.data);
            func(response)
        })
        .catch(error => {
            alertError(error)
        })
}

//TODO: id of question Question에 Comment달기
export const postCommentQuestion = async (func : Function, id: number, content: String) => {
    await axios.post(`comment/question/${id}`, {data:{'content':content}, timeout:timeout_set})
        .then(response => {
            console.log(response.data);
            func(response)
        })
        .catch(error => {
            alertError(error)
        })
}


//TODO: id of answer Answer에 Comment 달기
export const postCommentAnswer = async (func : Function, id: number, content: string) => {
    await axios.post(`comment/answer/${id}`, {data:{'content':content}, timeout:timeout_set})
        .then(response => {
            console.log(response.data);
            func(response)
        })
        .catch(error => {
            alertError(error)
        })
}

//TODO: content = ""?
export const editComment = async (func : Function, id: number, comment: string) => {
    await axios.put(`comment/${id}`, {data:{'comment' : comment}, timeout:timeout_set})
        .then(response => {
            console.log(response.data);
            func(response)
        })
        .catch(error => {
            alertError(error)
        })
}

export const deleteComment = async (func : Function, id:number) => {
    await axios.delete(`comment/${id}`, {timeout:timeout_set})
        .then(response => {
            console.log(response.data);
            func(response)
        })
        .catch(error => {
            alertError(error)
        })
}

export const rateQuestion = async (func : Function, id: number, rate: number) => {
    await axios.put(`rate/question/${id}`, {data:{'rate' : rate}, timeout:timeout_set})
        .then(response => {
            console.log(response.data);
            func(response)
        })
        .catch(error => {
            alertError(error)
        })
}

export const rateAnswer = async (func : Function, id: number, rate: number) => {
    await axios.put(`rate/answer/${id}`, {data:{'rate' : rate}, timeout:timeout_set})
        .then(response => {
            console.log(response.data);
            func(response)
        })
        .catch(error => {
            alertError(error)
        })
}

export const rateComment = async (func : Function, id: number, rate: number) => {
    await axios.put(`rate/comment/${id}`, {data:{'rate' : rate}, timeout:timeout_set})
        .then(response => {
            console.log(response.data);
            func(response)
        })
        .catch(error => {
            alertError(error)
        })
}

export const postBookmark = async (func : Function, id: number) => {
    await axios.post(`bookmark/question/${id}`, {timeout:timeout_set})
        .then(response => {
            console.log(response.data);
            func(response)
        })
        .catch(error => {
            alertError(error)
        })
}

export const deleteBookmark = async (func : Function, id: number) => {
    await axios.delete(`bookmark/question/${id}`, {timeout:timeout_set})
        .then(response => {
            console.log(response.data);
            func(response)
        })
        .catch(error => {
            alertError(error)
        })
}

export const acceptAnswer = async (func : Function, id: number) => {
    await axios.post(`answer/${id}/acception`, {timeout:timeout_set})
        .then(response => {
            console.log(response.data);
            func(response)
        })
        .catch(error=>{
            alertError(error)
        })
}

export const deleteacceptAnswer = async (func : Function, id: number) => {
    await axios.delete(`answer/${id}/acception`, {timeout:timeout_set})
        .then(response => {
            console.log(response.data);
            func(response)
        })
        .catch(error=>{
            alertError(error)
        })
}