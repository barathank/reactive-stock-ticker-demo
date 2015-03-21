import React from 'react';
import App from './components/app.jsx';

var scoreboard = document.getElementById('scoreboard'),
    main = document.getElementById('main');
    // mutationReporter = MutationReporter({target: main});

React.render(<App />, main);
// React.renderComponent(MutationReporter({recording: "false", target: main}), scoreboard);
// React.renderComponent(<Results data={results} seconds={} />, results);
