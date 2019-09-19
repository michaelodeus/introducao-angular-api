const express = require('express');
const cors = require('cors');

//Iniciando o App
const app = express();
app.use(express.json());
app.use(cors());

var peoples = [
    {
        id: 1,
        name: "Michael Oliveira de Deus",
        age: 24,
        profession: "Developer",
        createdAt: new Date().toISOString()
    },
    {
        id: 2,
        name: "Pedro Henrique",
        age: 30,
        profession: "Medico",
        createdAt: new Date().toISOString()
    },
    {
        id: 3,
        name: "Carlos Chavier Doido",
        age: 20,
        profession: "Armengueiro de Software",
        createdAt: new Date().toISOString()
    },
    {
        id: 4,
        name: "João Ferreira",
        age: 19,
        profession: "Programador Orientado a Gambiarra",
        createdAt: new Date().toISOString()
    }
]

app.post('/api/peoples', (req, res) => {
    let idGerado = peoples.length;
    let people = { ...req.body, id: ++idGerado, createdAt: new Date().toISOString() };

    peoples.push(people);

    res.json(people);
});

app.get('/api/peoples', (req, res) => {
    res.json(peoples)
});

app.get('/api/peoples/:id', (req, res) => {
    let people = peoples.find(p => p.id == req.params.id);
    res.json(people)
});

app.put('/api/peoples/:id', (req, res) => {
    //Pega o objeto do array
    let people = peoples.find(p => p.id == req.params.id);

    //Pega o indice do objeto no array
    let indexPeople = peoples.findIndex(p => p.id == req.params.id);

    //Remove o objeto do array
    peoples.splice(indexPeople, 1);

    let newPeople = { ...people, ...req.body };

    peoples.push(newPeople);

    res.json(newPeople);

});

app.delete('/api/peoples/:id', (req, res) => {
    let people = peoples.find(p => p.id == req.params.id);

    let indexPeople = peoples.findIndex(p => p.id == req.params.id);
    peoples.splice(indexPeople, 1);
    res.json(people)
})

app.listen(8000);