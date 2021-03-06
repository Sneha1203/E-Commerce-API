// console.log('E-Commerce API');
require('dotenv').config()
require('express-async-errors')

const express = require('express')
const app = express()

// other packages
const morgan = require('morgan')
const cookieParser = require('cookie-parser')
const cors = require('cors')

// databse connection
const connectDB = require('./db/connect')

// routers
const authRouter = require('./routes/authRoutes')
const userRouter = require('./routes/userRoutes')

// middleware
const notFoundMiddleware = require('./middleware/not-found')
const errorHandlerMiddleware = require('./middleware/error-handler')

app.use(morgan('tiny'))
app.use(express.json())
app.use(cookieParser(process.env.JWT_SECRET))
// app.use(express.static('./public'))
app.use(cors())


// routes
app.get('/', (request, response) => {
    response.send('E-Commerce API')
})

app.get('/api/v1', (request, response) => {
    // console.log(request.cookies)
    console.log(request.signedCookies)
    response.send('E-Commerce API')
})

app.use('/api/v1/auth', authRouter)
app.use('/api/v1/users', userRouter)


app.use(notFoundMiddleware)
app.use(errorHandlerMiddleware)


const port = process.env.PORT || 5000

const start = async() => {
    try {
        await connectDB(process.env.MONGO_URL)
        app.listen(port, () => {
            console.log(`Server is listening on port ${port}`)
        })
    } catch(error) {
        console.log(error)
    }
    
}

start()
