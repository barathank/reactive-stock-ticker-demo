/*** @jsx React.DOM */

var React = require('react'),
    Ticker = require('./components/ticker.jsx'),
    MutationReporter = require('./components/mutations.jsx');

var scoreboard = document.getElementById('scoreboard'),
    main = document.getElementById('main'),
    mutationReporter = MutationReporter({target: main});

React.renderComponent(<Ticker />, main);
React.renderComponent(<MutationReporter target={main} />, scoreboard);
