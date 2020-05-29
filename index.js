const express = require('express')
const app = express()
app.use(express.json())

let persons = [
    {
        "name": "Arto Hellas",
        "number": "040-123456",
        "id": 1
    },
    {
        "name": "Ada Lovelace",
        "number": "39-44-5323523",
        "id": 2
    },
    {
        "name": "Dan Abramov",
        "number": "12-43-234345",
        "id": 3
    },
    {
        "name": "Mary Poppendieck",
        "number": "39-23-6423122",
        "id": 4
    }
]




app.get('/', (req, res) => {
    res.send('<h1>Hello World!</h1>')
})

app.get('/api/persons', (req, res) => {
    res.json(persons)
})

app.get('/api/persons/:id', (request, response) => {
    const id = Number(request.params.id)
    //console.log(id)

    const person = persons.find(person => person.id === id)
    //console.log(person)

    if (person === undefined) {
        response.json(person)
    } else {
        response.status(404).end()
    }

})

app.get('/info', (req, res) => {
    const personCount = persons.length
    console.log(personCount);
    const date = new Date()
    res.send(`<div><p>Phonebook has info of ${personCount} persons</p> <p>${date}</p></div>`)
})

const generateId = () => {
    return Math.floor(Math.random() * 100)
}

app.post('/api/persons', (request, response) => {
    const body = request.body
    const personName = persons.find(person => person.name === body.name)

    if (!body.name) {
        return response.status(400).json({
            error: 'name missing'
        })
    } else if (!body.number) {
        return response.status(400).json({
            error: 'number missing'
        })
    } else if (body.name === personName) {
        return response.status(400).json({
            error: 'name must be unique'
        })
    }
    const person = {
        name: body.name,
        number: body.number,
        id: generateId()
    }
    persons = persons.concat(person)
    response.json(person)
})




app.delete('/api/persons/:id', (request, response) => {
    const id = Number(request.params.id)
    persons = persons.filter(person => person.id !== id)
    response.status(204).end()
})


const PORT = 3001
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})