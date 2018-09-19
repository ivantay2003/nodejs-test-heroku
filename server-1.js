const express = require ('express');

var app = express();

app.get('/', (req, res) =>{
    
    //res.send("<H1>Express lah!</H1>")
    res.send ({
        
        name: 'Ivan',
        likes: ['Jogging', 'Swimging']
    })
});

app.get ('/about', (req,res) =>{
   
    res.send("ABout page")
    
});

app.get('/bad', (req,res) => {
    
    
    res.send({
        errorMessage : 'Unable to handle request'
    })
});
app.listen (8081);