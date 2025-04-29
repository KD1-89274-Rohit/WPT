const express = require('express')
const jwt = require('jsonwebtoken')
const config = require('../config')
const utils = require('../utils')
const crypto = require('crypto-js')
const db = require('../db')
const { request } = require('http')
const { error } = require('console')
const { userInfo } = require('os')
//const pool = require('./db')
// const { request } = require('http')
// const { error } = require('console')
// const { util } = require('undici-types')

const router = express.Router()


router.post('/registration',(request,response)=>{
    const { firstName, lastName, email, password, phone} = request.body //destructuring
    const statement = `INSERT INTO user (firstName, lastName, email, password, phoneNumber) VALUES(?,?,?,?,?)`
    const encryptedPassword = String(crypto.SHA256(password))
    db.query(
        statement,
        [firstName, lastName, email, encryptedPassword, phone],
        (error,data)=>{
            response.send(utils.createResult(error,data))
        }
    )
})

// router.post('/login',(request,response)=>{
//     const { email, password} = request.body
//     const encryptedPassword = String(crypto.SHA256(password))
//     const statement = `SELECT * FROM user WHERE email= ? AND password=?` // select * from user at beging of project and later keep field as required
//     db.query(
//         statement,
//         [email,encryptedPassword],
//         (error,data)=>{
//             if(data){
//                 if(data.length!=0){
//                     const payload = {
//                         id: data[0].id//add all fields in table and choose which field to keep at end of project completion
//                     }
//                     const token = jwt.sign(payload,config.secret)
//                     const userData = {
//                         firstName: data[0].firstName,
//                         lastName: data[0].lastName,
//                         email: data[0].email,
//                         token : token,
//                         phoneNumber: data[0].phoneNumber
//                     }
//                     response.send(utils.createSuccessResult(userData))
//                 }else{
//                     response.send(utils.createErrorResult('Invalid email or password'))
//                 }
                
//             }else
//             response.send(utils.createErrorResult(error))
//         })
// })

router.post('/login',(request,response)=>{
    const { email, password} = request.body
    const encryptedPassword = String(crypto.SHA256(password))
    const statement = `SELECT * FROM user WHERE email= ? AND password=?`
    db.query(
        statement,
        [email,encryptedPassword],
        (error,users)=>{
            if(error){
                response.send(utils.createErrorResult(error))//if error in db file mysql configaration and details
            }else{
                if(users.length ==0){
                    response.send(utils.createErrorResult('User does not exist'))
                }else{
                    const user = users[0]
                    if(user.isDeleted){
                        response.send(utils.createErrorResult('your account is closed'))
                    }else{
                        //create the payload
                        console.log("#",user.id)
                        const payload = {
                            id: user.id
                        }
                        const token = jwt.sign(payload,config.secret)
                        const userData = {
                            token,
                            name: `${user['firstName']} ${user['lastName']}`
                        }
                        response.send(utils.createSuccessResult(userData))
                    }
                }
            }
        }
    )
})


router.get('/profile',(request,response)=>{
    const statememt = `SELECT * FROM user WHERE id =?`
    db.query(
        statememt,
        [request.headers.id],
        (error,data)=>{
            response.send(utils.createResult(error,data))
        }
    )
})

router.put('/profile',(request,response)=>{
    const statememt = `UPDATE user SET firstName =? WHERE id =?`
    db.query(
        statememt,
        [request.body.firstName,request.headers.id],
        (error,data)=>{
            response.send(utils.createResult(error,data))
        }
    )
})

module.exports = router



