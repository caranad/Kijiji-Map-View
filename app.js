var express = require('express');
app = express();
app.use(express.static(__dirname + "/dist"));
var port = process.env.PORT || 8080;
app.listen(port);
console.log('server started '+ port);