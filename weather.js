const http = require('http');

const fs = require('fs');

var requests = require('requests');


const home_file = fs.readFileSync('D:/Backend(node,express,mongo)/weather-app-nodejs/weather-home.html', 'utf8');

const Replacevalues = (temporary_value, original_value) => {

    let temperature = temporary_value.replace("{%tempvalue%}", original_value.main.temp)

    temperature = temperature.replace("{%tempmin%}", original_value.main.temp_min)

    temperature = temperature.replace(" {%tempmax%}", original_value.main.temp_max)

    temperature = temperature.replace("{%location%}", original_value.name)

    temperature = temperature.replace("{%country%}", original_value.sys.country)

    temperature = temperature.replace("{%tempstatus%}", original_value.weather[0].main)


    return temperature;







}

const server = http.createServer((req, res) => {

    if (req.url == "/contact", (req, res) => {

        res.write("hii this is contact forum");

        res.end();

    })


        if (req.url == "/") {


            requests('https://api.openweathermap.org/data/2.5/weather?q=Pune,india&appid=2f21af8f08f28713cfca36c368ed3fe8&units=metric')

                .on('data', (chunk) => {

                    const objdata = JSON.parse(chunk);

                    const arraydata = [objdata];

                    // console.log(arraydata[0].main.temp);
                    const Data_of_realtime = arraydata.map(value => Replacevalues(home_file, value)).join("")

res.write(Data_of_realtime);
console.log(Data_of_realtime);



                   







                })
                .on('end', (err) => {

                    if (err) return console.log('connection closed due to errors', err);

                    // console.log('end');

                    res.end();

                });


        } else {

            res.end("Sorry File isn't Exist");
        }

});
server.listen(4000, 'localhost', () => {

    console.log("server is listening on port 4000");
});

