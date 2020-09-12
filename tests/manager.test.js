const manager = require('../assets/manager');

test('manager can populate', () => {
    const managerElement = new manager();
    expect(typeof(managerElement)).toBe('object');
});

test('office number is populated', () => {
    const officeElement = 200;
    const managerElement = new manager('Bobby', 200, 'email@email.com', officeElement);
    expect(managerElement.officeNum).toBe(officeElement);
});

test('manager role populated', () => {
    const managerRole = 'Manager';
    const managerElement = new manager();
    expect(managerElement.getRole()).toBe(managerRole);
});