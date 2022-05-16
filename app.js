const express = require('express');
const bodyParser = require('body-parser');
const api = require('./routes/api')

const app = express();
const port = process.env.PORT || 3000

app.use(bodyParser.json());
app.use('/api/v1', api)

app.listen(port, () => console.log(`Server is running on port ${port}...`))