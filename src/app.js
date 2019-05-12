const path = require('path');
const express = require('express');

console.log(__dirname);
console.log(__filename)

const app = express();


//Define paths to config setup
const publicDirectoryPath = path.join(__dirname, '../public');
const viewsPath = path.join(__dirname, '../templates');

//Setup handelbars engin and views locations
app.set('view engine', 'hbs');
app.set('views', viewsPath);

//Setup static directory to serve
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