const intern = require('../assets/intern');

test('intern can populate', () => {
    const internElement = new intern();
    expect(typeof(internElement)).toBe('object');
});

test('school is populated', () => {
    const internSchool = 'schoolName';
    const internElement = new intern('Bobby', 102, 'email@email.com', internSchool);
    expect(internElement.school).toBe(internSchool);
});

test('intern role populated', () => {
    const internRole = 'intern';
    const internElement = new intern();
    expect(internElement.getRole()).toBe(internRole);
});