const exp = require('express')
const postsAPI = exp.Router()

postsAPI.use(exp.json())

module.exports = postsAPI