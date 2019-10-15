var admin = require('firebase-admin')
let db = admin.firestore();


const saveQuestions = (data)=>{
   
    let docRef = db.collection('FAQ').doc('Computers').update({
        'Question' : admin.firestore.FieldValue.arrayUnion(data)
    });
    
}

const initQuestions = ()=>{
    let docRef = db.collection('FAQ').doc('Computers').set({
        'Question' : ['One']
    });
}
    

module.exports = {saveQuestions,initQuestions}