//this file './Formats' maps elements into objects that can be used as data in axos requests/responses
//however notice that some functions return the same object, and is technically unnecessary
//I added them just to match formats of other datas

//objects for User
export const User = (picture = "", nickname, email, password, username
) => {
    return ({
        "picture": picture === "" ? null : picture,
        "nickname": user_info.nickname,
        "email" : user_info.email,
        "password": user_info.password,
        "username": user_info.username
    })
}

export const UserEdit = (picture="", nickname="", password="") => {
    return ({
        "picture": picture === "" ? null : picture ,
        "nickname":  nickname === "" ? null : nickname,
        "password":  password === "" ? null : password
    })
}

export const Login_info = (password, username) => {

    return ({
        "password" : password,
        "username" : username
    })
}

//objects for Questions
export const Question = (title, content, tags) => {
    return ({
        "title" : title,
        "content" : content,
        "tags" : tags
    })
}

export const QuestionEdit = (title= "", content = "", tags = "") => {
    return ({
        "title" : title === "" ? null : title,
        "content" : content === "" ? null : content,
        "tags" : tags === "" ? null : tags
    })
}
