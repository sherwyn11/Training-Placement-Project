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

module.exports = getAllData

      
