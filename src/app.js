const express = require('express');
const hbs = require('hbs');
const app = express();
const path = require('path');
// favicon
const favicon = require('serve-favicon')
// app.use(favicon(path.join(__dirname,'public','favicon.ico')))

const weatherdata = require('../util/weatherdata.js');
const port = process.env.PORT || 8008;

const publicstaticdirpath = path.join(__dirname, '../public');

const viewspath = path.join(__dirname, '../templates/views');
const partialspath = path.join(__dirname, '../templates/partials');

app.set('view engine', 'hbs');
app.set('views', viewspath);
hbs.registerPartials(partialspath);

app.use(express.static(publicstaticdirpath));

app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather Application'
    })
});

app.get('/weather', (req, res) => {
    const address = req.query.address;
    if (!address) {
        return res.send({
            error: "You must enter address in search text box"
        })
    }
    weatherdata(address, (error, { temperature, description, cityName } = {}) => {
        if (error) {
            return res.send({
                error
            })
        }
        console.log(temperature, description, cityName);
        res.send({
            temperature,
            description,
            cityName
        })
    });
});

app.get('*', (req, res) => {
    res.render('404', {
        title: "PAGE NOT FOUND!!!"
    })
})

app.listen(port, () => {
    console.log("Server is Runing on port:", port);
});
