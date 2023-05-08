const doc = {
    tbody: document.querySelector('#tbody'),
    operatorButton: document.querySelector('#operatorButton'),
    showLoginButton: document.querySelector('#showLoginButton'),
    loginButton: document.querySelector('#loginButton'),
    passInput: document.querySelector('#pass'),
    userInput: document.querySelector('#user'),
    loginModal: new bootstrap.Modal('#loginModal')
}

const state = {
    employees: [],
    host:"http://localhost:8000/api/",
    logedin: false
}

window.addEventListener('load', () => {
    init();
})

function init(){
    doc.operatorButton.addEventListener('click',() => {
        startOperation();
    });
    doc.loginButton.addEventListener('click',() => {
        startLogin();
    });

    getEmployees()
}

function startOperation(){
    console.log('nice')
}

function startLogin(){
    console.log('Azonosítás...')
    let userData ={
        name: doc.userInput.value,
        password: doc.passInput.value
    }
    login ( userData)
}

function login ( userData){
    let endpoint = 'login'
    let url = state.host + endpoint
    let headers ={
        'Content-Type': 'application/json'
    }
    fetch(url , {
        method: 'post',
        headers : headers,
        body: JSON.stringify(userData),
    })
    .then(response => response.json())
    .then(result =>{
        
        localStorage.setItem('token',result.token)
        localStorage.setItem('name',result.name)
        doc.loginModal.hide()
        doc.userInput.value = ''
        doc.passInput.value = ''
        state.logedin = true;
        changeVisible()
        
    })

}

function changeVisible(){
    if(state.logedin){
        doc.showLoginButton.classList.add('invisible')
        doc.operatorButton.classList.remove('invisible')
        doc.tbody.classList.remove('invisible')
    } else {
        doc.showLoginButton.classList.remove('invisible')
        doc.operatorButton.classList.add('invisible')
        doc.tbody.classList.add('invisible')
    }
}

function getEmployees(){
    let endpoint = 'employees'
    let url = state.host + endpoint;
    fetch(url)
    .then(res => res.json())
    .then(res => {
        console.log(res)
        state.employees = res;
        renderTable()
    });
}



function renderTable() {
    var rows = '';
    state.employees.forEach( emp => {
        rows += `
            <tr>
                <td>${emp.id}</td>
                <td>${emp.name}</td>
                <td>${emp.city}</td>
                <td>${emp.salary}</td>
            </tr>
        `
    });
    doc.tbody.innerHTML = rows;
}