const express = require('express');
const bodyParser = require('body-parser')
const { randomBytes } = require("crypto");
const cors = require("cors");
const axios = require("axios");

const app = express();

// Parse the body of incoming request to JSON
app.use(bodyParser.json());
app.use(cors());

// Store posts here for now
const posts = {}

// app.get('/posts/create', (req, res) => {
//     res.send(posts);
// });


app.post('/posts/create', async (req, res) => {

    const id = randomBytes(4).toString("hex");
    const {title} = req.body;

    posts[id] = {
        id, title
    };

    res.status(201).send(posts[id]);

    // Dispatch event to event bus
    await axios.post(
        'http://event-bus-service:4005/events',
        {
            type:'PostCreated',
            data: {
                id, title
            }
        }
    );

});

app.post('/events', (req, res) => {

    const event = req.body;
    console.log("Received event: ", event.type);

    res.send({});

});

app.listen(4000, () => {
    console.log("Runnin' on port 4000")
});