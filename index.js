// implement your API here
const express = require("express");

const db = require('./data/db.js');

const server = express();

server.use(express.json());

server.listen(4000, () => {
  console.log("\n** API up and running on port 4k **");
})

server.get('/', (req,res) => {
  res.send('Are you ready for combat?');
})

server.get('/api/users', (req,res) => {
  db.find()
  	.then(users => {
      res.status(200).json(users)
    })
    .catch(error => {
      res.status(500).json({ error: "The users information could not be retrieved." })
    })
})

server.post('/api/users', (req,res) => {
  const { name, bio } = req.body;

  if ( !name || !bio ) {
    res.status(400)
      .json({ errorMessage: "Please provide name and bio for the user." })
  } else {
    db.insert({ name, bio })
      .then(users => {
        res.status(200).json(users)
      })
      .catch(error => {
        res.status(500).json({ error: "There was an error while saving the user to the database" })
    })
  }
})

server.get('/api/users/:id', (req,res) => {
  const { id } = req.params;

  db.findById(id)
    .then(user => {
      if (user) {
        res.status(200).json(user)
      } else {
        res.status(404).json({ message: "User not found." })
      }
    })
    .catch(error => {
      res.status(500).json({
        message: "Error retrieving user?"
      })
    })
})

server.put('/api/users/:id', (req,res) => {
  const { id } = req.params;
  const { name, bio } = req.body;

  if ( !name || !bio ) {
    res.status(400)
      .json({ errorMessage: "Please provide name and bio for the user." })
  } else {
    db.update(id, { name, bio })
      .then(user => {
        if (user) {
          res.status(200).json(user)
        } else {
          res.status(404).json({ message: "The user with the specified ID does not exist." })
        }
      })
      .catch(error => {
        res.status(500).json({ error: "The user information could not be modified." })
      })
    }
})

server.delete('/api/users/:id', (req,res) => {
  const { id } = req.params;

  db.remove(id)
    .then(user => {
      if (user) {
        res.status(206).json(user)
      } else {
        res.status(404).json({ message: "The user with the specified ID does not exist." })
      }
    })
    .catch(error => {
      res.status(500).json({ error: "The user could not be removed." })
    })
})