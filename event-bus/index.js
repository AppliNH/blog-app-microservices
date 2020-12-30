const express = require("express");
const bodyParser = require("body-parser");
const axios = require('axios');


const app = express();
app.use(bodyParser.json());

const events = [];

app.post('/events', async (req,res) => {

    const event = req.body;

    console.log("Event : ",event.type);

    events.push(event);
    try {
        await axios.post('http://posts-clusterip-service:4000/events', event);
    } catch (error) {
        //console.warn(error);
    }

    try {
        await axios.post('http://comments-clusterip-service:4001/events', event);
        
    } catch (error) {
        
    }

    try {
        await axios.post('http://query-clusterip-service:4002/events', event);

    } catch (error) {
        
    }

    try {
        await axios.post('http://moderation-clusterip-service:4003/events', event);
        
    } catch (error) {
        
    }

    
    


    res.send({status: 'OK'})
});

// Allows other services to get in sync with all previous events they might have missed
// due to a disconnection, temporary network error, or just because they weren't born yet.
app.get('/events', (req, res) => {
    res.send(events);
});


app.listen(4005, () => {
    console.log("Event bus on 4005");
})