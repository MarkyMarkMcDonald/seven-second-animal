var express = require('express');
var bodyParser = require('body-parser');
var app = express();
var fs = require('fs');

app.use(bodyParser.json());

app.post('/drawings', function (req, res) {
  console.log("hit the endpoint!", req.body);
  var {animal, authoredBy, rawImage} = req.body;
  var path = `drawings/${authoredBy}-${animal}.jpg`;
  fs.writeFile(path, rawImage);
});

app.listen(3000, function () {
  console.log('Example app listening on port 3000!');
});
