const { response } = require('express');
const express = require('express');
require('dotenv').config()
require('./models/db');
const userRouter = require('./routes/user')

const app = express();

const User = require('./models/user')

app.use(express.json());
app.use(userRouter);

app.get('/test', (request, response) => {
    response.send('hello world')
})

app.get('/', (request, response) => {

})

app.listen(8000, () => {
    console.log('port is listening');
})