const employee = require('../assets/employee');

test('employee is created', () => {
    const e = new employee();
    expect(typeof(e)).toBe('object');
});

test('email is populated', () => {
    const email = 'example@example.com';
    const e = new employee('Bobby', 1, email);
    expect(e.email).toBe(email);
});

test('name is populated', () => {
    const name = 'Bobby';
    const e = new employee(name);
    expect(e.name).toBe(name);
});

test('id is populated', () => {
    const employeeID = 100;
    const e = new employee('Bobby', employeeID);
    expect(e.id).toBe(employeeID);
});

test('role is populated', () => {
    const employeeRole = 'Employee';
    const e = new employee();
    expect(e.getRole()).toBe(employeeRole);
});