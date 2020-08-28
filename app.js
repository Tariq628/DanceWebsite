const express = require("express");
const path = require("path");
// const { static } = require("express");
const app = express();
const port = 8000;
const mongoose = require('mongoose');
const bodyparser = require("body-parser")
mongoose.connect('mongodb://localhost/contactDance', {useNewUrlParser: true});

const contactSchema = new mongoose.Schema({
    text: String,
    phone: String,
    email: String,
    address: String,
    desc: String
  });

const Contact = mongoose.model('Contact', contactSchema);




app.use('/static', express.static('static'));
app.use(express.urlencoded());

app.set('view engine', 'pug');
app.set('views', path.join(__dirname, 'views'));

app.get("/", (req, res) =>{
    const params = {}
    res.status(200).render('home.pug', params)
})
app.get("/contact", (req, res) =>{
    const params = {}
    res.status(200).render('contact.pug', params)
})
app.post("/contact", (req, res) =>{
    var myData = new Contact(req.body);
    myData.save().then(() => {
        res.send("This item has been saved to the dataBase")
    }).catch(()=>{
        res.status(400).send("This item has not been save to the dataBase")
    })
    // res.status(200).render('contact.pug', params)
})

app.listen(port, ()=>{
    console.log(`Server started succesfully at ${port}`)
})