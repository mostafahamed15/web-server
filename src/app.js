const path = require('path');
const express = require('express');

console.log(__dirname);
console.log(__filename)

const app = express();

const publicDirectoryPath = path.join(__dirname, '../public');

app.set('view engine', 'hbs');
app.use(express.static(publicDirectoryPath));


app.get('', (req, res) => {
    res.render('index', {
        title: "Weather",
        name: "Mostafa"
    })
});


app.get('/about', (req, res) => {
    res.render('aboutus', {
        title: "About me",
        name: "Mostafa"
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        title: "Help",
        helpText: "This is my help page"
    })
})



app.get('/weather', (req, res) => {
    res.send({
        forcast: "Great",
        location: "Egypt"
    })
})

app.listen(3000, ()=>{
    console.log("Server is up on port 3000.")
})