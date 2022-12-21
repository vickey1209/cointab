
const express = require("express");
const app = express();
const path = require("path");
const ejs = require ("ejs")
const mysql = require('mysql');
const session = require('express-session');
const auth = require("./middleware/auth");
const flash = require('express-flash');
const expressValidator = require('express-validator');

const db = require("./db/conn");
// const Register = require ("./models/registers")

const port = process.env.PORT || 7000;
const static_path = path.join(__dirname, "../public");
const template_path = path.join(__dirname, "../templates/views");
const partials_path = path.join(__dirname, "../templates/partials");

app.use(flash());

app.use(express.json());
app.set("view engine", "ejs");
app.use(express.urlencoded({extended:true}));
app.use(express.static(static_path));
app.set("views", template_path);


app.use(session({
	secret: 'secret',
	resave: true,
	saveUninitialized: true
}));

//console.log(process.env.SECRET_KEY);

app.get("/", (req, res) =>{
    res.render("index")
});



app.get ("/registration", (req,res)=>{
    res.render("register")

    
    app.post('/register', function(req, res, next) {
        let name = req.body.name;
        let email = req.body.email;
        let password = req.body.password;

        var sql = `INSERT INTO register (name, email, password) VALUES ("${name}", "${email}", "${password}")`;
        db.query(sql, function(err, result) {
          if (err) throw err;
          console.log('record inserted');
        //   req.flash('success', 'Data added successfully!');
          res.redirect('/');
        });
      });


   
    






    app.post('/register', async (req, res)=>{
        
        const name = req.body.name;
        const email = req.body.email;
        const password = req.body.password;
    
        
        con.query('INSERT INTO register VALUES (?,?,?)',[name,email,password] ,(err, res)=>{
        
        if (err)
        {
            console.log(err)
        } else{
            res.send('posted')
            // con.query("CREATE DATABASE cointab", function (err, result) {
            //     if (err) throw err;
            //     console.log("Database created");
            //   });
        }
        })
    })
      
})

app.get ("/home", (req,res)=>{
    res.render("home")
})

app.get ("/signin", (req,res)=>{
    res.render("login")
})

app.post('/login', function(req, res) {
	// Capture the input fields
	let email = req.body.email;
	let password = req.body.password;
	// Ensure the input fields exists and are not empty
	if (email && password) {
		// Execute SQL query that'll select the account from the database based on the specified username and password
		db.query('SELECT * FROM register WHERE email = ? AND password = ?', [email, password], function(error, results, fields) {
			// If there is an issue with the query, output the error
			if (error) throw error;
			// If the account exists
			if (results.length > 0) {
				// Authenticate the user
				req.session.loggedin = true;
				req.session.email = email;
				// Redirect to home page
                res.redirect('/home')
				// response.redirect('register');
			} else {
				res.send('Incorrect Username and/or Password!');
          
			}			
			res.end();
		});
	} else {
		res.send('Please enter Username and Password!');
		res.end();
	}
});

// app.get('/displayusers',(req, res) => {
//     let sqlQuery = "SELECT * FROM register";
    
//     let query = con.query(sqlQuery, (err, results) => {
//       if(err) throw err;
//       res.send(apiResponse(results));
//     });
//   });

  app.get('/displayusers', (req, res) => {
    db.query('SELECT * FROM register',function(err,rows)     {
    if(err){
    req.flash('error', err); 
    res.render('displayusers',{data:''});   
    }else{
    res.render('displayusers',{data:rows});
    }
    });
    });

    app.get('/edit/(:id)', function(req, res, next){
db.query('SELECT * FROM register WHERE id = ' + req.params.id, function(err, rows, fields) {
if(err) throw err
// if user not found
if (rows.length <= 0) {
req.flash('error', 'Users not found with id = ' + req.params.id)
res.redirect('/displayusers')
}
else { // if user found
// render to views/user/edit.ejs template file
res.render('register/edit', {
title: 'Edit Customer', 
//data: rows[0],
id: rows[0].id,
name: rows[0].name,
email: rows[0].email                    
})
}            
})
})


app.get('/delete/(:id)', function(req, res, next) {
    var user = { id: req.params.id }
    connection.query('DELETE FROM register WHERE id = ' + req.params.id, user, function(err, result) {
    //if(err) throw err
    if (err) {
    req.flash('error', err)
    // redirect to users list page
    res.redirect('/displayusers')
    } else {
    req.flash('success', 'Customer deleted successfully! id = ' + req.params.id)
    // redirect to users list page
    res.redirect('/displayusers')
    }
    })
    })










app.listen(port , ()=> {
    console.log(`server is running at port ${port}`);
});