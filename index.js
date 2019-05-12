/*x
    "node-first-journey" - Weather Application by Goutham Krishna
    This program is free software: you can redistribute it and/or modify
    it under the terms of the GNU General Public License as published by
    the Free Software Foundation, either version 3 of the License, or
    (at your option) any later version.
    (at your option) any later version.
    This program is distributed in the hope that it will be useful,
    but WITHOUT ANY WARRANTY; without even the implied warranty of
    MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
    GNU General Public License for more details.
    GNU General Public License for more details.
    You should have received a copy of the GNU General Public License
    along with this program.  If not, see <https://www.gnu.org/licenses/>.
*/
const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const request = require('request');
const apiKey = '9969ca8563f38339014def2e4c57cbf0';

app.set('view engine', 'ejs');
app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended : true }));

app.get('/',(req,res)=>{
    res.render('index',{ weather: null, error: null });
});

app.post('/',(req, res)=>{
    console.log(req.body.city);
    let url = `http://api.openweathermap.org/data/2.5/weather?q=${req.body.city}&units=metric&appid=${apiKey}`;
    request(url,(err, response, body)=>{
        if(err){
            res.render('index',{weather: null, error: 'Please Try Again'});
        }
        else{
            let weather = JSON.parse(body);
            // console.log(weather);
            if(weather.main === undefined){
                res.render('index', {weather: null, error: 'Please Try Again'});
            }
            else{
                res.render('index',{weather: weather.main, error: null});
            }
        }
    });
    // res.render('index',{ weather: null, error: null });
});

const port = process.env.PORT || 80;


app.listen(port);