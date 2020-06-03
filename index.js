const express = require('express')
//const morgan = require("morgan")
const app = express()

const cors = require('cors')
app.use(cors())

app.use(express.json())
app.use(express.static('build'))

/*morgan.token('id', function (req) {
    return req.name
})*/
//app.use(morgan(':method :url :status :res[content-length] - :response-time ms'))


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

    if (person) {
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
    return Math.floor(Math.random() * 1000)
}

app.post('/api/persons', (request, response) => {
    const body = request.body
    console.log(body);
    const personName = persons.find(person => person.name === body.name)
    console.log(personName);

    if (!body.name) {
        return response.status(400).json({
            error: 'name missing'
        })
    } else if (!body.number) {
        return response.status(400).json({
            error: 'number missing'
        })
        //gives an error if name is not unique
    } else if (personName) {
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


const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})