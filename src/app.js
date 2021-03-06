const path = require('path')
const express = require('express')
var bodyParser = require('body-parser')
const methodOverride = require('method-override')
const md5 = require('md5')
require('./db/init')
const {saveApply} = require('./db/apply')
const {sendMail} = require('./emails/account')
const {saveDetails} = require('./db/users')
const getAllData = require('./db/companies')
const {getAppliedCompanies} = require('./db/users')
const {sendNewCompanyEmail} = require('./emails/account')
const app = express()
const port = process.env.PORT || 3000

const viewsPath = path.join(__dirname,'../templates/views')

app.set('view engine','ejs')
app.set('views',viewsPath)

app.use(bodyParser.json()); 
app.use(express.static(path.join(__dirname,'../public')))
app.set(methodOverride('_method'))

app.get('/register', function (req, res) {
  res.render('register')
})

// ----------------------------Teacher--------------------------------------- //

app.get('/teacher-login', function (req, res) {
  res.render('teacher-login')
})

app.get('/teacher-home', function (req, res) {
  res.render('teacher-home')
})

app.get('/teacher-home-data', function (req, res) {
  async function getDatabaseData(){
    var companies = await getAllData()
    var obj = {
      companies
    }
    res.send(obj)
  }
  getDatabaseData()
})

// ----------------------------Student--------------------------------------- //

app.get('/student-home', function (req, res) {
  res.render('student-home')
})

app.get('/', function (req, res) {
  res.render('student-login')
})

app.post('/student-home-data', function (req, res) {
  const email = req.body.data
  async function getDatabaseData(){
    var companies = await getAllData(email)
    var applied = await getAppliedCompanies(email)
    var obj = {
      companies,
      applied
    }
    res.send(obj)
  }
  getDatabaseData()
})

app.post('/student-change-pswd', function (req, res) {
  const email = req.body.email
  console.log(email)
  sendMail(email)
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

app.post('/student-apply', function(req, res) {
  const companyName = req.body.resData.name
  const email = req.body.email
  const cgpa = req.body.resData.req_cgpa
  async function checkApply(){
    const result = await saveApply(companyName,email,cgpa)
    console.log(result)
    res.send({
      respMsg: result
    })
  }
  checkApply()
});  

app.post('/savedetails', function(req, res) {
  const name = req.body.data.name
  const rollno = req.body.data.rollno
  const email = req.body.data.email
  const contact = req.body.data.contact
  const branch = req.body.data.branch
  const password = req.body.data.password
  const cgpa = req.body.data.s_cgpa
  saveDetails(name,rollno,email,contact,branch,password,cgpa)
  res.send({
    msg: 'Data saved successfully'
  })
}); 

app.listen(port, () => {
  console.log("Server is up on port "+port)
})