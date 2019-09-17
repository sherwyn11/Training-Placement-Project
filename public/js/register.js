var firestore = firebase.firestore()
var datasome

function register(){
    const name = document.getElementById('name').value
    const rollno = document.getElementById('rollno').value
    const email = document.getElementById('email').value
    const branch = document.getElementById('branch').value
    const password = document.getElementById('password').value 
    const s_cgpa = document.getElementById('cgpa').value      
    
    var obj = {
        name,
        rollno,
        email,
        branch,
        password,
        s_cgpa
    }

    axios.post('/savedetails', {
        data: obj
    }).then(function (response) {
        console.log(response)
    }).catch(function (error) {
        console.log(error);
    });
}