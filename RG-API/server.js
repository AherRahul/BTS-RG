require('dotenv').config();
const express = require("express");
const mongoose = require("mongoose");
const cookieParser = require('cookie-parser');
const cors = require('cors');
const _ = require('lodash');

// Routes Imports
const auth = require('./routes/auth');
const user = require('./routes/user');
const resourceType = require('./routes/resourseType');

// App Configurations
const app = express();

// DB Configurations
mongoose.connect(process.env.DATABASE, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true
}).then(() => {
    console.log("DB CONNECTED..!!");
}).catch(() => {
    console.log("DB NOT CONNCETED..!!");
})

// Middlewares
app.use(cors());
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ extended: true, limit: '50mb' }));
app.use(cookieParser());

// Routes
app.use('/api/rgapp', auth);
app.use('/api/rgapp', user);
app.use('/api/rgapp', resourceType);

// Port Configuration for server
const port = process.env.PORT || 3000;

// App start at port 3000
app.listen(port, () => {
    console.log(`app listening at http://localhost:${port}`);
});