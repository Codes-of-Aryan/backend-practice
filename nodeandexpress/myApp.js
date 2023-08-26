console.log('Hello World');
let express = require('express');
let bodyParser = require('body-parser');
let app = express();


absolutePath = __dirname + '/views/index.html'
pathPublic = __dirname + '/public'

app.use('/', bodyParser.urlencoded({extended: false}));

function hello(req, res){  
  res.sendFile(absolutePath);
}

app.use((req, res, next) => {
  let logger = req.method + ' ' + req.path + ' - ' + req.ip; 
  console.log(logger);
  next();
});

app.use('/public', express.static(pathPublic));
app.get('/', hello);

app.get('/json', (req, res) => {
  mssg = {'message': 'Hello json'};
  mssg.message = process.env.MESSAGE_STYLE ==='uppercase'? mssg.message.toUpperCase() : mssg.message ; 
  res.json(mssg);
});

app.get('/now', (req, res, next) => {
  req.time = new Date().toString(); 
  next(); }, 
  (req, res) => 
    res.json({time : req.time})
);

app.get('/:word/echo', (req, res) => {
  res.json({echo: req.params.word}); 
});

app.get('/name', (req, res) => {
  let name = req.query;
  res.json({name: name.first + ' ' + name.last});
}).post('/name', (req, res) => {
  let firstName = req.body.first;
  let lastName = req.body.last; 
  res.json({name: firstName + ' ' + lastName});
}); 

module.exports = app;
