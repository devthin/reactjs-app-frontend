const express = require('express');
const bodyParser = require('body-parser');

const app = express();
const port = process.env.PORT || 8000;

app.use(bodyParser.urlencoded({ extended: true }));

require('./app/routes')(app)
app.use(express.static('static'))
app.listen(port, () => {
	console.log('We are live at port ' + port);
});
