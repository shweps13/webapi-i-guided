// import express from 'express'
const express = require('express');

const hubsModel = require('./data/hubs-model.js');  // <<< imported data 

// remember to install express 'npm i express'
const server = express();

//teach express json
server.use(express.json());

server.get('/', (req, res) => {
        // order matters, the first argument is the request
        res.send('hello world');
})

server.get('/hubs', (req, res) => {
    // get a list of hubs from the database
    hubsModel.find()
    .then(hubs => {
        // send the list of hubs to the client
        res.send(hubs);
    }).catch(error => {
        res.send(error)
    });

});

// add a hub
server.post('/hubs', (req, res) => {
    //
    // get the hub data from the request
    const hubData = req.body;
    console.log('hubData', hubData)
    //add the hub to the database
    hubsModel
    .add(hubData)
    .then(hub => {
        res.json(hub); //.json() will set the right headers and convert to JSON
    })
    .catch(error => {
        res.json({message: `error saving the hub ${error}`})
    });
})

// removing hubs
server.delete('/hubs/:id', (req, res) => {
    // axios.delete('/hubs/3')
    // get the hub data from the request
    const id = req.params.id;

    console.log("ID", id)
    
    hubsModel.remove(id)
    .then(hub => {
        res.json(hub);
    })
    .catch(error => {
        res.json({message: `error deleting the hub ${error}`})
    });
})


const port = 8000;
server.listen(port, () => console.log(`\n** API on port ${port} is working`))

//run server with  "npm run server" or "yarn server"
//visit or check 'http://localhost:8000/'