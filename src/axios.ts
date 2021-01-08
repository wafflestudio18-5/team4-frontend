import axios from 'axios'
import { ObjectFlags, resolveModuleName } from 'typescript';
import { UserInterface, UserEditInterface, LoginInfoInterface, QuestionInterface, QuestionEditInterface } from './Formats'

//TODO: baseUrl, token needs to be updated to an exact value
//TODO: use redux to store and use token

const logError = (error: any) => {
    const log = error?.response
    console.log(`${error?.status} ${error?.statusText}`)
    console.log(`${log?.config?.method} ${log?.config?.url}`)
    return log?.data
}
axios.defaults.headers["Accept"] = "application/json";
axios.defaults.baseURL = "https://www.wafflow.com/";
//User APIs
//GET user
export const getUserMe = () => new Promise((resolve, reject) => {
    axios.get('api/user/me/')
        .then((response) => resolve(response.data))
        .catch(e=>reject(logError(e)))
    })

export const getUser = (id: number) => new Promise((resolve,reject) => {
    axios.get(`api/user/${id}/`)
        .then((response) => resolve(response.data))
        .catch(e=>reject(logError(e)))
})
export const getUsers = (sorted_by: string, search: string, page=1) => new Promise((resolve,reject) => {
    axios.get(`api/users/`,{params:{sorted_by, search, page}})
        .then((response) => resolve(response.data))
        .catch(e=>reject(logError(e)))
})
//POST user
export const postUser = (user: UserInterface, github_token: String) => new Promise((resolve,reject) => {
    const data = github_token? Object.assign(user, github_token): user;
    axios.post(`api/user/`, data)
        .then((response) => resolve(response.data))
        .catch(e=>reject(logError(e)))
})
//PUT user
export const editUserMe = (user: UserInterface) => new Promise((resolve,reject) => {
    const data = user
    axios.put(`api/user/me/`, data, {headers: {'content-type': 'multipart/form-data'}})
        .then((response) => resolve(response.data))
        .catch(e=>reject(logError(e)))//response.data.message?
})
//DELETE user
export const deleteUserMe = () => new Promise((resolve,reject) => {
    axios.delete(`api/user/me/`)
        .then((response) => resolve(response.data))
        .catch(e=>reject(logError(e)))//response.data.message?
})
//login
export const login = (username: string, password: string, github_token: string) => new Promise((resolve,reject) => {
    const data = github_token? {username, password, github_token}:{username, password}
    axios({method: 'put', url: `api/user/login/`, data})
        .then((response) => {
            axios.defaults.headers.common['Authorization'] = `Token ${response.data.token}`;
            resolve(response.data)})
        .catch(e=>reject(logError(e)))//response.data.message?
})
//logout
export const logout = (token: string) => new Promise((resolve,reject) => {
    axios.defaults.headers.common['Authorization'] = token
    axios.post(`api/user/logout/`)
        .then((response) => {
            axios.defaults.headers.common['Authorization'] = "";
            resolve(response.data)})
        .catch(e=>reject(logError(e)))//response.data.message?
})

//Question APIs
//GET question
export const getQuestion = (id: number) => 
    new Promise((resolve,reject) => {
        axios.get(`api/question/${id}/`)
            .then(response => resolve(response.data))
            .catch(e=>reject(logError(e)))
    }
)

export const getQuestionsOfUser = (id: string, sorted_by: string, page = 1) => 
    new Promise((resolve,reject) => {
        axios.get(`api/question/user/${id}/`, {params:{sorted_by, page}})
            .then(response => resolve(response.data.questions))
            .catch(e=>reject(logError(e)))//FIXME: how to handle status code 301?
    }
)

export const getQuestionsWithTags = (tags: string[], sorted_by: string="newest", page: Number=1, filter_by?: string, user? : Number) => 
    new Promise((resolve,reject) => {
        axios.get(`api/question/tagged/`,
                    {params:{ user, tags:tags.join(' '), filter_by, sorted_by, page}})

            .then(response => resolve(response.data.questions))
            .catch(e=>reject(logError(e)))//FIXME: how to handle status code 301?
    }
)

