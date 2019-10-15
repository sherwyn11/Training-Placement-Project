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


var email
var applied = []

firebase.auth().onAuthStateChanged(firebaseUser => {
    if(firebaseUser){
        console.log(firebaseUser.email)
        email = firebaseUser.email
        axios.post('/student-home-data', {
            data: email
        }).then(function (response) {
            applied = response.data.applied
            const loader = document.getElementById('loader')
            loader.style.display = "none"
            data = response.data.companies
            newValues = sortData(data)
            getAppliedNos()
            initListOfTasks(newValues);
            }).catch(function (error) {
                console.log(error);
            });
    }else{
        console.log('No user currently logged in')
    }
})  

var data = []

function sortData(data){
    var temp = {}
    for(i=0;i<data.length;i++){
        for(j=i+1;j<data.length;j++){
            if(data[i].last_date_apply >= data[j].last_date_apply){
                temp = data[i]
                data[i] = data[j]
                data[j] = temp
            }
        }
    }
    return data
}

let cardContainer;

let createTaskCard = (task,i) => {

    let card = document.createElement('div');
    card.className = 'card shadow cursor-pointer';
    let cardBody = document.createElement('div');
    cardBody.className = 'card-body';
    let title = document.createElement('h2');
    title.innerText = task.name;
    title.className = 'card-title';
    let openings = document.createElement('div');
    openings.innerText = "Job openings : " + task.job_openings;
    openings.className = 'card-openings';
    let cgpa = document.createElement('div');
    cgpa.innerText = "Required CGPA : " + task.req_cgpa;
    cgpa.className = 'card-cgpa';
    let last = document.createElement('div');
    last.innerText = "Last date to apply : " + task.last_date_apply;
    last.className = 'card-last';
    let br = document.createElement('br')
    let btn = document.createElement('BUTTON')
    btn.innerText = "Apply"
    btn.className = 'btn btn-primary';
    btn.id = 'btn_' + i
    btn.name = i
    cardBody.appendChild(title);
    cardBody.appendChild(openings);
    cardBody.appendChild(br);
    cardBody.appendChild(cgpa);
    cardBody.appendChild(br);
    cardBody.appendChild(last);
    cardBody.appendChild(br);
    cardBody.appendChild(btn);
    card.appendChild(cardBody);
    cardContainer.appendChild(card);

}

var i = 0

let initListOfTasks = (tasks) => {
    if (cardContainer) {
        document.getElementById('card-container').replaceWith(cardContainer);
        return;
    }

    cardContainer = document.getElementById('card-container');
    var i = 0
    tasks.forEach((task) => {
        createTaskCard(task,i);
        i = i + 1
    });
    getCards()
};

document.getElementById('logout').addEventListener('click', e => {
    const auth = firebase.auth()
    firebase.auth().signOut()
    location.href = '/'
})

var nos = []

function getAppliedNos(){
    for(i = 0;i<applied.length;i++){
        for(j = 0;j<data.length;j++){
            if(applied[i] == data[j].name)
            nos.push(j)
        }
    }
}

function getCards(){
    var list = document.getElementsByClassName('btn btn-primary')
    for(i = 0 ;i<list.length ;i++){
        for(j = 0;j<nos.length;j++){
            if(i == nos[j]){
                list[i].disabled = true
            }
        }
        list[i].addEventListener('click',e => {
            console.log(e.target.name)
            var res = e.target.name
            axios.post('/student-apply', {
                resData: data[res],
                email: email
            }).then(function (response) {
                alert(response.data.respMsg)
            }).catch(function (error) {
                console.log(error);
            });
        })
    }
}
 
function ques(){
    location.href = '/add';
}