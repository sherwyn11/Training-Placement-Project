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

firebase.auth().onAuthStateChanged(firebaseUser => {
    if(firebaseUser){
        axios.get('/teacher-home-data').then(function (response) {
            const loader = document.getElementById('loader')
            data = response.data.companies
            newValues = sortData(data)
            initListOfTasks(newValues);
            }).catch(function (error) {
                console.log(error);
            });
    }else{
        console.log('No user currently logged in')

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
    let btn_s = document.createElement('BUTTON')
    btn_s.innerText = "Selected"
    btn_s.className = 'btn btn-primary';
    btn_s.id = 'btn_selected'
    btn_s.name = i
    let btn_a = document.createElement('BUTTON')
    btn_a.innerText = "Applied"
    btn_a.className = 'btn btn-primary';
    btn_a.id = 'btn_applied'
    btn_a.name = i
    cardBody.appendChild(title);
    cardBody.appendChild(openings);
    cardBody.appendChild(cgpa);
    cardBody.appendChild(last);
    cardBody.appendChild(br);
    cardBody.appendChild(btn_s);
    cardBody.appendChild(btn_a);
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

function getCards(){
    var list = document.getElementsByClassName('btn btn-primary')
    for(i = 0 ;i<list.length ;i++){
        list[i].addEventListener('click',e => {
            var res = e.target.name
            var type = 1;
            if( e.target.id == 'btn_selected'){
                type = 0;
            }
            console.log(type, data[res])
            axios.post('/show-students-data', {
                resData: data[res],
                type: type
            }).then(function (response) {
                document.location.href = '/show-students';
            }).catch(function (error) {
                console.log(error);
            });
        })
    }
    console.log(list)
}