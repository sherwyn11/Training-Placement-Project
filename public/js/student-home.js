
axios.post('/student-home-data', {

}).then(function (response) {
    const loader = document.getElementById('loader')
    loader.style.display = "none"
    initListOfTasks(response.data);
}).catch(function (error) {
    console.log(error);
});

let cardContainer;

let createTaskCard = (task) => {

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

let initListOfTasks = (tasks) => {
    if (cardContainer) {
        document.getElementById('card-container').replaceWith(cardContainer);
        return;
    }

    cardContainer = document.getElementById('card-container');
    tasks.forEach((task) => {
        createTaskCard(task);
    });
};

