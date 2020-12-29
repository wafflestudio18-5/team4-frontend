import axios from 'axios'
import { ObjectFlags, resolveModuleName } from 'typescript';
import { UserInterface, UserEditInterface, LoginInfoInterface, QuestionInterface, QuestionEditInterface } from './Formats'


//TODO: baseUrl, token needs to be updated to an exact value
//TODO: use redux to store and use token

var baseUrl: string = "http://localhost:8000"//test server
var token: string = "Token "+"04cbda9c006d6a987f08d2b87faa80b9982c37cf"//test token

axios.defaults.headers.common['Authorization'] = token;
axios.defaults.baseURL = baseUrl;
//alertError: function to show info about errors for all requests/responses
function alertError (error : Error) {
    //put the error status code as log
    console.log('error at ' + error);
    //throw error
    throw(error)
    //mainly used logs, and tried not to use alerts in this file 
}

//User APIs
//GET user
export const getUserMe = () => new Promise((resolve, reject) => {
    axios.get('user/me/')
        .then((response) => resolve(response.data))
        .catch(reject)
    })

export const getUser = (id: number) => new Promise((resolve,reject) => {
    axios.get(`user/${id}/`)
        .then((response) => resolve(response.data))
        .catch(reject)
})
//POST user
export const postUser = (user: UserInterface, github_token: String) => new Promise((resolve,reject) => {
    axios.post(`user/`, {data: Object.assign(user, github_token)})
        .then((response) => resolve(response.data))
        .catch(reject)
})
//PUT user
export const editUserMe = (user: UserInterface) => new Promise((resolve,reject) => {
    axios.put(`user/me/`, {data: user})
        .then((response) => resolve(response.data))
        .catch(reject)//response.data.message?
})
//DELETE user
export const deleteUserMe = () => new Promise((resolve,reject) => {
    axios.delete(`user/me/`)
        .then((response) => resolve(response.data))
        .catch(reject)//response.data.message?
})
//login
export const login = (username: string, password: string, github_token: string) => new Promise((resolve,reject) => {
    axios.put(`user/login/`,{data:github_token?{username, password, github_token}:{username, password}})
        .then((response) => {
            localStorage.setItem("token", response.data.token)
            localStorage.setItem("logged_in", "true")
            resolve(response.data)})
        .catch(reject)//response.data.message?
})
//logout
export const logout = () => new Promise((resolve,reject) => {
    axios.post(`user/logout/`)
        .then((response) => {
            localStorage.removeItem('token')
            localStorage.removeItem('logged_in')
            resolve(response.data)})
        .catch(reject)//response.data.message?
})

//Question APIs
//GET question
export const getQuestion = (id: number) => 
    new Promise((resolve,reject) => {
        axios.get(`question/${id}/`)
            .then(response => resolve(response.data))
            .catch(reject)
    }
)

export const getQuestionsOfUser = (id: string, sorted_by: string, page = 1) => 
    new Promise((resolve,reject) => {
        axios.get(`question/user/${id}/`, {params:{sorted_by, page}})
            .then(response => resolve(response.data.questions))
            .catch(reject)//FIXME: how to handle status code 301?
    }
)

export const getQuestionsWithTags = (tags: string[], filter_by: string, sorted_by: string, page=1) => 
    new Promise((resolve,reject) => {
        axios.get(`question/tagged/}`,
                    {params:{'tags':tags.join('+'), filter_by, sorted_by, page}})
            .then(response => resolve(response.data.questions))
            .catch(reject)//FIXME: how to handle status code 301?
    }
)

export const getQuestionsWithKeywords = (keywords: string[], filter_by: string, sorted_by: string, page=1) => 
    new Promise((resolve,reject) => {
        axios.get(`question/search/keywords/}`,
                    {params:{'keywords':keywords.join('+'), filter_by, sorted_by, page}})
            .then(response => resolve(response.data.questions))
            .catch(reject)//FIXME: how to handle status code 301?
    }
)

//POST question
export const postQuestion = (question: QuestionInterface) => 
    new Promise((resolve,reject) => {
        axios.post(`question/`, {data:{question}})
            .then(response => resolve(response.data))
            .catch(reject)//FIXME: how to handle status code 301?
    }
)

//PUT question
export const editQuestion = (id: number, question: QuestionEditInterface) => 
    new Promise((resolve,reject) => {
        axios.put(`question/${id}/`, {data:{question}})
            .then(response => resolve(response.data))
            .catch(reject)//FIXME: how to handle status code 301?
    }
)

//Answer APIs
//GET answer
export const getAnswersOfUser = (id: number, sorted_by: string, page = 1) => 
    new Promise((resolve,reject) => {
        axios.get(`answer/user/${id}/`, {params:{page, sorted_by}})
            .then(response => resolve(response.data.answers))
            .catch(reject)
    }
)

