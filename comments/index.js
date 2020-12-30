const express = require('express');
const bodyParser = require('body-parser')
const { randomBytes } = require("crypto");
const cors = require('cors');
const axios = require('axios');



const app = express();

// Parse the body of incoming request to JSON
app.use(bodyParser.json());
app.use(cors());

// Store comments by post's id here for now
const commentsByPostId = {}

app.get('/posts/:id/comments', (req, res) => {

    res.send(commentsByPostId[req.params.id] || []);

});


app.post('/posts/:id/comments', async (req, res) => {

    const commentId = randomBytes(4).toString('hex');
    const {content} = req.body;

    // if commentsByPostId[req.params.id] is undefined, return an empty array
    const comments = commentsByPostId[req.params.id] || [];

    comments.push({id: commentId, content, status: "pending"});

    commentsByPostId[req.params.id] = comments;

    // Dispatch event to event bus
    await axios.post(
        'http://event-bus-service:4005/events',
        {
            type: "CommentCreated",
            data: {
                id:commentId, 
                content, 
                postId: req.params.id,
                status: "pending"
            }
        }
    )

    res.status(201).send(comments);

});

app.post('/events', async (req, res) => {



    const {type, data} = req.body;

    switch (type) {
        case 'CommentModerated':{

            const {id, postId, status, content} = data;
            const comments = commentsByPostId[postId];
            
            const comment = comments.find(c => c.id === id);
            comment.status = status;

            // Dispatching the confirmation of comment update
            await axios.post(
                'http://event-bus-service:4005/events',
                {
                    type: "CommentUpdated",
                    data: {
                        id, 
                        content, 
                        postId,
                        status
                    }
                }
            )

            break;
        }
            
            
    
        default:
            break;
    }

    res.send({});

});


app.listen(4001, () => {
    console.log("Runnin' on port 4001")
});