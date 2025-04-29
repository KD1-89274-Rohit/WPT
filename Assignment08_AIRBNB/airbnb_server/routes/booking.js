const express = require('express')
const db = require('../db')
//const { request } = require('http')
const utils = require('../utils')
const { request } = require('http')

const router = express.Router()

router.post('/',(request,response)=>{
    const{propertyId,id, total, fromDate, toDate} = request.body
    const statememt = `INSERT INTO bookings (propertyId,userId,total,fromDate,toDate) VALUES(?,?,?,?,?)`
    db.query(
        statememt,
        [propertyId,request.headers.id,total,fromDate,toDate],
        (error,data)=>{
            response.send(utils.createResult(error,data))
        }
    )
})

router.get('/',(request,response)=>{
    const statememt = `SELECT * FROM bookings`
    db.query(
        statememt,
        (error,data)=>{
            response.send(utils.createResult(error,data))
        }
    )
})

module.exports = router