const express = require('express')
const jwt = require('jsonwebtoken')
const cors = require('cors')
const config = require('./config')
const utils = require('./utils')
const app = express()

app.use(cors())
app.use(express.json())

app.use((request,response,next)=>{
    if(
        request.url === '/users/login' ||
        request.url === '/users/registration' ||
        request.url.startsWith('./image/')
    ){
        next()
    }else{
        const token = request.headers.token
        if(token){
            try{
                const payload = jwt.verify(token,config.secret)
                request.headers.id = payload.id
                next()
            }catch(error){
                response.send(utils.createErrorResult('Token is Invalid'))
            }
        }else{
            response.send(utils.createErrorResult('Token is Missing'))
        }
        // else{
        //     const authtoken = request.headers.authorization;
        //     const token = authtoken.split('')[1];
        //     console.log("$",token)
    
        //     if(!token || token.length == 0 ){
        //         response.send(utils.createErrorResult('Missing token'))
        //     }else{
        //         try{
        //             const payload = jwt.verify(token,config.secret)
    
        //             console.log('##',payload[id]);
    
        //             request.userId = payload['id']
    
    
        //             next()
    
    
    
        //         }catch(ex){
        //             response.send(utils.createErrorResult('Invalid Token'))
        //         }
        //     }

    }

})
//declaring routes
const userRouter = require('./routes/user')
const propertyRouter = require('./routes/property')
const bookingRouter = require('./routes/booking')
const categoryRouter = require('./routes/category')


//middlewares
app.use('/users',userRouter)
app.use('/property',propertyRouter)
app.use('/booking',bookingRouter)
app.use('/category',categoryRouter)
app.use(express.static('./images'))


app.listen( 4000, '0.0.0.0', ()=>{
    console.log('Server started on port 4000')
})