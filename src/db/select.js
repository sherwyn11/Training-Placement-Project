var admin = require('firebase-admin')

let db = admin.firestore();

const saveSelected = (studentArr) => {
    console.log("Uploading Students")
    for(student of studentArr){
        var email = student.email
        var rollNo = student.rollNo
        var companyName = student.company
        let compRef = db.collection(companyName).doc('candidates').collection('selected').doc(rollNo).set({
            email: email
        })
        .catch(err => {
           console.log('Error getting document', err);
        });
    }
    console.log("Done")
}


module.exports = {saveSelected}