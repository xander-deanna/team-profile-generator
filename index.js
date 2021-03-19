const fs = require('fs');
const inquirer = require('inquirer');

const Employee = require('./lib/Employee.js')
const Manager = require('./lib/Manager.js')

const employeeData = [];

// main questions and qustions for the manager
function inquirerQuestions() {
    inquirer.prompt([
        {
            type: `input`,
            message: `Hi! Welcome to my Team Profile Generator! \n  This app will allow you to generate an html page with your teams's info! \n  Just hit enter to begin. \n  ------- \n`,
            name: `empty1`,
        },
        {
            type: `input`,
            message: `Enter the team manager's name. (First and last, please!)`,
            name: `name`,
        },
        {
            type: `input`,
            message: `Next enter the manager's id.`,
            name: `id`,
        },
        {
            type: `input`,
            message: `What is the team manager's email?`,
            name: `email`,
        },
        {
            type: `input`,
            message: `What is the team manager's phone number? (###-###-#### format please!)`,
            name: `phoneNumber`,
        }
    ])
    .then((answer) => {
        const managerObj = new Manager(answer.name, answer.id, answer.email, answer.phoneNumber)
        employeeData.push(managerObj);
        employeeType();
        return answer;
    })
}

// function to add other employees
function employeeType(){
    inquirer.prompt([
        {
            type: `list`,
            message: `Thanks! Now it's time to add some more team members.\n  Which team member would you like to add?`,
            name: `employeeTypeAnswer`,
            choices: [`Engineer`, `Intern`, `Nope! I'm finished adding to team.`]
        }
    ])
    .then((answer) => {
        switch(answer.employeeTypeAnswer) {
            case `Engineer`:
                engineerQuestions(answer);
                break;
            case `Intern`:
                internQuestions(answer);
                break;
            case `Nope! I'm finished adding to team.`:
                generateHTML(employeeData);
                break;
            default:
                generateHTML(employeeData);
                break;
        };
    });
};

// function to add engineers
function engineerQuestions(answer){
    inquirer.prompt([
        {
            type: `input`,
            message: `What is the engineer's name? (First and last, please!)`,
            name: `name`,
        },
        {
            type: `input`,
            message: `How about the engineer's id?`,
            name: 'id',
        },
        {
            type: `input`,
            message: `Please enter the engineer's email`,
            name: 'email',
        },
        {
            type: `input`,
            message: `What is the engineer's GitHub?`,
            name: `github`,
        },
    ])
    .then((answer) =>{
        employeeData.push(answer);
        console.log(employeeData)
        employeeType();
    })
}

// function to add interns
function internQuestions(answer){
    inquirer.prompt([
        {
            type: `input`,
            message: `What is the intern's name? (First and last, please!)`,
            name: `name`,
        },
        {
            type: `input`,
            message: `How about the intern's id?`,
            name: 'id',
        },
        {
            type: `input`,
            message: `Please enter the intern's email`,
            name: 'email',
        },
        {
            type: `input`,
            message: `What is the intern's GitHub?`,
            name: `github`,
        },
    ])
    .then((answer) => {
        employeeData.push(answer);
        employeeType();
    })
}

// generates HTML document
function generateHTML(){
    let x = ``;
    let wholeHTML = ``;
    for (let i = 0; i < employeeData.length; i++){
        // let name = employeeData[i].name;
        let role = employeeData[i].getRole();
        switch (role){
            case "Manager":
                x += managerHTML;
            break;
            case "Engineer":
                x += engineerHTML;
            break;
            case "Intern":
                x += internHTML;
            break;
            default:
                x += ``
            break;
        }
        wholeHTML = beginingHTML + x + endHTML;
    }
    fs.writeFileSync("./generated-page/your-page.html", wholeHTML)
    console.log(x)
    console.log(wholeHTML)
}


// ---------------------------------------- HTML section ---------------------------------------- //

// begining of the HTML document
const beginingHTML = `<!DOCTYPE html>
<html lang="en">
<head>
    <title>Team Profile</title>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">

    <!-- bootstrap -->
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.0.0-beta1/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-giJF6kkoqNQ00vy+HMDP7azOuL0xtbfIcaT9wjKHr8RbDVddVHyTfAAsrekwKmP1" crossorigin="anonymous">
    <script type="text/javascript" src="https://stackpath.bootstrapcdn.com/bootstrap/4.5.2/js/bootstrap.min.js"></script>

    <!-- font awesome -->
    <link href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.2/css/all.min.css" rel="stylesheet">

    <!-- custom css -->
    <link href="../assets/css/style.css" rel="stylesheet">
</head>

<body class="justify-content-center align-items-center">
    <!-- navbar (title) -->
    <header>
        <nav class="navbar navbar-expand-md navbar-dark bg-dark">
            <div class="container-fluid justify-content-center">
                <ul class="nav">
                    <li class="nav-item">
                        <br>
                        <a class="navbar-brand" href="#"><h2>My Team</h2></a>
                    </li>
                </ul>
            </div>
        </nav>
    </header>
    <!-- sample cards -->
    <div class="container">
        <div class="row">`

// end of the HTML document
const endHTML = `</div>
        </div>
    </body>
</html>`

// manager HTML
let managerHTML = `<div class="col-md-6 col-lg-4">
<div class="card">
    <div class="card-header text-white">
        <h3>Test Employee</h3>
        <h5><i class="fas fa-mug-hot"></i> Manager</h5>
    </div>
    <ul class="list-group list-group-flush">
        <li class="list-group-item">ID: 27</li>
        <li class="list-group-item">Email: <a class="link-color" href="mailto:email@email.com">email@email.com</a></li>
        <li class="list-group-item">Phone Number: <a class="link-color" href="tel:512-666-0000">512-666-0000</a></li>
    </ul>
</div>
</div>`

// engineer HTML
let engineerHTML = `<div class="col-md-6 col-lg-4">
<div class="card">
    <div class="card-header text-white">
        <h3>Test Employee</h3>
        <h5><i class="fas fa-glasses"></i> Engineer</h5>
    </div>
    <ul class="list-group list-group-flush">
        <li class="list-group-item">ID: 32</li>
        <li class="list-group-item">Email: <a class="link-color" href="mailto:test@test.com">test@test.com</a></li>
        <li class="list-group-item">GitHub: <a class="link-color" href="https://github.com/github-user">github-user</a></li>
    </ul>
</div>
</div>`

// intern HTML
let internHTML = `<div class="col-md-6 col-lg-4">
<div class="card">
    <div class="card-header text-white">
        <h3>Test Employee</h3>
        <h5><i class="fas fa-graduation-cap"></i> Intern</h5>
    </div>
    <ul class="list-group list-group-flush">
        <li class="list-group-item">ID: 73</li>
        <li class="list-group-item">Email: <a class="link-color" href="mailto:mail@mail.com">mail@mail.com</a></li>
        <li class="list-group-item">GitHub: <a class="link-color" href="https://github.com/github-test">github-test</a></li>
    </ul>
</div>
</div>`

inquirerQuestions() 