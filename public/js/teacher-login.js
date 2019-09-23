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
            alert('email sent')
        }).catch(function(error_email) {
            console.log(error_email)
        });
        console.log(firebaseUser.email)
        //location.href = '/teacher-home'
    }else{
        console.log('No user currently logged in')

    }
})  


document.getElementById('submit').addEventListener('click', e => {
    const auth = firebase.auth()
    const email = document.getElementById('email').value
    const pass = document.getElementById('password').value

    const promise = auth.createUserWithEmailAndPassword(email, pass);
        promise.then(function(user) {
            user_new = firebase.auth().currentUser;
            console.log('Users',user)
        },  function(error) {
            if(error.message == 'The email address is already in use by another account.'){
                const promise_new = auth.signInWithEmailAndPassword(email, pass);
                promise_new.then(function(user) {
                    alert('User signed in successfully!')
                    
                    //location.href = '/home'
                }, function(error_new) {
                    alert(error_new)
            })
        }else{
            alert(error)
        }
    })
})    