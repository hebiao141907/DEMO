const box = require('./greeter');
const text = require('./config.json');
require ('./main.css');

document.querySelector('#root').appendChild(box());
document.write(text.Text);