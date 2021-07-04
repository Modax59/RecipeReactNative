import client from './client'

const login = (email, password) => client.post('/login_check',{username: email, password})

const refresh = (refresh_token) => client.post('/token/refresh', refresh_token)




export default {
    login,refresh
}