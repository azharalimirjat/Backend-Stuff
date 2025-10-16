const express = require('express');

const { logReqRes } = require('./middlewares');
const {connectMongoDB} = require('./connection');
const userRouter = require('./routes/user');

const app = express();
const PORT = 8000;

connectMongoDB('mongodb://localhost:27017/youtube-app')
.then(() => {
    console.log('MongoDB Connected!')
})

app.use(express.urlencoded({ extended: false }));


app.use(logReqRes('log.txt'));
app.use((req, res, next) => {});

// Routes
app.use('/api/users', userRouter);

app.listen(PORT, () => {
    console.log("Server Started! at PORT:",PORT);
});