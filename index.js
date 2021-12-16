require('dotenv').config()
const morgan = require('morgan')
const express = require('express')
const cors = require('cors')
const Person = require('./models/person')


const app = express()

app.use(express.static('build'))
app.use(express.json())
app.use(cors())
//use morgan
morgan.token('bodyJson', function (req, res) { return JSON.stringify(req.body) })
app.use(morgan(':method :url :status :res[content-length] - :response-time ms :bodyJson'))





const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})






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
  Person.find({})
    .then(result => {
      let personsLength = result.length
      let str = 'PhoneBook has info for ' + personsLength + ' people  '
      response.send(`<p>${str}<br/>${Date()}</p>`)
    })
    .catch(err => next(err))
})


app.get('/api/persons', (request, response) => {

  Person.find({})
    .then(result => {
      // console.log(result)
      if (result) {
        response.json(result)
      } else {
        response.status(404).end()
      }
    })
    .catch(err => next(err))


})

app.get('/api/persons/:id', (request, response, next) => {
  const id = request.params.id
  const person = Person.findById(id)
    .then(result => {
      // console.log(result)
      if (result) {
        // console.log(result)
        response.json(result)
      } else {
        // console.log("123")
        response.status(404).json({ error: 'there is no person with this id' })
      }
    })
    .catch(error => {
      next(error)
    })
})

app.post('/api/persons', (request, response, next) => {
  const body = request.body

  if (!body.name || !body.number) {
    response.status(400).json({ error: 'request must have a name and number' })
      .end()
  }

  if (Person.find({ name: { $eq: body.name } })) {
    response.status(400).json({ error: 'this person is already existed on server' })
      .end()
    return
  }

  const person = new Person({
    // id: getRandomInt(0, 9999),
    name: body.name,
    number: body.number
  })
  // persons = persons.concat(person)
  // console.log(body)
  // console.log(person)
  person.save()
    .then(
      savedPerson => response.json(savedPerson)
    )
    .catch(
      err => next(err)
    )


})

app.put('/api/persons/:id', (request, response, next) => {
  const body = request.body
  console.log(body)
  const person = {
    name: body.name,
    number: body.number,
  }
  Person.findByIdAndUpdate(request.params.id, person, { new: true })
    .then(result => {
      if (result) {
        console.log(result)
        response.status(200).json(result)
      } else {
        response.status(404).json({ error: "Fail to locate this person on server", })
      }

    })
    .catch(err => {
      console.log(err)
      next(err)
    })
})



app.delete('/api/persons/:id', (request, response, next) => {
  const id = request.params.id
  Person.findByIdAndRemove(id)
    .then(result => {
      response.status(204).end()
    })
    .catch(error => next(error))
})







//// use errorHandler 必须调用next的放在后面
const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: 'unknown endpoint' })
}

// handler of requests with unknown endpoint
app.use(unknownEndpoint)

const errorHandler = (error, request, response, next) => {
  // response.status(404).send({ error: 'unknown endpoint' })
  if (error.name === 'CastError' && error.kind === 'ObjectId') {
    return response.status(400).send({ error: 'malformatted id' })
  } else {
    return response.status(400).send({ error: 'unknow error' })
  }
}


// handler of requests with result to errors
app.use(errorHandler)