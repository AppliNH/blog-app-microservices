const express = require('express');
const bodyParser = require("body-parser");
const axios = require("axios");
const cors = require("cors");

const app = express();
app.use(bodyParser.json());
app.use(cors());

const posts = {}

const handleEvent = (type, data) => {

    console.log("Event :", type)

    switch (type) {
        case 'PostCreated': { // The brackets are necessary here, so the defined variables stay in the scope of the case, instead of the whole switch
            const {id, title} = data;
            posts[id] = {id, title, comments: []};
            break;
        }
        case 'CommentCreated': {
            const {id, content, postId, status} = data;
            posts[postId].comments.push({id, content, status});
            break;
        }

        case 'CommentUpdated': {
            const {id, content, postId, status} = data;
            const post = posts[postId];
            const comment = post.comments.find(c => c.id === id);
            comment.status = status;
            break;
        }
    
        default:
            console.warn("Unknown event : ", type);
            break;
    }

};

app.get('/posts', (req,res) => {

    res.send(posts);

});

app.post('/events', (req,res) => {
    
    const {type, data} = req.body;

    handleEvent(type, data);    

    res.send({});

});

app.listen(4002, async () => {
    console.log("Runnin' on port 4002");
    try {
    
        // Syncing with the event queue / store
        const res = await axios.get(
            'http://event-bus-service:4005/events'
        );

        res.data.forEach(event => {
            console.log("Processing events from queue...")
            const {type, data} = event;
            handleEvent(type, data);
        });

    } catch (error) {
        console.warn(error);
    }
});