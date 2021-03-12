const express = require('express');
const connectDB = require('./config/db');
const app = express();
var cors = require('cors');

const postRouter = require('./routes/posts');

//connect database
connectDB();

//cors
app.use(cors({origin:true, credentials:true}));

// Init Middleware
app.use(express.json({ extended: false }));

app.get('/',(req,res)=>{ res.send("hello world!");});

//use routes
app.use('/api/posts',postRouter);

const port = process.env.PORT || 8082;

app.listen(port, ()=> console.log(`Server running on port ${port}`));