const express = require('express')
const multer = require('multer')
const mysql = require('mysql2')
const db = require('../db')
const utils = require('../utils')
const { error } = require('console')
const { statSync } = require('fs')
const app = express()
const upload = multer({dest: "images"})

const router = express.Router()

router.get('/',(request,response)=>{
    const statememt = `SELECT id, title, details, image from category`
    db.query(
        statememt,
        (error,categories)=>{
            response.send(utils.createResult(error,categories))
        }
    )
})

router.post('/',upload.single('icon'),(request,response)=>{
    const {title , details} = request.body
    const fileName = request.file.filename
    const statememt = `INSERT INTO category (title,details, image) VALUES(?,?,?)` 
    db.query(
        statememt,
        [title,details,fileName],
        (error,categories)=>{
            response.send(utils.createResult(error,categories))
        }
    )
})

module.exports = router