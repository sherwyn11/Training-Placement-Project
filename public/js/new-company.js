var firebaseConfig = {
    apiKey: "AIzaSyBH8mbH_sptsBIzv6cXnf6g9ypZI37Ju-A",
    authDomain: "training-and-placement-1110.firebaseapp.com",
    databaseURL: "https://training-and-placement-1110.firebaseio.com",
    projectId: "training-and-placement-1110",
    storageBucket: "training-and-placement-1110.appspot.com",
    messagingSenderId: "484256523765",
    appId: "1:484256523765:web:aabbdfe0e77d4138"
};
firebase.initializeApp(firebaseConfig);


var firestore = firebase.firestore()
var datasome
var comp_name 

function enter(){
    const comp_id = document.getElementById('comp_id').value
    const name = document.getElementById('name').value
    comp_name = name
    const job = document.getElementById('job').value
    const date = document.getElementById('date').value
    const cgpa = document.getElementById('cgpa').value

    savetodb(comp_id,name,job,date,cgpa)    
}

function savetodb(comp_id,name,job,date,cgpa){
    const docRef = firestore.doc("companies/"+comp_id)
    docRef.set({
        name: name,
        job_openings: job,
        last_date_apply: date,
        req_cgpa: cgpa
    })
    .then(function() {
        console.log("Document successfully written!");
        // location.href = '/teacher-home'
        getStudents()
    })
    .catch(function(error) {
        console.error("Error writing document: ", error);
    });
}

var emails = []

function getStudents(){
    firestore.collection("users").get().then(function(querySnapshot) {
        querySnapshot.forEach(function(doc) {
            //console.log(doc.id, " => ", doc.data().email);
            emails.push(doc.data().email)
        });
        notifyStudents()
    });
}

function notifyStudents(){
    axios.post('/emails', {
        data: emails,
        name: comp_name
    }).then(function (response) {
    }).catch(function (error) {
        console.log(error);
    });
}