const employee = require ('./employee')

class manager extends employee {
    constructor(name, id, email, officeNum) {
    super(name, id, email)
    this.officeNum = officeNum;
    }
    getRole() {
        return 'Manager'
    }
    getOfficeNum() {
        return this.officeNum
    }
}

module.exports = manager;