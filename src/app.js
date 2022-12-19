
const express = require("express");
const app = express();
const path = require("path");
const hbs = require("hbs");
const auth = require("./middleware/auth");
require("./db/conn");
// const Register = require ("./models/registers")

const port = process.env.PORT || 7000;
const static_path = path.join(__dirname, "../public");
const template_path = path.join(__dirname, "../templates/views");
const partials_path = path.join(__dirname, "../templates/partials");

app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(express.static(static_path));
app.set("view engine", "hbs");
app.set("views", template_path);
hbs.registerPartials(partials_path);

//console.log(process.env.SECRET_KEY);

app.get("/", (req, res) =>{
    res.render("index");
});
app.listen(port , ()=> {
    console.log(`server is running at port ${port}`);
});