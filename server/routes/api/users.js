const express = require('express');
const mongodb = require('mongodb');

const router = express.Router();

//Get Users
router.get('/', async (req, res) => {
    const tasks = await loadUsersCollection();
    res.send(await tasks.find({}).toArray());
});

//Add User
router.post('/', async (req, res) => {
    const tasks = await loadUsersCollection();
    await tasks.insertOne({
        name: req.body.name,
        email: req.body.email,
        password: req.body.password,
        dateCreated: new Date()
    });
    res.status(201).send();
});

//Delete User
router.delete('/:id', async (req, res) => {
    const tasks = await loadUsersCollection();
    await tasks.deleteOne({_id: new mongodb.ObjectID(req.params.id)});
    res.status(200).send();
});

async function loadUsersCollection() {
    const client = await mongodb.MongoClient.connect('mongodb+srv://Senrith:1234@senrith.czumf.gcp.mongodb.net/my_tasklist?retryWrites=true&w=majority', {useNewUrlParser: true});
    return client.db('users').collection('users');
}

module.exports = router;