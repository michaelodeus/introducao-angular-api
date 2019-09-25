const express = require('express');
const cors = require('cors');

//Iniciando o App
const app = express();
app.use(express.json());
app.use(cors());

var pessoas = [
    {
        id: 1,
        nome: "Michael Oliveira de Deus",
        idade: 24,
        pofissao: "Developer",
        criado: new Date().toISOString()
    },
    {
        id: 2,
        nome: "Pedro Henrique",
        idade: 30,
        pofissao: "Medico",
        criado: new Date().toISOString()
    },
    {
        id: 3,
        nome: "Carlos Chavier Doido",
        idade: 20,
        pofissao: "Armengueiro de Software",
        criado: new Date().toISOString()
    },
    {
        id: 4,
        nome: "João Ferreira",
        idade: 19,
        pofissao: "Programador Orientado a Gambiarra",
        criado: new Date().toISOString()
    }
]

app.post('/api/pessoas', (req, res) => {
    let idGerado = pessoas.length;
    let pessoa = { ...req.body, id: ++idGerado, criado: new Date().toISOString() };

    pessoas.push(pessoa);

    res.json(pessoa);
});

app.get('/api/pessoas', (req, res) => {
    res.json(pessoas)
});

app.get('/api/pessoas/:id', (req, res) => {
    let pessoa = pessoas.find(p => p.id == req.params.id);
    res.json(pessoa)
});

app.put('/api/pessoas/:id', (req, res) => {
    //Pega o objeto do array
    let pessoa = pessoas.find(p => p.id == req.params.id);

    //Pega o indice do objeto no array
    let indexpessoa = pessoas.findIndex(p => p.id == req.params.id);

    //Remove o objeto do array
    pessoas.splice(indexpessoa, 1);

    let newpessoa = { ...pessoa, ...req.body };

    pessoas.push(newpessoa);

    res.json(newpessoa);

});

app.delete('/api/pessoas/:id', (req, res) => {
    let pessoa = pessoas.find(p => p.id == req.params.id);

    let indexpessoa = pessoas.findIndex(p => p.id == req.params.id);
    pessoas.splice(indexpessoa, 1);
    res.json(pessoa)
})

app.listen(8000);