export const getAnswersOfQuestion = (id: number, sorted_by: string, page = 1) => 
    new Promise((resolve,reject) => {
        axios.get(`answer/question/${id}/`, {params:{page, sorted_by}})
            .then(response => resolve(response.data.answers))
            .catch(reject)
    }
)

export const getAnswer = (id: number) => 
    new Promise((resolve,reject) => {
        axios.get(`answer/${id}/`)
            .then(response => resolve(response.data))
            .catch(reject)
    }
)
//POST answer
export const postAnswer = (id: number, content: string) => 
    new Promise((resolve,reject) => {
        axios.post(`answer/question/${id}/`, {data:{content}})
            .then(response => resolve(response.data))
            .catch(reject)
    }
)

export const postAnswerAcceptance = (id: number) => 
    new Promise((resolve,reject) => {
        axios.post(`answer/${id}/acception/`)
            .then(response => resolve(response.data))
            .catch(reject)
    }
)
//PUT answer
export const editAnswer = (id: number, content: string) => 
    new Promise((resolve,reject) => {
        axios.put(`answer/${id}/`,{data:{content}})
            .then(response => resolve(response.data))
            .catch(reject)
    }
)
//DELETE answer
export const deleteAnswer = (id: number) => 
    new Promise((resolve,reject) => {
        axios.delete(`answer/${id}/`)
            .then(response => resolve(response.data))
            .catch(reject)
    }
)

export const deleteAnswerAcceptance = (id: number) => 
    new Promise((resolve,reject) => {
        axios.delete(`answer/${id}/acception/`)
            .then(response => resolve(response.data))
            .catch(reject)
    }
)

//Comment APIs
//GET comment
export const getComment = (id: number) => 
    new Promise((resolve,reject) => {
        axios.get(`comment/${id}/`)
            .then(response => resolve(response.data))
            .catch(reject)
    }
)
export const getCommentsOfAnswer = (id: number, page=1) => 
    new Promise((resolve,reject) => {
        axios.get(`comment/answer/${id}/`)
            .then(response => resolve(response.data.comments))
            .catch(reject)
    }
)
export const getCommentsOfQuestion = (id: number, page=1) => 
    new Promise((resolve,reject) => {
        axios.get(`comment/question/${id}/`)
            .then(response => resolve(response.data.comments))
            .catch(reject)
    }
)
//POST comment
export const commentOnQuestion = (question_id: number, content: String) => 
    new Promise((resolve,reject) => {
        axios.post(`comment/question/${question_id}/`, {data:{content}})
            .then(response => resolve(response.data))
            .catch(reject)
    }
)
export const commentOnAnswer = (answer_id: number, content: String) => 
    new Promise((resolve,reject) => {
        axios.post(`comment/answer/${answer_id}/`, {data:{content}})
            .then(response => resolve(response.data))
            .catch(reject)
    }
)
//PUT comment
export const editComment = (id: number, comment: string) => 
    new Promise((resolve,reject) => {
        axios.put(`comment/${id}/`, {data:{comment}})
            .then(response => resolve(response.data))
            .catch(reject)
    }
)
//DELETE comment
export const deleteComment = (id: number) => 
    new Promise((resolve,reject) => {
        axios.delete(`comment/${id}/`)
            .then(response => resolve(response.data))
            .catch(reject)
    }
)
//Rate APIs
//PUT rate
export const rateQuestion = (id: number, rating: number) => 
    new Promise((resolve,reject) => {
        axios.put(`rate/question/${id}/`, {data:{rating}})
            .then(response => resolve(response.data))
            .catch(reject)
    }
)
export const rateAnswer = (id: number, rating: number) => 
    new Promise((resolve,reject) => {
        axios.put(`rate/answer/${id}/`, {data:{rating}})
            .then(response => resolve(response.data))
            .catch(reject)
    }
)
export const rateComment = (id: number, rating: number) => 
    new Promise((resolve,reject) => {
        axios.put(`rate/comment/${id}/`, {data:{rating}})
            .then(response => resolve(response.data))
            .catch(reject)
    }
)

//Bookmark APIs
//GET bookmark
export const getBookmarks = (sorted_by: string, page = 1) => 
    new Promise((resolve,reject) => {
        axios.get(`bookmark/user/me/`, {params:{sorted_by, page}})
            .then(response => resolve(response.data.questions))
            .catch(reject)
    }
)
//POST bookmark
export const addBookmark = (question_id: number) => 
    new Promise((resolve,reject) => {
        axios.post(`bookmark/question/${question_id}/`)
            .then(response => resolve(response.data))
            .catch(reject)
    }
)
//DELETE bookmark
export const deleteBookmark = (id: number) => 
    new Promise((resolve,reject) => {
        axios.delete(`bookmark/question/${id}/`)
            .then(response => resolve(response.data))
            .catch(reject)
    }
)
