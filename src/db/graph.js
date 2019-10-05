var admin = require('firebase-admin')
const {getAllNames} = require('./companies')

let db = admin.firestore();

async function getAppliedNumber(){
    let companyNames = await getAllNames()
    return new Promise(async function(resolve, reject) {
        let num = 0;
        let sizes = [];
        for(var name of companyNames){
            let collectionRef = db.collection(name).doc('candidates').collection('applied');
            await collectionRef.get().then(snapshot => {
                if(num == companyNames.length - 1){
                    resolve(sizes)
                }
                sizes.push({name: name, size: snapshot.size})
            })
            .catch(err => {
                console.log('Error getting documents', err);
            })
            num += 1
        }
    })
}

async function getSelectedNumber(){
    let companyNames = await getAllNames()
    return new Promise(async function(resolve, reject) {
        let num = 0;
        let sizes = [];
        for(var name of companyNames){
            let collectionRef = db.collection(name).doc('candidates').collection('selected');
            await collectionRef.get().then(snapshot => {
                if(num == companyNames.length - 1){
                    resolve(sizes)
                }
                sizes.push({name: name, size: snapshot.size})
            })
            .catch(err => {
                console.log('Error getting documents', err);
            })
            num += 1
        }
    })
}

module.exports = {getAppliedNumber: getAppliedNumber, getSelectedNumber: getSelectedNumber}

      
