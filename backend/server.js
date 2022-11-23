const express = require('express')
const app = express()
const clothes = require('./data/clothdata')
const dotenv = require('dotenv')
const mongoose = require('mongoose')
const userRoute = require('./routes/userRoute')


dotenv.config();

    try {
       mongoose.connect(process.env.MONGO_URI, {
        useUnifiedTopology: true,
        useNewUrlParser: true,
      },
      console.log(`MongoDB Connected`)
      );
    } catch (error) {
      console.error(`Error: ${error.message}`);
      process.exit();
    }

app.get('/',(req,res) =>{
    res.send('hello world')
});

app.get('/api/clothes',(req,res)=>{
    res.json(clothes)
}
);
app.use('/api/users',userRoute)
app.get('/api/clothes/:id',(req,res)=>{
    const found = clothes.find(cloth => cloth._id === req.params.id)
    res.json(found)
}
)

app.listen(5000,(req,res) =>{
    console.log("server running on port 5000");
}
)
