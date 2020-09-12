const engineer = require('../assets/engineer');

test('engineer can populate', () => {
    const engineerElement = new engineer();
    expect(typeof(engineerElement)).toBe('object');
});

test('github is populated', () => {
    const engineerGithub = 'GitHubName';
    const engineerElement = new engineer('Bobby', 101, 'email@email.com', engineerGithub);
    expect(engineerElement.github).toBe(engineerGithub);
});

test('engineer role populated', () => {
    const engineerRole = 'Engineer';
    const engineerElement = new engineer();
    expect(engineerElement.getRole()).toBe(engineerRole);
});