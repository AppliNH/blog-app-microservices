const express = require("express");
const bodyParser = require("body-parser");
const axios = require("axios");

const app = express();
app.use(bodyParser.json());

app.post('/events', async (req, res) => {

    const {type, data} = req.body;

    console.log("Event : ", type);

    switch (type) {
        case 'CommentCreated': {
            const status = data.content.includes('loser') ? 'rejected' : 'approved';
            const {id, postId, content} = data;
            
            // Dispatching moderation decision to event bus.
            await axios.post(
                'http://event-bus-service:4005/events',
                {
                    type:"CommentModerated",
                    data: {
                        id,
                        postId,
                        status,
                        content
                    }
                }
            )
            break;
        }
            
            
    
        default:
            console.warn("Unknown event :", type)
            break;
    }

    res.send({});

});

app.listen(4003, () => {
    console.log("Runnin' on port 4003");
});