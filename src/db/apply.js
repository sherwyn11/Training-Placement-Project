var admin = require('firebase-admin')
const md5 = require('md5')
const Excel = require('exceljs/modern.nodejs')

// var workbook = new Excel.Workbook()
// workbook.creator = 'Me';
// workbook.lastModifiedBy = 'Her';
// workbook.created = new Date(1985, 8, 30);
// workbook.modified = new Date();
// workbook.lastPrinted = new Date(2016, 9, 27);
// workbook.views = [
//     {
//       x: 0, y: 0, width: 10000, height: 20000,
//       firstSheet: 0, activeTab: 1, visibility: 'visible'
//     }
//   ]
// var sheet = workbook.addWorksheet('Applied Students');


let db = admin.firestore();

const saveApply = (companyName,email,reqCgpa)=>{
    let docRef = db.collection('users').doc(email);
    return new Promise(function(resolve, reject) {
    let getDoc = docRef.get()
    .then(doc => {
    if (!doc.exists) {
      console.log('No such document!');
    } else {
      var rollno = doc.data().rollno
      var studentCgpa = doc.data().cgpa
      if(studentCgpa >= reqCgpa){
        let compRef = db.collection(companyName).doc('candidates').collection('applied').doc(rollno).set({
            email: email
        })
        let arrUpdate = docRef.update({
            appliedCompanies: admin.firestore.FieldValue.arrayUnion(companyName)
        })
        resolve('Applied successfully')
      }else{
        resolve('Cannot apply')
      }
    }
  })
  .catch(err => {
    console.log('Error getting document', err);
  });
})
}


module.exports = {saveApply}

      