export const getQuestionsWithKeywords = (keywords: string[], sorted_by: string, page: Number =1, filter_by?: string) => 
    new Promise((resolve,reject) => {
        console.log(keywords, filter_by, sorted_by, page)
        axios.get(`api/question/search/keywords/`,
                    {params:{'keywords':keywords.join(' '), filter_by, sorted_by, page}})
            .then(response => resolve(response.data.questions))
            .catch(e=>reject(logError(e)))//FIXME: how to handle status code 301?
    }
)

//POST question
export const postQuestion = (question: QuestionInterface) => 
    new Promise((resolve,reject) => {
        axios.post(`api/question/`, {data:question})
            .then(response => resolve(response.data))
            .catch(e=>reject(logError(e)))//FIXME: how to handle status code 301?
    }
)

//PUT question
export const editQuestion = (id: number, question: QuestionEditInterface) => 
    new Promise((resolve,reject) => {
        axios.put(`api/question/${id}/`, {data:{question}})
            .then(response => resolve(response.data))
            .catch(e=>reject(logError(e)))//FIXME: how to handle status code 301?
    }
)

//Answer APIs
//GET answer
export const getAnswersOfUser = (id: number, sorted_by: string, page: Number) => 
    new Promise((resolve,reject) => {
        axios.get(`api/answer/user/${id}/`, {params:{page, sorted_by}})
            .then(response => resolve(response.data.answers))
            .catch(e=>reject(logError(e)))
    }
)

export const getAnswersOfQuestion = (id: number, sorted_by: string, page: Number) => 
    new Promise((resolve,reject) => {
        axios.get(`api/answer/question/${id}/`, {params:{page, sorted_by}})
            .then(response => resolve(response.data.answers))
            .catch(e=>reject(logError(e)))
    }
)

export const getAnswer = (id: number) => 
    new Promise((resolve,reject) => {
        axios.get(`api/answer/${id}/`)
            .then(response => resolve(response.data))
            .catch(e=>reject(logError(e)))
    }
)
//POST answer
export const postAnswer = (id: number, content: string) => 
    new Promise((resolve,reject) => {
        axios.post(`api/answer/question/${id}/`, {content:content})
            .then(response => resolve(response.data))
            .catch(e=>reject(logError(e)))
    }
)

export const postAnswerAcceptance = (id: number) => 
    new Promise((resolve,reject) => {
        axios.post(`api/answer/${id}/acception/`)
            .then(response => resolve(response.data))
            .catch(e=>reject(logError(e)))
    }
)
//PUT answer
export const editAnswer = (id: number, content: string) => 
    new Promise((resolve,reject) => {
        axios.put(`api/answer/${id}/`,{content:{content}})
            .then(response => resolve(response.data))
            .catch(e=>reject(logError(e)))
    }
)
//DELETE answer
export const deleteAnswer = (id: number) => 
    new Promise((resolve,reject) => {
        axios.delete(`api/answer/${id}/`)
            .then(response => resolve(response.data))
            .catch(e=>reject(logError(e)))
    }
)

export const deleteAnswerAcceptance = (id: number) => 
    new Promise((resolve,reject) => {
        axios.delete(`api/answer/${id}/acception/`)
            .then(response => resolve(response.data))
            .catch(e=>reject(logError(e)))
    }
)

