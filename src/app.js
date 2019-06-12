const path = require('path');
const express = require('express');
const hbs = require('hbs');
const geoCode = require('./utils/geocode');
const forecast = require('./utils/forecast');

console.log(__dirname);
console.log(__filename)

const app = express();


//Define paths to config setup
const publicDirectoryPath = path.join(__dirname, '../public');
const viewsPath = path.join(__dirname, '../templates/views');
const partialsPath = path.join(__dirname, '../templates/partials');

//Setup handelbars engin and views locations
app.set('view engine', 'hbs');
app.set('views', viewsPath);
hbs.registerPartials(partialsPath);

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
        helpText: "This is my help page",
        name: "Mostafa"
    })
})



app.get('/weather', (req, res) => {
    if(!req.query.address) {
        return res.send({
            error: "You must provide an address!"
        })

    }
    geoCode(req.query.address, (error, {longtude, latitude, location} = {})=>{
     
        if (error) {
            return res.send({ error });
        }
    
        forecast( longtude, latitude, (error, foreCastData) => {
            if (error) {
                return res.send({ error });
            }
            
            res.send({
                forcast: foreCastData,
                location,
                address: req.query.address
            })
          })
    })
})

app.get('/products', (req, res) => {

    if( !req.query.search) {
       return res.send({
            error: 'You must provide a search term'
        })
    }
    console.log(req.query.search);
    res.send({
        products: []
    })
})

//Handle error page when make undefined route
app.get('*', (req, res) => {
    res.render('notfound', {
        errorMsg: "Page not found!",
        name: "Mostafa"
    })
})

//Handle sub route help page
app.get('/help/*', (req, res) => {
    res.render('notfound', {
        errorMsg: "Help article not found!",
        name: "Mostafa"
    })
})

app.listen(3000, ()=>{
    console.log("Server is up on port 3000.")
})