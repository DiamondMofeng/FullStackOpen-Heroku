require('dotenv').config()
const morgan = require('morgan')
const express = require('express')
const cors = require('cors')
const Person = require('./models/person')


const app = express()

app.use(express.static('build'))
app.use(express.json())
app.use(cors())

const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})


morgan.token('bodyJson', function (req, res) { return JSON.stringify(req.body) })
app.use(morgan(':method :url :status :res[content-length] - :response-time ms :bodyJson'))




let persons = [
  // {
  //   "id": 1,
  //   "name": "1mofeng",
  //   "number": "040-123456"
  // },
  // {
  //   "id": 2,
  //   "name": "2fengfeng",
  //   "number": "39-44-5323523"
  // },
  // {
  //   "id": 3,
  //   "name": "3Dan Abramov",
  //   "number": "12-43-234345"
  // },
  // {
  //   "id": 4,
  //   "name": "4Mary Poppendieck",
  //   "number": "39-23-6423122"
  // }
]

app.get('/api/info', (request, response) => {
  Person.find({}).then(result => {
    let personsLength = result.length
    let str = 'PhoneBook has info for ' + personsLength + ' people  '
    response.send(`<p>${str}<br/>${Date()}</p>`)
  })
})


app.get('/api/persons', (request, response) => {

  Person.find({}).then(result => {
    // console.log(result)
    response.json(result)
  })

  // if (persons) {
  //   response.json(persons)
  // }
  // else {
  //   response.status(404).end()
  // }
})

app.get('/api/persons/:id', (request, response) => {
  // const id = Number(request.params.id)
  const id = request.params.id
  //old
  // const person = persons.find(person => person.id === id)
  const person = Person.findById(id)
    .then(result => {
      // console.log(result)
      if (result) {
        // console.log(result)
        response.json(result)
      }
      else {
        console.log("123")
        response.json({ error: 'there is no person with this id' })
      }
    })
    .catch(error => {
      console.log(error)
    })
  // console.log(person)
  // if (person) {
  //   response.json(person)
  // }
  // else {
  //   response.status(404).send('There is no such person').end()
  // }
})

app.post('/api/persons', (request, response) => {
  const body = request.body

  // get name,number   and generate an id  then save
  // function getRandomInt(min, max) {
  //   min = Math.ceil(min);
  //   max = Math.floor(max);
  //   return Math.floor(Math.random() * (max - min)) + min; //不含最大值，含最小值
  // }
  if (!body.name || !body.number) {
    response.status(400).json({ error: 'request must have a name and number' }).end()
  }
  if (persons.find(p => p.name === body.name)) {
    response.status(400).json({ error: 'this name is already existed' }).end()
  }
  const person = new Person({
    // id: getRandomInt(0, 9999),
    name: body.name,
    number: body.number
  })
  // persons = persons.concat(person)
  // console.log(body)
  // console.log(person)
  person.save().then(
    savedPerson => response.json(savedPerson)
  )


})
//have not updated
app.delete('/api/persons/:id', (request, response,next) => {
  const id = request.params.id
  Person.findByIdAndRemove(id)
    .then(result => {
      persons = persons.filter(p => p.id !== id)
      response.status(204).end()
    })
    .catch(error => next(error))
})


