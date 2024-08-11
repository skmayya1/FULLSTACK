const express = require('express');
const {PrismaClient} = require('@prisma/client');

const prisma = new PrismaClient();
const app = express();

app.use(express.json());

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
    next();
})

//test
app.get('/test', async (req, res) => {
    res.status(200).json({message: 'Hello World!'});
});

//GETUSERS
app.get('/users', async (req, res) => {
    const users = await prisma.user.findMany();
    res.status(200).json(users);
})

//GET USER BY ID
app.get('/users/:id', async (req, res) => {
    const {id} = req.params;
    const user = await prisma.user.findUnique({where: {id: parseInt(id)}});
    res.status(200).json(user);
}
)

//register
app.post('/register', async (req, res) => {                                           
    const {name, email} = req.body;
    const user = await prisma.user.create({data: {name, email}});
    res.status(201).json(user);
})

//delete
app.delete('/users/delete/:id', async (req, res) => {
    const {id} = req.params;
    await prisma.user.delete({where: {id: parseInt(id)}});
    res.status(204).end();
})

//start server

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
})