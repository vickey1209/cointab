
const express = require("express");
const app = express();
const path = require("path");
const ejs = require ("ejs")
const mysql = require('mysql');
const auth = require("./middleware/auth");


const db = require("./db/conn");
// const Register = require ("./models/registers")

const port = process.env.PORT || 7000;
const static_path = path.join(__dirname, "../public");
const template_path = path.join(__dirname, "../templates/views");
const partials_path = path.join(__dirname, "../templates/partials");

app.use(express.json());
app.set("view engine", "ejs");
app.use(express.urlencoded({extended:true}));
app.use(express.static(static_path));
app.set("views", template_path);


//console.log(process.env.SECRET_KEY);

app.get("/", (req, res) =>{
    res.render("index")
});



app.get ("/registration", (req,res)=>{
    res.render("register")

    
    app.post('/register', function(req, res, next) {
        const name = req.body.name;
        const email = req.body.email;
        const password = req.body.password;

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

app.post('/login', function(req, res, next){

   

    if(email && password)
    {
        query = `
        SELECT * FROM register
        WHERE email = "${email}"
        `;

        db.query(query, function(error, data){

            if(data.length > 0)
            {
                for(var count = 0; count < data.length; count++)
                {
                    if(data[count].password == password)
                    {
                        request.session.user_id = data[count].user_id;

                        response.redirect("/");
                    }
                    else
                    {
                        response.send('Incorrect Password');
                    }
                }
            }
            else
            {
                response.send('Incorrect Email Address');
            }
            response.end();
        });
    }
    else
    {
        response.send('Please Enter Email Address and Password Details');
        response.end();
    }

});

app.listen(port , ()=> {
    console.log(`server is running at port ${port}`);
});