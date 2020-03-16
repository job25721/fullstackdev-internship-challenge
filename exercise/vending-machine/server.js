const express = require('express')
const app = express()
const cors = require('cors')
var db = require('./products.json');

//init middleware
app.use(express.json({ extended: false }));
app.use(cors({ origin: true ,credentials:false}));

function monitor(req){
    console.log(`${req.method} ${req.url}`);
}

app.get('/',(req,res)=>res.send("API RUNNING..."))
app.get('/api/:id',(req,res)=>{
    monitor(req)
    const id = parseInt( req.params.id )
    var data 
    for(let i=0;i<db.data.length;i++){
        if(db.data[i].id === id) {
            data = db.data[i]
        }
    }
    
    res.json(data)
})
app.get('/api',(req,res)=>{
    monitor(req)
    res.send(db.data)
})
const port = process.env.PORT || 8000
app.listen(port,()=>console.log("Server started on port : " + port))