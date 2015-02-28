var Checklist = require('./compiled_jsx/checklist');
var React = require('react');
React.render(
    React.createElement(Checklist, null),
    document.querySelector('#app')
);