require('dotenv').config();
require('express-async-errors');
const express = require('express');
const connectDB = require('./db/connect');

//Routers
const studentRouter = require('./routes/students')

const app = express();

//Middleware
const errorHandlerMiddleware = require('./middleware/error-handler');

app.get('/', (req, res) => {
    res.send('Attendance Form')
})

app.use('/api/v1/students', studentRouter)

app.use(errorHandlerMiddleware);

const port = process.env.PORT || 5000;

const start = async () => {
    try {
        await connectDB(process.env.MONGO_URI);
        app.listen(port, () => console.log(`Sever is listening at port ${port}....`))
    } catch (error) {
        console.log(error)
    }
}  
start();