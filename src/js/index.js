import React from 'react';
import App from './components/app.jsx';

var scoreboard = document.getElementById('scoreboard'),
    main = document.getElementById('main');

React.render(<App />, main);
// React.renderComponent(<Results data={results} seconds={} />, results);
