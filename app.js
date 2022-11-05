require('dotenv').config();
require('express-async-errors');
const express = require('express');
const connectDB = require('./db/connect');
const cors = require('cors');

//Routers
const studentRouter = require('./routes/students');
const courseRouter = require('./routes/course');
const authRouter = require('./routes/auth');

const app = express();

//Middleware
const errorHandlerMiddleware = require('./middleware/error-handler');
const authenticationMiddleware = require('./middleware/authenticationMiddleware');

app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
    res.send('Attendance Form')
})


app.use('/api/v1/auth', authRouter);
app.use(authenticationMiddleware);
app.use('/api/v1/students', studentRouter);
app.use('/api/v1/course', courseRouter);


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