//Comment APIs
//GET comment
export const getComment = (id: number) => 
    new Promise((resolve,reject) => {
        axios.get(`api/comment/${id}`)
            .then(response => resolve(response.data))
            .catch(e=>reject(logError(e)))
    }
)
export const getCommentsOfAnswer = (id: number, page: Number) => 
    new Promise((resolve,reject) => {
        axios.get(`api/comment/answer/${id}/?page=${page}`)
            .then(response => resolve(response))
            .catch(e=>reject(logError(e)))
    }
)
export const getCommentsOfQuestion = (id: number, page: Number) => 
    new Promise((resolve,reject) => {
        axios.get(`api/comment/question/${id}`)
            .then(response => resolve(response.data.comments))
            .catch(e=>reject(logError(e)))
    }
)
//POST comment
export const commentOnQuestion = (question_id: number, content: String) => 
    new Promise((resolve,reject) => {
        axios.post(`api/comment/question/${question_id}/`, {data:{content}})
            .then(response => resolve(response.data))
            .catch(e=>reject(logError(e)))
    }
)
export const commentOnAnswer = (answer_id: number, content: String) => 
    new Promise((resolve,reject) => {
        axios.post(`api/comment/answer/${answer_id}/`, {data:{content}})
            .then(response => resolve(response.data))
            .catch(e=>reject(logError(e)))
    }
)
//PUT comment
export const editComment = (id: number, comment: string) => 
    new Promise((resolve,reject) => {
        axios.put(`api/comment/${id}/`, {data:{comment}})
            .then(response => resolve(response.data))
            .catch(e=>reject(logError(e)))
    }
)
//DELETE comment
export const deleteComment = (id: number) => 
    new Promise((resolve,reject) => {
        axios.delete(`api/comment/${id}/`)
            .then(response => resolve(response.data))
            .catch(e=>reject(logError(e)))
    }
)
//Rate APIs
//PUT rate
export const rateQuestion = (id: number, rating: number) => 
    new Promise((resolve,reject) => {
        axios.put(`api/rate/question/${id}/`, {data:{rating}})
            .then(response => resolve(response.data))
            .catch(e=>reject(logError(e)))
    }
)
export const rateAnswer = (id: number, rating: number) => 
    new Promise((resolve,reject) => {
        axios.put(`api/rate/answer/${id}/`, {data:{rating}})
            .then(response => resolve(response.data))
            .catch(e=>reject(logError(e)))
    }
)
export const rateComment = (id: number, rating: number) => 
    new Promise((resolve,reject) => {
        axios.put(`api/rate/comment/${id}/`, {data:{rating}})
            .then(response => resolve(response.data))
            .catch(e=>reject(logError(e)))
    }
)

//Bookmark APIs
//GET bookmark
export const getBookmarks = (sorted_by: string, page: Number) => 
    new Promise((resolve,reject) => {
        axios.get(`api/bookmark/user/me/`, {params:{sorted_by, page}})
            .then(response => resolve(response.data.questions))
            .catch(e=>reject(logError(e)))
    }
)
export const getBookmarksOfUser = (id: number, sorted_by: string, page: Number) => 
    new Promise((resolve,reject) => {
        axios.get(`api/bookmark/user/${id}/`, {params:{sorted_by, page}})
            .then(response => resolve(response.data.questions))
            .catch(e=>reject(logError(e)))
    }
)
//POST bookmark
export const addBookmark = (question_id: number) => 
    new Promise((resolve,reject) => {
        axios.post(`api/bookmark/question/${question_id}/`)
            .then(response => resolve(response.data))
            .catch(e=>reject(logError(e)))
    }
)
//DELETE bookmark
export const deleteBookmark = (id: number) => 
    new Promise((resolve,reject) => {
        axios.delete(`api/bookmark/question/${id}/`)
            .then(response => resolve(response.data))
            .catch(e=>reject(logError(e)))
    }
)
//Tag APIs
//GET tag
export const getTagsOfUser = (id: number, sorted_by: string, page : Number) => 
    new Promise((resolve,reject) => {
        axios.get(`api/tag/user/${id}/`, {params:{sorted_by, page}})
            .then(response => resolve(response.data.tags))
            .catch(e=>reject(logError(e)))
    }
)
export const getTags = (search: string, sorted_by: string, page : Number) => 
    new Promise((resolve,reject) => {
        const params = search? {search, sorted_by, page}: {sorted_by, page}
        axios.get(`api/tags/`, {params})
            .then(response => resolve(response.data.tags))
            .catch(e=>reject(logError(e)))
    }
)