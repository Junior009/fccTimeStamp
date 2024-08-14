// index.js
// where your node app starts

// init project
var express = require('express');
var app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC 
var cors = require('cors');
app.use(cors({optionsSuccessStatus: 200}));  // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});

app.get("/junior", (res, req)=>{
  let msg = "Json - Alberto junior";
  req.json({message:msg});
});

app.get("/api/:date?", (req, res)=>{
  const dateStr = req.params.date;
  if(!dateStr){
    const time = new Date();
    return res.json({unix: time.getTime(), utc: date.toUTCString() });
  }

  let date = new Date(isNaN(dateStr) ? dateStr : parseInt(dateStr));
    // Check if the date is valid
    if (isNaN(date.getTime())) {
        return res.json({ error: 'Invalid Date' });
    }
    // Return the Unix timestamp in milliseconds
    return res.json({ unix: date.getTime(),  utc: date.toUTCString() });

});

// your first API endpoint... 
app.get("/api/hello", function (req, res) {
  res.json({greeting: 'hello API'});
});

app.get("/now", function time(res, req, next){ // variaveis res e req trocadas
  req.time = new Date().toString();
  next();
},(res, req) =>{
  req.json({time: req.time})
});



// Listen on port set in environment variable or default to 3000
var listener = app.listen(process.env.PORT || 3000, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
