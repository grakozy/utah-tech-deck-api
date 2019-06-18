const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const PORT = 4000;
const cors = require('cors');
const db = require('./queries');

app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.get('/companies', db.getCompanies);
app.get('/companies/:id', db.getCompanyById);
app.post('/companies', db.createCompany);
app.put('/companies/:id', db.updateCompany);
app.delete('/companies/:id', db.deleteCompany);

app.listen(PORT, function() {
	console.log('Server is running on Port:', PORT);
});

// https://blog.logrocket.com/setting-up-a-restful-api-with-node-js-and-postgresql-d96d6fc892d8/
// https://node-postgres.com/
// https://mherman.org/blog/postgresql-and-nodejs/

// react tuts https://appdividend.com/2018/11/11/react-crud-example-mern-stack-tutorial/
