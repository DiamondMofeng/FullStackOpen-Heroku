const morgan = require('morgan')
const express = require('express')
const cors = require('cors')


const app = express()

app.use(express.static('build'))
app.use(express.json())
//app.use(express.text())
app.use(cors())

const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})


morgan.token('bodyJson', function (req, res) { return JSON.stringify(req.body) })
app.use(morgan(':method :url :status :res[content-length] - :response-time ms :bodyJson'))

// const printRequestInfo = () => morgan(function (tokens, req, res) {
//   return [
//     tokens.method(req, res),
//     tokens.url(req, res),
//     tokens.status(req, res),
//     tokens.res(req, res, 'content-length'), '-',
//     tokens['response-time'](req, res), 'ms'
//     tokens.jsonBody(req.)
//   ].join(' ')
// })


let persons = [
  {
    "id": 1,
    "name": "1mofeng",
    "number": "040-123456"
  },
  {
    "id": 2,
    "name": "2fengfeng",
    "number": "39-44-5323523"
  },
  {
    "id": 3,
    "name": "3Dan Abramov",
    "number": "12-43-234345"
  },
  {
    "id": 4,
    "name": "4Mary Poppendieck",
    "number": "39-23-6423122"
  }
]

app.get('/api/info', (request, response) => {
  let str = 'PhoneBook has info for ' + persons.length + ' people  '

  response.send(`<p>${str}<br/>${Date()}</p>`)

})


app.get('/api/persons', (request, response) => {

  if (persons) {
    response.json(persons)
  }
  else {
    response.status(404).end()
  }
})

app.get('/api/persons/:id', (request, response) => {
  const id = Number(request.params.id)
  const person = persons.find(person => person.id === id)

  if (person) {
    response.json(person)
  }
  else {
    response.status(404).send('There is no such person').end()
  }
})

app.post('/api/persons', (request, response) => {
  const body = request.body

  // get name,number   and generate an id  then save
  function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min)) + min; //不含最大值，含最小值
  }
  if (!body.name || !body.number) {
    response.status(400).json({ error: 'request must have a name and number' }).end()
  }
  if (persons.find(p => p.name === body.name)) {
    response.status(400).json({ error: 'this name is already existed' }).end()

  }
  let person = {
    id: getRandomInt(0, 9999),
    name: body.name,
    number: body.number
  }
  persons = persons.concat(person)
  console.log(body)

  console.log(person)
  response.json(person)

})

app.delete('/api/persons/:id', (request, response) => {

  const id = Number(request.params.id)
  // console.log(id)
  // console.log("p1",persons)
  // console.log("p2",persons.filter(p => p.id !== id))
  persons = persons.filter(p => p.id !== id)
  // console.log("p3",persons)
  response.status(204).end()
})

