const mongoose = require('mongoose')

if (process.argv.length < 5) {



    if (process.argv.length === 3) {
        const password = process.argv[2]
        const url =
            `mongodb+srv://mongodb:${password}@fullstackopen.xb8ry.mongodb.net/phonebook-app?retryWrites=true&w=majority`
        mongoose.connect(url)

        const personSchema = new mongoose.Schema({
            name: String,
            number: String,
            //date: Date,
    
        })
    
        const Person = mongoose.model('Person', personSchema)//will be save at persons(person s)

        Person.find({}).then(result => {
            result.forEach(person => {
                console.log(person.name,person.number)
            })
            mongoose.connection.close()
        })


    }
    else {
        console.log('Please provide these as arguments: node mongo.js <password> <name> <number>')
        process.exit(1)
    }
}

else {


    const password = process.argv[2]
    const name = process.argv[3]
    const number = process.argv[4]

    const url =
        `mongodb+srv://mongodb:${password}@fullstackopen.xb8ry.mongodb.net/phonebook-app?retryWrites=true&w=majority`

    // mongoose.connect(url)

    const personSchema = new mongoose.Schema({
        name: String,
        number: String,
        //date: Date,

    })

    const Person = mongoose.model('Person', personSchema)//will be save at persons(person s)

    const person = new Person({
        name: name,
        number: number,
    })
    mongoose.connect(url)
    person.save().then(result => {
        console.log('person saved!')
        mongoose.connection.close()
    })
    // mongoose.connect(url)
    // Person.find({}).then(result => {
    //     result.forEach(person => {
    //         console.log(person.name,person.number)
    //     })
    //     mongoose.connection.close()
    // })
}