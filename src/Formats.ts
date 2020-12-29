//this file './Formats' maps elements into objects that can be used as data in axos requests/responses
//however notice that some functions return the same object, and is technically unnecessary
//I added them just to match formats of other datas

//objects for User
export const User = (picture:string = "", nickname : string, email : string, password: string, username : string
) => {
    return ({
        "picture": picture === "" ? null : picture,
        "nickname": nickname,
        "email" : email,
        "password": password,
        "username": username
    })
}

export interface UserInterface {
    "picture": string,
    "nickname": string,
    "email" : string,
    "password": string,
    "username": string,
    "title": string,
    "intro": string
}

export const UserEdit = (picture:string="", nickname:string="", password:string="") => {
    return ({
        "picture": picture === "" ? null : picture ,
        "nickname":  nickname === "" ? null : nickname,
        "password":  password === "" ? null : password
    })
}

export interface UserEditInterface {
    "picture"?: string,
    "nickname"?:  string,
    "password"?:  string
}

export const Login_info = (password : string, username:string) => {

    return ({
        "password" : password,
        "username" : username
    })
}

export interface LoginInfoInterface {
    "password" : string,
    "username" : string
}

//objects for Questions
export const Question = (title:string, content :string, tags : string[]) => {
    return ({
        "title" : title,
        "content" : content,
        "tags" : tags
    })
}

export interface QuestionInterface {
    "title" : string,
    "content" : string,
    "tags" : string[]
}

export const QuestionEdit = (title:string = "", content : string = "", tags: string[] = []) => {
    return ({
        "title" : title === "" ? null : title,
        "content" : content === "" ? null : content,
        "tags" : tags === []? null : tags
    })
}

export interface QuestionEditInterface {
    "title"? : string
    "content"? : string
    "tags"? : string[]
}