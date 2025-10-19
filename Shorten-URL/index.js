const express = require('express');
const urlRouter = require('./routes/url');
const URL = require('./models/url')

const { connectToMongoDB , } = require('./connect');

const app = express();
const PORT = 8001;

connectToMongoDB('mongodb://localhost:27017/shorten-url')
.then(() => console.log('Connected to MongoDB.'));

app.use(express.json());
app.use(express.urlencoded({ extended: true })); 


app.use('/url', urlRouter);

app.get('/:shortId', async (req, res) =>    
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

app.listen(PORT, () => console.log('Server Started!'));