import axios from 'axios'


export function login(username, password){
    const url_api = process.env.REACT_APP_API_URL
    console.log("process.env", process.env);
    const formdata = new FormData()
    formdata.append('username', username)
    formdata.append('password', password)
    console.log("formdata", formdata);
    console.log("url_api", url_api);
    axios.post(url_api+'/auth/generateToken', formdata,
    {headers: {'Content-Type': 'application/json'}})
      .then(res => {
        console.log("res", res);
        return res.data
      }
        )
      .then(data => {
        console.log(data)
        if (data.token) {
          localStorage.setItem('token', data.token)
          localStorage.setItem('user',  JSON.stringify(data.user))
        }
      })
}

export function logout(){
  localStorage.removeItem('token')
  localStorage.removeItem('user')
    window.location.href = '/login'
}

export function isLogin(){
    if (localStorage.getItem('token')) {
        return true
    }
    return false
    }
export function getUser(){
    if (localStorage.getItem('user')) {
        return JSON.parse(localStorage.getItem('user'))
    }
    return null
    }