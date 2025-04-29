const express = require('express')
const utils = require('../utils')
const db = require('../db')
const { request } = require('http')
const { error } = require('console')

const router = express.Router()

router.post('/',(request,response)=>{
    const{categoryId,       
        title,       
        details,      
         address,          
         contactNo,       
        ownerName,        
         isLakeView,      
         isTV,            
         isAC,             
         isWifi,           
         isMiniBar,        
         isBreakfast,      
         isParking,        
         guests,           
         bedrooms,         
         beds,            
         bathrooms,        
         rent,
        profileImage } = request.body 
         const statememt = `INSERT INTO property (categoryId,title,details,address,contactNo,ownerName,isLakeView,isTV,isAC,isWifi,isMiniBar,isBreakfast,isParking,guests,bedrooms,beds,bathrooms,rent) VALUES(?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)`
        db.query(
            statememt,
            [categoryId,title,details,address,contactNo,ownerName,isLakeView,isTV,isAC,isWifi,isMiniBar,isBreakfast,isParking,guests,bedrooms,beds,bathrooms,rent],
            (error,data)=>{
                response.send(utils.createResult(error,data))
            }
        )
})

//read operations 
router.get('/',(request,response)=>{
    const statememt = `SELECT id,title,details,rent,profileImage FROM property`
    db.query(
        statememt,
        (error,data)=>{
            response.send(utils.createResult(error,data))
        }
    )
})

//raed prop by id
router.get('/:id',(request,response)=>{
    //const id = 
    const statememt = `SELECT * FROM property WHERE id = ?`
    db.query(
        statememt,
        [request.params.id],
        (error,data)=>{
            response.send(utils.createResult(error,data))
        }
    )
})

//Update Opertaions
router.put('/',(request,response)=>{
    const statememt = `UPDATE property SET categoryId =?,title=?,details=?,address=?,contactNo=?,ownerName=?,isLakeView=?,isTV=?,isAC=?,isWifi=?,isMiniBar=?,isBreakfast=?,isParking=?,guests=?,bedrooms=?,beds=?,bathrooms=?,rent=? WHERE id = ?`
    db.query(
        statememt,
        [request.body.categoryId,request.body.title,request.body.details,request.body.address,request.body.contactNo,request.body.ownerName,request.body.isLakeView,request.body.isTV,request.body.isAC,request.body.isWifi,request.body.isMiniBar,request.body.isBreakfast,request.body.isParking,request.body.guests,request.body.bedrooms,request.body.beds,request.body.bathrooms,request.body.rent,request.headers.id],
        (error,data)=>{
            response.send(utils.createResult(error,data))
        }
    )
})

router.delete('/:id',(request,response)=>{
    const id = request.params.id
    const statememt = `DELETE FROM property WHERE id=?`
    db.query(
        statememt,
        [id],
        (error,data)=>{
            response.send(utils.createResult(error,data))
        }
    )
})
module.exports = router

