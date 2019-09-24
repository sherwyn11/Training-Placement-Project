var admin = require('firebase-admin')

let db = admin.firestore();

function getAllData(){
  let companyRef = db.collection('companies');
  return new Promise(function(resolve, reject) {
    companyRef.get().then(snapshot => {
      var company_details = []
        snapshot.forEach(doc => {
        company_details.push(doc.data())
        });
        resolve(company_details)
    })
    .catch(err => {
        console.log('Error getting documents', err);
    })
  })
}

function getAllApplied(companyName){
  let companyRef = db.collection(companyName).doc('candidates').collection('applied');
  return new Promise(function(resolve, reject) {
    companyRef.get().then(snapshot => {
      var appliedUser = []
      var num = 0
      snapshot.forEach(async doc => {
        appliedUser.push(await getUserDetails(doc.data()))
        num += 1
        if(num == snapshot._size){
          resolve(appliedUser)
        }
      })
    })
    .catch(err => {
        console.log('Error getting documents', err);
    })
  })
}

function getAllSelected(companyName){
  var selectedUser = []
  let companyRef = db.collection(companyName).doc('candidates').collection('selected');
  return new Promise(function(resolve, reject) {
    companyRef.get().then(snapshot => {
      snapshot.forEach(async doc => {
        var details = await getUserDetails(doc.data())
        selectedUser.push(details)
      })
      console.log('Document data:', selectedUser);
      resolve(selectedUser)
    })
    .catch(err => {
        console.log('Error getting documents', err);
    })
  })
}

const getUserDetails = (email) => {
  return new Promise(function(resolve, reject) {
    var userList = []
    let userRef = db.collection('users').doc(email.email);
    let getDoc = userRef.get()
    .then(doc => {
      if (!doc.exists) {
        console.log('No such document!');
      } else {
        userList.push(doc.data())
        resolve(userList[0])
      }
    })
    .catch(err => {
      console.log('Error getting document', err);
    })
  })
}

module.exports = {getAllData: getAllData, getAllSelected: getAllSelected, getAllApplied: getAllApplied}

      
