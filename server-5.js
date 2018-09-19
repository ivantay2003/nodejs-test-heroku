const express = require ('express');
const hbs = require ('hbs');
const fs = require ('fs');

var app = express();
var num = 5

hbs.registerPartials(__dirname + '/views/partials')
app.set ('view engine','hbs')
app.use (express.static(__dirname + '/public'));

app.use ((req, res, next) => {
    
    var now = new Date().toString();
    var log = `${now} : ${req.method} ${req.url}`
    console.log (log)
    
    fs.appendFile ('server.log', log + '\n', (err) => {
        if (err)
            console.log ('Unable to append to server.log')
    })
    next()
})



hbs.registerHelper ('screamText', (text) => {
    
    return text
})

hbs.registerHelper('CompanyName', () => {
  return  "Company ABC Pte LTd"
});

hbs.registerHelper ('currentYear' , () => {
    
    return new Date().getFullYear();
});

app.get('/', (req, res) =>{
    
    res.render ('home.hbs' ,{
        
        pageTitle : 'Welcome page',
        welcomeMessage : 'Welcome to my home page' + num,
       
    })
});


app.get ('/footer', (req, res) => {
    
    res.render ('footer.hbs', {
        
        currentYear : new Date().getFullYear()
    })
})

app.get ('/about', (req,res) =>{
   
    res.render('about.hbs', {
        
        pageTitle : 'About Page',
        currentYear : new Date().getFullYear()
        
        
    });
    
});

app.get ('/maintenance', (req,res) => {
    
    res.render ('maintenance.hbs' , {
        
        pageTitle : 'Oppps ... Sorry'
    })
});

app.get('/bad', (req,res) => {
    
    
    res.send({
        errorMessage : 'Unable to handle request'
    })
});
app.listen (8081, () =>{
    
    console.log ("server is up on 8081...")
});