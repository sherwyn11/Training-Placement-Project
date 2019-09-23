var firebaseConfig = {
    apiKey: "AIzaSyBH8mbH_sptsBIzv6cXnf6g9ypZI37Ju-A",
    authDomain: "training-and-placement-1110.firebaseapp.com",
    databaseURL: "https://training-and-placement-1110.firebaseio.com",
    projectId: "training-and-placement-1110",
    storageBucket: "training-and-placement-1110.appspot.com",
    messagingSenderId: "484256523765",
    appId: "1:484256523765:web:aabbdfe0e77d4138"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);

var  user_new

firebase.auth().onAuthStateChanged(firebaseUser => {
    if(firebaseUser){
        firebaseUser.sendEmailVerification().then(function() {
            console.log('email sent')
        }).catch(function(error_email) {
            console.log(error_email)
        });
        console.log(firebaseUser.email)
        location.href = '/student-home'
    }else{
        console.log('No user currently logged in')

    }
})  


document.getElementById('submit').addEventListener('click', e => {
    const email = document.getElementById('email').value
    const password = document.getElementById('password').value
    firebase.auth().signInWithEmailAndPassword(email, password).catch(function(error) {
        alert(error)
      });
})    

function promptFunct(){
    var email = prompt('Enter your email address','')
    axios.post('/student-change-pswd', {
        email: email,
    }).then(function (response) {
        console.log(response.data.respMsg)
    }).catch(function (error) {
        console.log(error);
    });
}