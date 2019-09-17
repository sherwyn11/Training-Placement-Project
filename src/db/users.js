var admin = require('firebase-admin')
const md5 = require('md5')

let db = admin.firestore();

const saveDetails = (name,rollno,email,branch,password,cgpa)=>{
    let docRef = db.collection('users').doc(rollno);

    docRef.set({
        name: name,
        email: email,
        branch: branch,
        password: md5(password),
        cgpa: cgpa
    })
}

module.exports = saveDetails

      
