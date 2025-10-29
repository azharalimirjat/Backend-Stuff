const express = require('express');
const urlRouter = require('./routes/url');
const URL = require('./models/url')
const path = require('path');
const staticRoute = require('./routes/staticRouter');
const cookieParser = require('cookie-parser');

const userRoute = require('./routes/user');

const { connectToMongoDB , } = require('./connect');
const { restrictToLoggedInUserOnly, checkAuth} = require('./middlewares/auth');

const app = express();
const PORT = 8001;

connectToMongoDB('mongodb://localhost:27017/shorten-url')
.then(() => console.log('Connected to MongoDB.'));

app.set('view engine', 'ejs');
app.set('views', path.resolve('./views'));

app.use(express.json());
app.use(express.urlencoded({ extended: false })); 
app.use(cookieParser());


app.use('/url', restrictToLoggedInUserOnly ,urlRouter);
app.use('/user', userRoute);
app.use('/', checkAuth ,staticRoute);

app.get('/url/:shortId', async (req, res) =>    
    {
        const shortId = req.params.shortId;
        entry = await URL.findOneAndUpdate(
        {
            shortId
        },
        {
            $push: {
                visitHistory: {
                    timestamp: Date.now(),
                },
            }
        });

    res.redirect(entry.redirectURL);
});

app.listen(PORT, () => console.log('Server for Shorten URL Started!'));