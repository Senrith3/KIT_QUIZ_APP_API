const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();

app.use(bodyParser.json());
app.use(cors());

const taskslist = require('./routes/api/users');
app.use('/api/users', taskslist);

const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`Server started on port ${port}`));
