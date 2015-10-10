//= require jquery
//= require jquery_ujs

let React = require('react');
let ReactDOM = require('react-dom');
let Quiz = require('./components/Quiz');
let Hello = require('./components/Hello');

ReactDOM.render(<Quiz />, document.getElementById('app'));
