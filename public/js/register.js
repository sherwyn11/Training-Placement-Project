var firestore = firebase.firestore()
var datasome

  firebase.auth().onAuthStateChanged(function(user) {
    if (user) {
        console.log(user)
        location.href = '/student-home'
    } else {
        console.log('No user')
    }
  });

  setTimeout(function() {
    window.recaptchaVerifier = new firebase.auth.RecaptchaVerifier('recaptcha-container', {
        'size': 'normal',
        'callback': function(response) {
            console.log("success", response);
        },
        'expired-callback': function() {
            console.log("expired-callback");
        }
    });

    recaptchaVerifier.render().then(function(widgetId) {
        window.recaptchaWidgetId = widgetId;
    });
  },2000);

function register(){

    const name = document.getElementById('name').value
    const rollno = document.getElementById('rollno').value
    const email = document.getElementById('email').value
    const contact = "+91" + document.getElementById('contact').value
    const branch = document.getElementById('branch').value
    const password = document.getElementById('password').value 
    const s_cgpa = 0.0      
    
    var appVerifier = window.recaptchaVerifier;
    var obj = {
        name,
        rollno,
        email,
        contact,
        branch,
        password,
        s_cgpa
    }
    axios.post('/savedetails', {
        data: obj
    }).then(function (response) {
        console.log(email + password)
        firebase.auth().createUserWithEmailAndPassword(email, password)
        .catch(function(error) {
            console.log(error)
          });
        //location.href = '/student-home'
    }).catch(function (error) {
        console.log(error);
    });
}

