var admin = require('firebase-admin')
const md5 = require('md5')

let db = admin.firestore();

const saveDetails = (name,rollno,email,contact,branch,password,cgpa)=>{
    let docRef = db.collection('users').doc(email);
    let moodleRef = db.collection('moodle-dummy').doc(rollno);
    let getDoc = moodleRef.get()
    .then(doc => {
      if (!doc.exists) {
      console.log('No such document!');
    } else {
      console.log('Document data:', doc.data());
      var new_cgpa = doc.data().CGPA
      docRef.set({
        name: name,
        rollno: rollno,
        contact: contact,
        branch: branch,
        password: md5(password),
        cgpa: new_cgpa,
        appliedCompanies: []
    })
    }
  })
  .catch(err => {
    console.log('Error getting document', err);
  })
}

const getAppliedCompanies = (email) =>{
  let docRef = db.collection('users').doc(email)
  return new Promise(function(resolve, reject) {
  let getDoc = docRef.get()
  .then(doc => {
    if (!doc.exists) {
      console.log('No such document!');
    } else {
      resolve(doc.data().appliedCompanies);
    }
  })
  .catch(err => {
    console.log('Error getting document', err);
  });
 }) 
}

module.exports = {saveDetails,getAppliedCompanies}

      
