const express=require('express');

const  Person  = require('./Person');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const cors = require('cors');
const { log } = require('console');


app=express();
app.use(bodyParser.json());
app.use(cors());


mongoose.connect('mongodb://localhost:27017/CoxUsers', {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => {
    console.log('Connected to MongoDB');
}).catch((error) => {
    console.error('Failed to connect to MongoDB:', error);
    process.exit(1); // Exit the process if unable to connect to MongoDB
});
const personSchema = new mongoose.Schema({
    key: String,
    name: String,
    age: Number,
    address: String
});
const User = mongoose.model('Person', personSchema);
// const initialData = [
//     { key: '1', name: 'John Doe', age: 30, address: '123 Main St' },
//     { key: '2', name: 'Sam', age: 30, address: 'Wall Street' },
//     { key: '3', name: 'Ravi', age: 30, address: 'California' }
// ];
// User.insertMany(initialData)
//     .then(() => {
//         console.log('Database initialized with sample data');
//     })
//     .catch((error) => {
//         console.error('Error initializing database:', error);
//     });

var person;
tablelist=[];
person = new Person('1',"John Doe", 30, "123 Main St");
tablelist.push(person);
person = new Person('2',"Sam", 30, "Wall Street");
tablelist.push(person);
person = new Person('3',"Ravi", 30, "California");
tablelist.push(person);


app.get("",async (req,respo)=>{
    //  respo.send(tablelist);
    try {
        const persons = await User.find();
        respo.send(persons);
    } catch (error) {
        console.error('Error fetching persons:', error);
        respo.status(500).json({ error: 'Failed to fetch persons' });
    }
});
app.post("/postData",async (req,resp)=>{
    try {
        const newPerson = new Person(req.body);
        await newPerson.save();
        resp.send(newPerson);
    } catch (error) {
        console.error('Error adding person:', error);
        resp.status(500).json({ error: 'Failed to add person' });
    }

})

app.listen(5001);