const Employee = require("./Employee");

class Intern extends Employee{
    constructor(name, id, email, github){
        super(name, id, email);
        this.github = github;
    }

    getRole(){
        return "Intern";
    }
}

module.exports = Intern;