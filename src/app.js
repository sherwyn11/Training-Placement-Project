const path = require('path')
const express = require('express')
var bodyParser = require('body-parser')
const methodOverride = require('method-override')
require('./db/init')
const saveDetails = require('./db/users')
const getAllData = require('./db/companies')
const {sendNewCompanyEmail} = require('./emails/account')
const app = express()
const port = process.env.PORT || 3000

const viewsPath = path.join(__dirname,'../templates/views')

app.set('view engine','ejs')
app.set('views',viewsPath)

app.use(bodyParser.json()); 
app.use(express.static(path.join(__dirname,'../public')))
app.set(methodOverride('_method'))

app.get('/', function (req, res) {
  res.render('register')
})

app.get('/teacher', function (req, res) {
  res.render('teacher-login')
})

app.get('/teacher-home', function (req, res) {
  res.render('teacher-home')
})

app.get('/student-home', function (req, res) {
  res.render('student-home')
})

app.post('/student-home-data', function (req, res) {
  async function getDatabaseData(){
    var companies = await getAllData()
    res.send(companies)
  }
  getDatabaseData()
})

app.get('/new-company', function (req, res) {
  res.render('new-company')
})


app.post('/emails', function(req, res) {
  const emails = req.body.data
  const name = req.body.name
  async function getDatabaseData(){
    var companies = await getAllData()
    res.send(companies)
  }
  getDatabaseData()
  sendNewCompanyEmail(emails,name)
});  

app.post('/savedetails', function(req, res) {
  const name = req.body.data.name
  const rollno = req.body.data.rollno
  const email = req.body.data.email
  const branch = req.body.data.branch
  const password = req.body.data.password
  const cgpa = req.body.data.s_cgpa
  saveDetails(name,rollno,email,branch,password,cgpa)
}); 

app.listen(port, () => {
  console.log("Sever is up on port "+port)
})