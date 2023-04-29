const express = require("express");
const bodyParser = require("body-parser");
const https = require("https");
const app = express(); 
app.use(bodyParser.urlencoded({extended:true}));

app.get("/", (req, res) => {
    res.sendFile(__dirname+"/index.html");
});

app.post("/", (req, res) =>{
    let city = req.body.cityName;
    let apiKey = process.env.APIKEY;
    const url = "https://api.openweathermap.org/data/2.5/weather?q="+city+"&APPID="+apiKey+"&units=metric";
    https.get(url, (resp) =>{
        resp.on("data", (data) => {
            const weatherData = JSON.parse(data);
            const temperature = weatherData.main.temp;
            const weatherDesc = weatherData.weather[0].description;
            const imageURL = "https://openweathermap.org/img/wn/"+weatherData.weather[0].icon+"@2x.png"
            res.write("<h1>The temperature in " +city+ " is: "+temperature+" degree Celsius</h1>");
            res.write("<p>The weather is currently "+weatherDesc+"</p>");
            res.write("<img src="+imageURL+">");
            res.end();
        });
    });
});

app.listen(3000, function()
{
    console.log("Server started listening on port 3000");
});
