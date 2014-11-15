/*** @jsx React.DOM */

var React = require('react'),
    App = require('./components/app'),
    MutationReporter = require('./components/mutations.jsx');

var scoreboard = document.getElementById('scoreboard'),
    main = document.getElementById('main'),
    mutationReporter = MutationReporter({target: main});

var target = document.getElementById('main');
var scoreboard = document.getElementById('scoreboard');

React.renderComponent(<App />, target);
React.renderComponent(<MutationReporter target={target} />, scoreboard);
