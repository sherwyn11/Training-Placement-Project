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

firebase.auth().onAuthStateChanged(firebaseUser => {
    if(firebaseUser){
        console.log(firebaseUser.email)
    }else{
        console.log('no user')
    }
})  


document.getElementById('logout').addEventListener('click', e => {
    const auth = firebase.auth()
    firebase.auth().signOut()
    location.href = '/'
})    

function getNewCompany(){
    location.href = '/new-company'
}