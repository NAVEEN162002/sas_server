var express = require('express');
var cors = require('cors');
var mongoose = require('mongoose');

var app = express();
app.use(cors());
app.use("/",(req ,res) =>{
    res.send("Server is running.");
});
const PORT = process.env.PORT || 5000
mongoose.connect('mongodb+srv://gubbalamalleswari9:HdkOJsldKisAmAQK@cluster0.xs4mglv.mongodb.net/attendance');
var db = mongoose.connection;

db.on('error', console.error.bind(console, 'MongoDB connection error:'));

db.once('open', function () {
    console.log('Connected to MongoDB Atlas');
});

app.get('/students', async function (req, res) {
    try {
        const collection = db.collection('student');
        const students = await collection.find({}).toArray();
        res.json(students);
    } catch (err) {
        console.error('Error fetching data from MongoDB:', err);
        res.status(500).send('Internal Server Error');
    }
});

app.listen(PORT, function () {
    console.log('Example app listening on port 5000!');
});
