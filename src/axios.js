import axios from 'axios'

baseUrl = BASEURL

function alertErr(error) {
    alert('There is a Problem : error code ' + error.response.status)
}

export  const getUserMe = async () => {
    await axios.get(baseUrl+'/user/me')
        .then((response) => {
            console.log("getUsweMe Request data: ")
            console.log(response.data)
            return response
        })
        .catch(alertErr(error))
}